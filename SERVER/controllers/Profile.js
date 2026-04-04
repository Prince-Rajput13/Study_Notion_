const User = require('../models/User');
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");


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

exports.deleteAccount = async (req,res)=>{
    try {
        //fetch user id
        const userId = req.user.id;
        //user details
        const user = User.findById({_id:userId});
        if(!user){
            return res.status(404).json({
                success:false,
            })
        }
        
        await Profile.findByIdAndDelete({_id:user.additionalDetails});
        await User.findByIdAndDelete({_id:userId});

        return res.status(200).json({
            success:true,
            message:"Account delted succssfully",
        })


    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"Error in Deletion of account"
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();
        console.log(userDetails);d
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};