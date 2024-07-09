const OrderModel = require("../Models/Order");
const ProductModel = require("../Models/Product-Model");

const UserOrders = async (req, resp) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    } = req.body;

    const orders = await OrderModel.create({
      orderItems,
      shippingInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
    });

    return resp.status(201).json({
        success:true,
        orders
    })

  } catch (error) {
    console.log(error);
  }
};

const singleOrderItem =async (req, resp) => {
    try {
        const singledata = await OrderModel.findOne({_id:req.params.id});

        if(!singledata)
        {
            return resp.status(401).json({message:"No oredr found"});
        }

        return resp.status(201).json({
            success:true,
            singledata,
        })

    } catch (error) {
        console.log(error);
    }
}

const myOrder = async(req, resp) => {
    try {
        const MyOrderedItem = await OrderModel.find({user: req.user.id});

        return resp.status(201).json({
            success:true,
            MyOrderedItem
        })

    } catch (error) {
        console.log(error)
    }
}

const deleteOrderItem =async (req, resp) => {
    try {
        const Deletesingledata = await OrderModel.findOne({_id:req.params.id});

        if(!Deletesingledata)
        {
            return resp.status(401).json({message:"No oredr found"});
        }

        const deletedData = await Deletesingledata.deleteOne();

        return resp.status(201).json({
            success:true,
            deletedData
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { UserOrders, singleOrderItem, myOrder, deleteOrderItem };
