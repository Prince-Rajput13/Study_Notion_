const Section = require("../models/Section");
const Course = require("../models/Course");


//we will create 3 function to Create, Update and Delate a section

exports.createSection = async (req,res)=>{
    try {
        //festch data
        const {SectionName, CourseId} = req.body();
        //validation
        if(!SectionName || !CourseId ){
            return res.status(401).json({
                success:false,
            })
        }
        //create Section
        const newSection = await Section.create({SectionName});
        //update course with sectionId
        const updateCourse = await Course.findByIdAndUpdate(CourseId,
                                        {
                                            $push:{
                                                courseContent:newSection._id,
                                            }
                                        },
                                        {new:true},
        )
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            updateCourse,
        })
    }
}


exports.updateSection = async (req,res)=>{
    try {
        //fetch detais
        const{sectionName, sectionId} =req.body();
        //validate
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
            })
        }
        //update Section
        const updatedSection= await Section.findByIdAndUpdate(sectionId, {sectionName},{new:true});
        //send res
        return res.status(200).json({
            success:true,
            message:"section updates successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:"Error in Updating section",
        })
    }
}


exports.deleteSection = async (req,res)=>{
    try {
        //fetch details
        const {sectionId} = req.params;
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"Deleted succsssfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
        })
    }
}