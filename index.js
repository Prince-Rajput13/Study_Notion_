const express = require("express");
const app = express();

//Routes 
const userRoute = require("./routes/User");
const courseRoute = require("./routes/Course");
const paymentRoute = require("./routes/Payments");
const profileRoute = require("./routes/Profile");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();


//reuire so the backend can enteretain frontend requests
const cors = require("cors");

const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://locathost:3000",
    credentials:true,
}))

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
cloudinaryConnect();

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/course",courseRoute);

app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Your server is up and running",
    })
})

app.listen(PORT,()=>{
    console.log(`app is Running at Port ${PORT}`)
})
