const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
//auth
exports.auth = async (req, res, next) => {
    try {
        let token =
            req.cookies?.token ||
            req.body?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Auth failed"
        });
    }
};
//is student
exports.isStudent =async (req,res,next)=>{
    try {
        if(req.user.accountType!=="Student"){
            return res.status(402).json({
                success:false,
                message:"Its not a student"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Role verification failed, try again"
        })
    }
}
//isinstuctor
exports.isInstructor =async (req,res,next)=>{
    try {
        if(req.user.accountType!=="Instructor"){
            return res.status(402).json({
                success:false,
                message:"Its not a Instructor"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Role verification failed, try again"
        })
    }
}
//isadmin
exports.isAdmin =async (req,res,next)=>{
    try {
        if(req.user.accountType!=="Admin"){
            return res.status(402).json({
                success:false,
                message:"Its not a Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Role verification failed, try again"
        })
    }
}