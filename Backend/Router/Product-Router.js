const express = require('express');
const router = express.Router();
const {getAllProduct, getUserSingleProduct, searchProduct, SimilarProduct} = require('../Controllers/Product-Controller');
const authMiddleware = require('../Middleware/auth-Middleware');

router.route('/products').get(getAllProduct);
router.route('/userSingleProduct/:id').get(getUserSingleProduct);
router.route('/search/:key').get(searchProduct);
router.route('/search/similarProducts/:key/:id').get(SimilarProduct);

module.exports = router;