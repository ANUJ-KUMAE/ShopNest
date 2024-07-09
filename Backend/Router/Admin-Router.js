const express = require("express");
const router = express.Router();
const {
  addProducts,
  getAllProducts,
  updateProducts,
  getSingleProduct,
  deleteProduct,
  DeleteUser,
  RegisterdUsersData,
  AdminUsersOrder,
  UpdateUserOrder,
  SingleUserDetail,
  UserDetailUpdate,
  SingleOrder,
} = require("../Controllers/Admin-Controller");
const authMiddleware = require("../Middleware/auth-Middleware");
const AdminMiddleware = require("../Middleware/Admin-Middleware");

//Admin update delete add products

router.route("/addProducts").post(authMiddleware, AdminMiddleware, addProducts);
router
  .route("/adminproducts")
  .get(authMiddleware, AdminMiddleware, getAllProducts);
router
  .route("/adminSingleProduct/:id")
  .get(authMiddleware, AdminMiddleware, getSingleProduct);
router
  .route("/adminUpdate/:id")
  .put(authMiddleware, AdminMiddleware, updateProducts);
router
  .route("/delete/:id")
  .delete(authMiddleware, AdminMiddleware, deleteProduct);

//Admin update delete users

router
  .route("/getAllUserData")
  .get(authMiddleware, AdminMiddleware, RegisterdUsersData);
router
  .route("/getSingleUSerDetails/:id")
  .get(authMiddleware, AdminMiddleware, SingleUserDetail);
router
  .route("/updateSingleUserDetail/:id")
  .put(authMiddleware, AdminMiddleware, UserDetailUpdate);
router
  .route("/deleteUser/:id")
  .delete(authMiddleware, AdminMiddleware, DeleteUser);

//Admin get all Order Details

router
  .route("/allUserOrders")
  .get(authMiddleware, AdminMiddleware, AdminUsersOrder);
router
  .route("/userSingleOrder/:id")
  .get(authMiddleware, AdminMiddleware, SingleOrder);
router
  .route("/allUserOrders/updateOrder/:id")
  .put(authMiddleware, AdminMiddleware, UpdateUserOrder);

module.exports = router;
