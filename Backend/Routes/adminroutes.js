import express from "express"
import { getpendingrecruiters,approverecruiter,deletejobbyadmin } from "../Controller/admincontroller.js"
import { protect,authorizeroles } from "../Middleware/authmiddleware.js"

const router=express.Router()

router.get("/recruiters/pending",protect,authorizeroles("admin"),getpendingrecruiters)
router.put("/recruiters/approve/:id",protect,authorizeroles("admin"),approverecruiter)
router.delete("/jobs/:id",protect,authorizeroles("admin"),deletejobbyadmin)

export default router