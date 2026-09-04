import { Router } from "express";
import { createStudent, getStudentById, updateStudent, deleteStudent } from "../controllers/studentController.js";

const router = Router();

// CREATE A STUDENT
router.post('/students-create', createStudent);

// GET A STUDENT BY STUDENT ID
router.get('/students-get/:studentId', getStudentById); 

// UPDATE A STUDENT
router.patch('/students-update/:studentId', updateStudent);

// DELETE A STUDENT
router.delete('/students-delete/:studentId', deleteStudent);

export default router;