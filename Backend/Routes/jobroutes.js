import express from "express";
import { createjob,getjobs ,getjobByid,getmyjobs,deletejob,updatejob} from "../Controller/jobcontroller.js";
import { protect,authorizeroles } from "../Middleware/authmiddleware.js";

const router=express.Router()

router.post("/",protect,authorizeroles("recruiter","admin"),createjob)
router.get("/",getjobs)
router.get("/myjobs",protect,authorizeroles("recruiter","admin"),getmyjobs)
router.put("/:id",protect,authorizeroles("recruiter","admin"),updatejob)
router.delete("/:id",protect,authorizeroles("recruiter","admin"),deletejob)
router.get("/:id",getjobByid)


export default router