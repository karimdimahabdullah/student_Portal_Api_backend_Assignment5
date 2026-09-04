import { Router } from "express";
import { createStudent, getStudentById, updateStudent, deleteStudent } from "../controllers/studentController.js";

const router = Router();

// CREATE A STUDENT
router.post('/students', createStudent);

// GET A STUDENT BY STUDENT ID
router.get('/students/:studentId', getStudentById); 

// UPDATE A STUDENT
router.patch('/students/:studentId', updateStudent);

// DELETE A STUDENT
router.delete('/students/:studentId', deleteStudent);

export default router;