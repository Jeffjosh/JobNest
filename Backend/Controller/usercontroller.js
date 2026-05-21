import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body

        const userexists=await User.findOne({email})

        if(userexists){
            return res.status(400).json({message:"user already exist"})
        }
        
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)
        const user=await User.create({
            name,
            email,
            password:hashedpassword,
            role:role || "user"
        })

        res.status(201).json({message:"user created successfully", user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"invalid email or password"})
        }

        const ismatch=await bcrypt.compare(password,user.password)

        if(!ismatch){
            return res.status(400).json({message:"invalid email or password"})
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        
        res.status(200).json({message:"login successful", token, user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getprofile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const updateprofile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        user.qualification=req.body.qualification || user.qualification
        user.experience=req.body.experience || user.experience
        user.skills=req.body.skills || user.skills

        if(req.file){
            user.resume=`/uploads/${req.file.filename}`
        }

        await user.save()

        res.status(200).json({message:"profile updated successfully", user})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}