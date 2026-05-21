import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","recruiter","admin"],
        default:"user"
    },
    bio:{
        type:String
    },
    skills:[{
        type:String
    }],
    qualification:{
        type:String
    },
    experience:{
        type:String
    },

    resume:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User