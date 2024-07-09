const express = require('express');
const authMiddleware = require('../Middleware/auth-Middleware');
const { PaymentProcess, SendStripe } = require('../Controllers/PaymentController');
const router = express.Router();

router.route('/payment/process').post(authMiddleware, PaymentProcess);
router.route('/payment/info').get(authMiddleware, SendStripe);

module.exports = router;