const Tag = require("../models/Tag");

exports.createTag = async (req,res)=>{
    try {
        //fetch
        const {name,description} = req.body();
        if(!name || !description){
            return res.status(401).json({
                success:false,
            })
        }
        const tagDetail= await Tag.create({
            name:name,
            description:description
        })
        return res.status(200).json({
            success:true,
            message:"Tag created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in creating tag"
        })
    }
}

exports.showAlltags = async (req,res)=>{
    try {
        const allTags= await Tag.find({},{name:true, description:true});
        return res.status(200).json({
            success:true,
            allTags
        })
    } catch (error) {
        return res.status(500).json({
            success:false
        })
    }
}