const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        trim: true,
    },
    lastName: {
        type: String,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum:["Student","Instructor","Admin"],
        required: true,
    },
    additionalDetail: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    image:{
        type: "String",
        required:true,
    },
    courseProgress:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    },
    token:{
        type: "String",
    },
    resetPassword:{
        type: "String",
    }
})
module.exports = mongoose.model("User", userSchema);