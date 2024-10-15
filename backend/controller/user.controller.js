import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, password, role} = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message:"something is wrong",
                success:false
            })
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message:"user already exists with this email",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        });

        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req,res) => {
    try {
        const {email, password, role} = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message:"something is wrong",
                success:false
            })
        }
        let user = User.findOne({email});
        if (!user){
            return res.status(400).json({
                message:"user not found register first",
                success:false
            })
        }
        const isPasswordMatch = bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.status(400).json({
                message:"incorrect password",
                success:false
            })
        }
        if(role !== user.role){
            return res.status(400).json({
                message:"Account not exists with currunt role",
                success:false
            })
        }
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:"1d"});

        user = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`welcome back ${user.fullName}`,
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateprofile = async (req,res) => {
    try {
        const {fullName, email, phoneNumber, bio, skills} = req.body;
        if (!fullName || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                message:"something is wrong",
                success:false
            })
        }
        const skillArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message:"user not found",
                success:false
            })
        }

        user.fullName = fullName,
        user.email = email,
        user.phoneNumber = phoneNumber,
        user.profile.bio = bio,
        user.profile.skills = skillArray

        await user.save();

        user = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}