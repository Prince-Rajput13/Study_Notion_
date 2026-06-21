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

router.post("/reset-password", resetPassword);
router.post("/reset-password-token", resetPasswordToken);

module.exports = router