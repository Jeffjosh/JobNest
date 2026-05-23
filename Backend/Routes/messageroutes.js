import express from "express"

import { sendmessage,getmessage } from "../Controller/messagecontroller.js"

import {protect} from "../Middleware/authmiddleware.js"

const router=express.Router()

router.post("/",protect,sendmessage)
router.get("/:userid",protect,getmessage)

export default router