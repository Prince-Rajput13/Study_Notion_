const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const imageUploader = require("../utils/ImageUploader");

exports.createCourse = async (req,res) =>{
    
}

exports.showALlCourses = async (req,res) =>{

}

exports.getAllCourseDetails = async (req,res) =>{
    try {
        //fetch course id
        const {courseId} = req.body;
        const CourseDetails = Course.findById({_id:courseId}).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                }
            }).exec();

        if(!CourseDetails){
            return res.status(404).json({
                success: false
            })
        }
        //send res
        return res.status(200).json({
            success:true,
            message:"Course Detials",
            data:CourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while collecting course details"
        })
    }
}