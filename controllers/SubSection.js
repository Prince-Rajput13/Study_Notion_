const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/ImageUploader");
require("dotenv").config();

exports.createSubSection = async (req,res) =>{
    try {
        //fetch Detail
        const {timeduration,description,title, sectionId} = req.body();
        const video =req.file.videoFile ;
        if(!dscripition || !sectionId || !title || !timeduration || !video ){
            return res.status(401).json({
                    success:false,
            })
        }
        const uploadDetials = awiat uploadImageToCloudinary(video, process.env.FOLDER_NAME);        
        //create Section
        const SubSectionDetail = await SubSection.create({
            description:description,
            title:title,
            videoUrl:uploadDetials.secure_url,
            timeduration:timeduration,
        });
        //update course with sectionId
        const updateSection = await Course.findByIdAndUpdate({_id:sectionId},
                                       {
                                            $push:{
                                                subSection:SubSectionDetail._id,
                                            }
                                        },
                                        {new:true},
                                    );
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updateSection,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
        })
    }
}

