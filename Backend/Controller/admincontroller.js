import User from "../Models/user.js";
import Job from "../Models/job.js";

export const getpendingrecruiters=async(req,res)=>{
    try{
        const recruiters=await User.find({
            role:"recruiter",
            isApproved:false
        })

        res.status(200).json(recruiters)
    }catch(err0r){
        res.status(500).json({
            message:error.message
        })
    }
}

export const approverecruiter=async(req,res)=>{
    try{
        const recruiter=await User.findById(req.params.id)

        if(!recruiter){
            return res.status(404).json({
                message:"Recruiter not found"

            })
        }

        recruiter.isApproved= true

        await recruiter.save()

        res.status(200).json({success:true,message:"Recruiter approved"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deletejobbyadmin=async(req,res)=>{
    try{
        await Job.findByIdAndDelete(req.params.id)

        res.status(200).json({success:true,message:"Job Deleted"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}