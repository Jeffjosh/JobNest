import express from 'express';
import { applyjob,getapplications,updateapplicationstatus,getmyapplications } from '../Controller/applicationcontroller.js';
import { protect,authorizeroles } from '../Middleware/authmiddleware.js';
import upload from '../Middleware/uploadmiddleware.js';

const router = express.Router()

router.post("/:id/apply",protect,authorizeroles("user"),upload.single("resume"),applyjob)
router.get("/:id/applications",protect,authorizeroles("recruiter","admin"),getapplications)
router.put("/status/:id",protect,authorizeroles("recruiter","admin"),updateapplicationstatus)
router.get("/myapplications",protect,authorizeroles("user"),getmyapplications)

export default router