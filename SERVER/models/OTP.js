const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailSender = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 60 * 5,   // OTP expires after 5 minutes
    },
});

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email From StudyNotion",
            emailSender(otp)
        );

        console.log("Email sent successfully", mailResponse.response);
    }
    catch(error){
        console.log("Error while sending mail:", error);
    }
}

OTPSchema.pre("save", async function () {
	console.log("New OTP document saved to database");

	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
});

module.exports = mongoose.model("OTP", OTPSchema);