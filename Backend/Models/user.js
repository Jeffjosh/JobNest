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
    companyname:{
        type:String
    },
    companywebsite:{
        type:String
    },
    role:{
        type:String,
        enum:["user","recruiter","admin"],
        default:"user"
    },
    isApproved:{
        type:Boolean,
        default:function(){
            if(this.role==="user"){
                return true
            }
            return false
        }
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