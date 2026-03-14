const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth");
const {
    updateProfile,
    getAllUserDetails,
    deleteAccount,
    updateDisplayPicture,
    getEnrolledCourses,

} = require("../controllers/Profile");

router.post("/updateprofile",updateProfile);
router.post("/getalluserdetails",getAllUserDetails);
router.post("/deleteaccount",deleteAccount);
router.post("/updatedisplaypicture",updateDisplayPicture);
router.post("/getenrolledcourses",getEnrolledCourses);

module.exports = router