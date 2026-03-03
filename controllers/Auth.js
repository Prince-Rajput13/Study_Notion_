const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");

// sendOTP
exports.sendOTP= async(req,res)=>{
    try {
        // fetch email
        const {email}= req.body();
        //check email already exist or not 
        const emailFinder= User.findOne({email});
        if(emailFinder){
            return res.staus(401).json({
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
        cosnt result= await OTP.findOne({otp:otp});
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
        const {email, firstName, lastName, password, confirmPassword, accountType, contactNumber, otp}=req.body();
        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(401).json({
                success:false,
                message:"not valide data"
            })
        }
        // pass=confirm password
        if({password}!=={confirmPassword}){
            return res.status(401).json({
                success:false,
                message:"passwords not matched"
            })
        }
        // email verification
        const emailVerification= Users.findOne({email});
        if(emailVerification){
            return res.status(401).json({
                success:false,
                message:"email already exist"
            })
        }

        //find recent otp
        cosnt recentOtp = await
        //otp verification
    
        //hash password
        //store
        const signUpPayLoad={};
        const 

    
        //send res
        return res.status(200).json({
            success:true,
            message:"Sign UP sccessfully"
        });
    
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"sign up failed"
        })
    }
}

// authorization :- 1.isstudent
//                  2. isinstructor
//                  3. isadmin