import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title: {
        Type: String,
        required: true
    },
    description: {
        Type: String,
        required: true,
        unique: true
    },
    requirements: [{
        Type: String
    }],
    salary: {
        Type: Number,
        required: true
    },
    location: {
        Type: String,
        required: true
    },
    jobType: {
        Type: String,
        required: true
    },
    position: {
        Type: String,
        required: true
    },
    company: {
        Type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdBy: {
        Type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        Type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    }]
}, {timeStamps:true});
export const Job = mongoose.model("Job", jobSchema);