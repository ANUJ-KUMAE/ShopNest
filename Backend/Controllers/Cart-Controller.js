const CartModel = require("../Models/Cart-Model");
const UserModel = require("../Models/Auth-Model");
const ProductModel = require("../Models/Product-Model");

const additemCart = async (req, resp) => {
  try {
    const { cart } = req.body;

    let products = [];

    const user = await UserModel.findOne({ email: req.user.email }).exec();

    // check if cart with logged in user id already exist
    let cartExistByThisUser = await CartModel.findOne({
      orderdBy: user._id,
    }).exec();

    if (cartExistByThisUser) {
      cartExistByThisUser.remove();
      console.log("removed old cart");
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      // get price for creating total
      let productFromDb = await ProductModel.findById(cart[i]._id)
        .select("price")
        .exec();
      object.price = productFromDb.price;

      products.push(object);
    }

    console.log("Products", products);

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    console.log("cartTotal", cartTotal);

    let newCart = await new CartModel({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    console.log("new cart ----> ", newCart);
    resp.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllCart = async (req, resp) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email }).exec();

    let cart = await CartModel.findOne({ orderdBy: user._id })
      .populate("products.product", "_id title price totalPrice")
      .exec();
    console.log(cart);
    if (cart) {
      const { products, cartTotal, totalPrice } = cart;
      return resp.status(201).json({ products, cartTotal, totalPrice });
    }

    return resp.status(201).json({ products: [], cartTotal: 0, totalPrice: 0 });
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, resp) => {
  try {
    console.log("empty cart");
    const user = await UserModel.findOne({ email: req.user.email }).exec();

    const cart = await CartModel.deleteOne({ orderdBy: user._id }).exec();
    resp.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { additemCart, getAllCart, deleteData };
