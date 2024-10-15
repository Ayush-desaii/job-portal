import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"

dotenv.config({});

const app = express();

app.get("/home", (req, res)=>{
    return res.status(200).json({
        message:"i am from backend",
        success:true
    })
})

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptionss = {
    origin : "https//localhost:5173",
    Credentials : true
}
app.use(cors(corsOptionss));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`servrt running at port ${PORT}`);
    
})