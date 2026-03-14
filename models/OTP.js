const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailsender =require("../mail/templates/emailVerificationTemplate");

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
        const mailResponse = mailSender(email,"Verification Email From StudyNotion", emailsender(otp));
        console.log("email sent successully", mailResponse.response);
    }
    catch(error){
        console.log("there is some error while sending mail :", error);
    }
}

OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	if (this.isNew) {
		await sendVerificationEmial(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);