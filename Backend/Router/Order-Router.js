const express = require("express");
const authMiddleware = require("../Middleware/auth-Middleware");
const { UserOrders, singleOrderItem, myOrder, deleteOrderItem } = require("../Controllers/Order-Controller");
const router = express.Router();

router.route('/orderItems').post(authMiddleware, UserOrders);
router.route('/getSingleitem/:id').get(authMiddleware, singleOrderItem);
router.route('/allOrders/me').get(authMiddleware, myOrder);
router.route('/deleteOrder/:id').delete(authMiddleware, deleteOrderItem);

module.exports = router;