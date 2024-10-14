import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.get("/home", (req, res)=>{
    return res.status(200).json({
        message:"i am from backend",
        success:true
    })
})

//Middleware
app.use(express.json);
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptionss = {
    origin : "https//localhost:5173",
    Credentials : true
}
app.use(cors(corsOptionss));

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`servrt running at port ${PORT}`);
    
})