import {Router} from "express";
import upload from "../config/multer.js"
import { uploadAssignment } from "../controllers/assigmentController.js";

const router = Router()

router.post("/uploads/:userId", upload.single("attachment"), uploadAssignment)

export default router