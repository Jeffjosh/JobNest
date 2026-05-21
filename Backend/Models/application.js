import mongoose from "mongoose";

const applicationschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },
    status:{
        type:String,
        enum:["applied","shortlisted","rejected"],
        default:"applied"
    },
    coverletter:{
        type:String
    },
    resume:{
        type:String
    }

},{timestamps:true})

const Application=mongoose.model("Application",applicationschema)

export default Application