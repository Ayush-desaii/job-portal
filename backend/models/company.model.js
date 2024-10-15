import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required: true
    },
}, {timeStamps:true});
export const Company = mongoose.model("Company", companySchema);