import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './Routes/userroutes.js';
import jobroutes from './Routes/jobroutes.js';
import applicationroutes from './Routes/applicationroutes.js';
import path from 'path';

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/users",authRoutes)
app.use("/api/jobs",jobroutes)
app.use("/api/applications",applicationroutes)
app.use("/uploads",express.static("uploads"))

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err))

app.get("/",(req,res)=>{
    res.send("api is running")
})

const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`server running on ${PORT}`))