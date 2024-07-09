const ProductModel = require("../Models/Product-Model");

const getAllProduct = async (req, resp) => {
  const productCount = await ProductModel.countDocuments();
  const products = await ProductModel.find();
  resp.status(201).json({
    success: true,
    products,
    productCount,
  });
};

const getUserSingleProduct = async (req, resp) => {
  try {
    const SingleProduct = await ProductModel.findOne({ _id: req.params.id });

    //console.log(userdata);
    return resp.status(201).json({
      success: true,
      SingleProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const searchProduct = async (req, resp) => {
  try {
    const userSearchData = await ProductModel.find({
      $or: [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });

    return resp.status(201).json({ success: true, userSearchData });
  } catch (error) {
    console.log(error);
  }
};

const SimilarProduct = async (req, resp) => {
  try {
    const searchSimilarProduct = await ProductModel.find({
      $or: [{ category: { $regex: req.params.key }, _id: { $ne: req.params.id } }],
    });

    return resp.status(201).json({ success: true, searchSimilarProduct });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProduct,
  getUserSingleProduct,
  searchProduct,
  SimilarProduct,
};
