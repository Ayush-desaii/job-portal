import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job: {
        Type: mongoose.Schema.Types.ObjectId, 
        ref:'Job',
        required: true
    },
    applicant: {
        Type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required: true
    },
    status: {
        Type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
}, {timestamps: true})
export const Application = mongoose.model("Application", applicationSchema);