const User = require('../models/User');
const Profile = require("../models/Profile");

exports.updateProfile = async (req,res)=>{
    try {
        // get data
        const {dateOfBirth="", about="", gender, contactNumber}= req.body;
        const id= req.user.id;
        //validate
        //get profile details
        const userDetails = await User.findById(id);
        const profileId= await Profile.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update and save details
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.contactNumber= contactNumber;
        profileDetails.gender= gender;
        profileDetails.about= about;

        profileDetails.save();
        //send res
        return res.status(200).json({
            succcess:true,
            message:"Profile Updated Successfully", 
            profileDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
        })
    }
}
