const mongoose = require("mongoose");
require("dotenv").config();

exports.connect= async()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Database connected Successfully");
        
    }
    catch(error){
        console.log("DG connection failed");
        console.error(error);
        process.exit(1);
    };
};