import Application from "../Models/application.js";
import Job from "../Models/job.js";
import User from "../Models/user.js";

export const applyjob=async(req,res)=>{
    try{
        const jobid=req.params.id

        const job=await Job.findById(jobid)

        if(!job){
            return res.status(404).json({message:"Job not found"})
        }

        const alreadyapplied=await Application.findOne({
            user:req.user._id,
            job:jobid
        })

        if(alreadyapplied){
            return res.status(400).json({message:"you already applied for this job"})
        }

        const user=await User.findById(req.user._id)

        const resume=req.file ? `/uploads/${req.file.filename}` : user.resume

        const coverletter=req.body.coverletter

        const application=await Application.create({
            user:req.user._id,
            job:jobid,
            resume,
            coverletter

        })
        res.status(201).json({message:"job applied successfully",application})

    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

export const getapplications=async(req,res)=>{
    try{
        const jobid=req.params.id

        const applications=await Application.find({job:jobid})
        .populate("user","name email role qualification experience skills resume")
        .populate("job","title company")

        res.status(200).json({message:"applications fetched successfully", applications})
    }catch(err){
        console.log(err);
        
        res.status(500).json({message:"Server error"})
    }
}

export const updateapplicationstatus=async(req,res)=>{
    try{
        const applicationid=req.params.id
        const {status}=req.body

        const application=await Application.findById(applicationid)

        if(!application){
            return res.status(404).json({message:"application not found"})
        }

        application.status=status

        await application.save()

        res.status(200).json({message:"application status updated successfully", application})
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

export const getmyapplications=async(req,res)=>{
    try{
        const applications=await Application.find({user:req.user._id})
        .populate("job","title company location salary")
        .populate("user","name email qualification experience skills resume")

        res.status(200).json({message:"my applications fetched successfully", applications})
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}