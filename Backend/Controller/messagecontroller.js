import Message from "../Models/message.js";

export const sendmessage=async(req,res)=>{
    try{
        const {receiver,job,text}=req.body

        const message=await Message.create({
            sender:req.user._id,
            receiver,
            job,
            text
        })

        res.status(201).json({
            message:"message sent",
            data:message
        })

    }catch(err){
        res.status(500).json({message:"server error"})
    }
}

export const getmessage=async(req,res)=>{
    try{
        const userid=req.params.userid

        const messages=await Message.find({
            $or:[
                {
                    sender:req.user._id,
                    receiver:userid
                },
                {
                    sender:userid,
                    receiver:req.user._id
                }
            ]
        })
        .sort({createdAt:1})
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json({message:"server error"})
    }
}
