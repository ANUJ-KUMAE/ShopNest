const express = require("express");
const router = express.Router();
const {registration, loginData, userProfile ,updatePassword, updateProfile} = require("../Controllers/Auth-Controller")
const AuthValidation = require("../Validation/auth-Validation");
const Validate = require("../Middleware/Validation-Middleware");
const authMiddleware = require("../Middleware/auth-Middleware");
const LoginValidationSchena = require("../Validation/Login-Validation");

router.route('/register').post(Validate(AuthValidation), registration);
router.route('/login').post(Validate(LoginValidationSchena), loginData);
router.route('/userDetails').get(authMiddleware, userProfile);
router.route('/userDetails/password').put(authMiddleware, updatePassword);
router.route('/profileUpdate/:id').put(authMiddleware, updateProfile);
//router.route('/logout').get(logout);


module.exports = router;