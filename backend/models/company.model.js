import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name: {
        Type: String,
        required: true
    }, 
    description: {
        Type: String
    },
    website: {
        Type: String
    },
    location: {
        Type: String
    },
    logo: {
        Type: String
    },
    userId: {
        Type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required: true
    },
}, {timeStamps:true});
export const Company = mongoose.model("Company", companySchema);