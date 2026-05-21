import express from "express";
import { register,login,getprofile,updateprofile} from "../Controller/usercontroller.js";
import {protect} from "../Middleware/authmiddleware.js";
import upload from "../Middleware/uploadmiddleware.js";

const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/profile",protect,getprofile)
router.put("/profile",protect,upload.single("resume"),updateprofile)

export default router