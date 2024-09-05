const UserModel = require("../Models/Auth-Model");
const OrderModel = require("../Models/Order");
const ProductModel = require("../Models/Product-Model");
const cloudinary = require("../Cloudinary/CloudConfig");

const addProducts = async (req, resp, next) => {
  try {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "product",
      });

      imagesLinks.push({
        public_id: result.public_id,
        URL: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const AllProduct = await ProductModel.create(req.body);
    resp.status(201).json({ success: true, AllProduct });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, resp, next) => {
  try {
    const ProductPerPage = 10;
    const Currentpage = Number(req.query.page) || 1;
    const skip = ProductPerPage * (Currentpage - 1);

    const getProduct = await ProductModel.find()
      .limit(ProductPerPage)
      .skip(skip);
    resp.status(201).json({ success: true, getProduct });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, resp, next) => {
  try {
    const singleData = await ProductModel.findOne({ _id: req.params.id });

    return resp.status(201).json({ Succss: true, singleData });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const updateProducts = async (req, resp, next) => {
  try {
    const updatedata = await ProductModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    console.log("Data Updated");
    return resp.status(201).json({ Success: true, updatedata });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const deleteProduct = async (req, resp, next) => {
  try {
    const deletedData = await ProductModel.deleteOne({ _id: req.params.id });
    console.log("Data Deleted");

    return resp
      .status(201)
      .json({ messgae: "Deleted Successfully", deletedData });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

//Users Details Part for updation Deletion

//Getting All User Data

const RegisterdUsersData = async (req, resp, next) => {
  try {
    const AllUserDatas = await UserModel.find();

    if (!AllUserDatas || AllUserDatas.length === 0) {
      return resp.status(401).json({ messgae: "No User Data Found" });
    }

    const CountUsers = AllUserDatas.length;

    return resp.status(201).json({
      success: true,
      AllUserDatas,
      CountUsers,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Get Single user Detail

const SingleUserDetail = async (req, resp, next) => {
  try {
    const SingleUser = await UserModel.findOne({ _id: req.params.id });

    return resp.status(201).json({ Success: true, SingleUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Update Single User Detail

const UserDetailUpdate = async (req, resp, next) => {
  try {
    const updateUserData = await UserModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    console.log("Data Updated");
    return resp.status(201).json({ Success: true, updateUserData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Delete Single User Data using id

const DeleteUser = async (req, resp, next) => {
  try {
    const userDeleted = await UserModel.deleteOne({ _id: req.params.id });

    return resp.status(201).json({ Success: true, userDeleted });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//All users Oreders

const AdminUsersOrder = async (req, resp, next) => {
  try {
    const allOrders = await OrderModel.find();

    let TotalAmount = 0;
    allOrders.forEach((order) => {
      TotalAmount += order.totalPrice;
    });

    return resp.status(201).json({
      Success: true,
      TotalAmount,
      allOrders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const SingleOrder = async (req, resp, next) => {
  try {
    const UserorderDetail = await OrderModel.findOne({ _id: req.params.id });

    return resp.status(201).json({ Success: true, UserorderDetail });
  } catch (error) {
    next(error);
  }
};

//Admin Update the Order Details

const UpdateUserOrder = async (req, resp, next) => {
  try {
    const userOrderUpdate = await OrderModel.findOne({ _id: req.params.id });

    if (!userOrderUpdate) {
      return resp.status(404).json({ message: "Order not found" });
    }

    if (userOrderUpdate.orderStatus === "Delivered") {
      return resp.status(401).json({ messgae: "Product Already Delivered" });
    }

    userOrderUpdate.orderItems.forEach(async (item) => {
      await UpdateStock(item.product, item.quantity);
    });

    const UpdateOrderStatus = {
      orderStatus: req.body.Status,
      deliverAt: Date.now(),
    };

    //userOrderUpdate.orderStatus = req.body.orderStatus;
    //userOrderUpdate.deliverAt = Date.now();

    //userOrderUpdate.deliverAt = req.body.deliverAt

    //await userOrderUpdate.updateOne();

    const OrderUpdated = await OrderModel.updateOne(
      { _id: req.params.id },
      { $set: UpdateOrderStatus }
    );

    return resp.status(201).json({
      success: true,
      OrderUpdated,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

async function UpdateStock(id, quantity) {
  const Userproduct = await ProductModel.findOne({ _id: id });

  Userproduct.stock = Userproduct.stock - quantity;

  await Userproduct.save({ validationBeforeSave: false });
}

module.exports = {
  addProducts,
  getAllProducts,
  updateProducts,
  getSingleProduct,
  deleteProduct,
  RegisterdUsersData,
  DeleteUser,
  AdminUsersOrder,
  UpdateUserOrder,
  SingleUserDetail,
  UserDetailUpdate,
  SingleOrder,
};
