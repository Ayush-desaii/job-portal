import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        Type: String,
        required: true
    },
    email: {
        Type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        Type: Number,
        required: true
    },
    password: {
        Type: String,
        required: true
    },
    role: {
        Type: String,
        enum: ["student", "recruiter"],
        required: true
    },
    profile: {
        bio:{Type: String},
        skills:{Type: String},
        resume:{Type: String},
        resumeOriginalName:{Type: String},
        company:{Type: mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{Type: String, default: ''},

        required: true
    },
}, {timeStamps:true});
export const User = mongoose.model("User", userSchema);