import mongoose from "mongoose"

const messageschema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message=mongoose.model("message",messageschema)

export default Message