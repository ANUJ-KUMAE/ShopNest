const express = require('express');
const router = express.Router();
const {additemCart, getAllCart, deleteData} = require('../Controllers/Cart-Controller');
const authMiddleware = require('../Middleware/auth-Middleware');

router.route('/user/addCart').post(authMiddleware,additemCart);
router.route('/user/showaddCart').get(authMiddleware, getAllCart);
router.route('/user/deleteCartData').delete(authMiddleware, deleteData)

module.exports = router;