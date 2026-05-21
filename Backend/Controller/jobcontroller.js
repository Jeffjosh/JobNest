import Job from "../Models/job.js";

export const createjob=async(req,res)=>{
    try{
        const {title,description,company,location,salary}=req.body

        const job=await Job.create({
            title,
            description,
            company,
            location,
            salary,
            createdBy:req.user._id
        })
        res.status(201).json({message:"job created successfully", job})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getjobs=async(req,res)=>{
    try{
        const jobs=await Job.find().populate("createdBy","name email")

        res.status(200).json({message:"jobs fetched successfully", jobs})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getjobByid= async(req,res)=>{
    try{
        const job=await Job.findById(req.params.id).populate("createdBy","name email")

        if(!job){
            return res.status(404).json({message:"job not found"})
        }

        res.status(200).json({message:"job fetched successfully", job})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getmyjobs=async(req,res)=>{
    try{
        const jobs=await Job.find({createdBy:req.user._id})

        res.status(200).json({message:"my jobs fetched successfully", jobs})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const deletejob=async(req,res)=>{
    try{
        const job=await Job.findById(req.params.id)

        if(!job){
            return res.status(404).json({message:"job not found"})
        }
        await job.deleteOne()

        res.status(200).json({message:"job deleted successfully"})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const updatejob=async(req,res)=>{
    try{
        const{
            title,
            description,
            company,
            location,
            salary
        }=req.body

        const job=await Job.findById(req.params.id)

        if(!job){
            return res.status(404).json({message:"job not found"})
        }

        job.title=title
        job.description=description
        job.company=company 
        job.location=location
        job.salary=salary

        await job.save()

        res.status(200).json({message:"job updated successfully", job})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}