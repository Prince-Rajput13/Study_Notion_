const User = require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();
// sendOTP
exports.sendOTP= async(req,res)=>{
    try {
        // fetch email
        const {email}= req.body;
        //check email already exist or not 
        const emailFinder= await User.findOne({email});
        if(emailFinder){
            return res.status(401).json({
                success:false,
                message:"User already exist"
            })
        }
        //OTP generation
        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:true
        });
        const result= await OTP.findOne({otp:otp});
        while(result){
            otp= otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:true
            });
            result= await OTP.findOne({otp:otp});   
        }
        const otpPayload={email,otp};
        const otpBody= await OTP.create(otpPayload);
        console.log(otpBody);
        return res.status(200).json({
            success:true,
            message:"otp send successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"error while sending OTP"
        })
    }
}
//sign up
exports.signUp= async (req, res)=>{
    try {
        //data fetch 
        const {email,
             firstName, 
             lastName, 
             password, 
             confirmPassword, 
             accountType, 
             contactNumber, 
             otp}=req.body;
        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(401).json({
                success:false,
                message:"not valide data"
            })
        }
        // pass=confirm password
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"passwords not matched"
            })
        }
        // email verification
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
            });
        }
        //find recent otp
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        //otp verification
        if(recentOtp.length==0 || otp!==recentOtp[0].otp ){
            return res.status(401).json({
                success:false,
                message:"wrong OTP"
            })
        }
    
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //store
        const profileDetails= await Profile.create({
            gender: null,
            dateOfBirth: null,
            contactNumber:null,
            about:null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        //send res
        return res.status(200).json({
            success:true,
            message:"Sign UP sccessfully",
            user
        });
    
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"sign up failed"
        })
    }
}

// Login
exports.Login = async (req,res) =>{
    try {
        //fetch
        const {email,password}=req.body;
        //validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Not validated"
            })
        }
        // user exist 
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(402).json({
                success:false
            })
        }
        // password match
        if(await bcrypt.compare(password, user.password)){
            const payLoad= {
                email: user.email,
                id:user._id,
                accountType:user.accountType,
            }
            // create Jwt token
            const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn:"2h",
            })
            user.token=token;
            user.password= undefined;
            //create cookie
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            //send res
             res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Login Successfully"
            })
        }
        else{
            return res.status(200).json({
                success:false,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failed"
        })
    }
}

// change Password

exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id);

        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" });
        }

        // Match new password and confirm new password
        if (newPassword !== confirmNewPassword) {
            // If new password and confirm new password do not match, return a 400 (Bad Request) error
            return res.status(400).json({
                success: false,
                message: "The password and confirm password does not match",
            });
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // Send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};