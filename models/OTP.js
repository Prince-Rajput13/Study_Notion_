const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String,
        default: Date.now(),
        expire:60*5,
    },
})

async function sendVerificationEmial(email,otp){
    try{
        await mailResponse = mailSender(email,"Verification Email From StudyNotion", otp);
        console.log("email sent successully", mailResponse);
    }
    catch(error){
        console.log("there is some error while sending mail :", error);
    }
}

OTPSchema.pre("save", async function next()){
    sendVerificationEmial(this.email, this,otp);
    next();
}

module.exports = mongoose.model("OTP", OTPSchema);