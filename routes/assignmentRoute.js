import express from "express"
import upload from "../config/multer.js"
import { uploadAssignment, getAllAssignments } from "../controllers/assigmentController.js";

const router = express.Router()

router.post("/uploads/:userId", upload.single("attachment"), uploadAssignment)

export default router