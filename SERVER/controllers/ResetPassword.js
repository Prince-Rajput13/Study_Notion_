const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
//reset password token(link create hoga and then send hoga)
exports.resetPasswordToken = async (req,res,next)=>{
    try {        
        const email = req.body.email;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(500).json({
                success:false,
                message:"user not found"
            })
        }
        const token= crypto.randomUUID();
        const updateDetails = await User.findOneAndUpdate({email:email},
            {token:token,
                resetPasswordExpires: Date.now()+5*60*1000,
            },
            {new:true},
        )
        const url=`http://localhost:3000/update-password/${token}`
        await mailSender(email,
            "Reset Password Link",
            `Password Reset Link: ${url}`,
        )
        return res.status(200).json({
            success:true,
            message:"reset Email send successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while sending message"
        })
    }
}
// reset password
exports.resetPassword = async (req,res)=>{
    try {
        //fetch data
        const {password , confirmPassword , token} = req.body;
        //validate
        console.log("TOKEN RECEIVED:", token);
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"password not matched to confirm password"
            })
        }
        //user details
        const userDetails = await User.findOne({token:token})
        console.log("PASSWORD:", password);
        console.log("CONFIRM PASSWORD:", confirmPassword);
        console.log("TOKEN:", token);
        console.log("USER:", userDetails);
        console.log("EXPIRY:", userDetails?.resetPasswordExpires);
        //token timeout check
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(401).json({
                success:false,
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        console.log("After hash");
        // update changes
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        )
        console.log("After update");
        // send res
        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        })
    } catch (error) {
        console.log("Reset Password",error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}