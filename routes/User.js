const express = require("express");
const router = express.Router();

const {
    sendOTP,
    Login,
    signUp,
    changePassword
} = require("../controllers/Auth");
const {
    resetPassword,
    resetPasswordToken
} = require("../controllers/ResetPassword");

const {auth} = require("../middleware/auth");

router.post("/login",Login);
router.post("/signup",signUp);
router.post("/changepassword",changePassword);
router.post("/sendotp",sendOTP);

router.post("/resetpassword", resetPassword);
router.post("/resetpasswordtoken", resetPasswordToken);

module.exports = router