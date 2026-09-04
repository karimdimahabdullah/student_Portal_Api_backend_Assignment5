import Student from '../models/studentModel.js';
import {normalizeRegistrationNumber, registrationNumberFormatHint, isValidRegistrationFormat } from '../utils/validateRegNumber.js';
import validator from 'validator';

// CREATE A STUDENT
export const createStudent = async (req, res) => {
    try{
        let { registrationNumber, name, email } = req.body;

        if(!registrationNumber || !name || !email){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : email;

        const emailIsValid = validator.isEmail(normalizedEmail);

        if(!emailIsValid){
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const normalized = normalizeRegistrationNumber(registrationNumber);

        if(!isValidRegistrationFormat(normalized)){
            return res.status(400).json({ message: `Invalid registration number format. Expected format: ${registrationNumberFormatHint}`});
        }

        const existingStudent = await Student.findOne({ registrationNumber: normalized });

        if(existingStudent){
            return res.status(409).json({ message: 'Student with this registration number already exists' });
        }

        const newStudent = await Student.create({
            registrationNumber: normalized,
            name,
            email: normalizedEmail
        });

        res.status(201).json({ message: 'Student created successfully', student: newStudent }); 

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
   
}

// UPDATE A STUDENT PROFILE (NAME ONLY)
export const updateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { name } = req.body;

        if(!name){
            return res.status(400).json({ message: 'Name is required for update' });
        }

        const user = await Student.findById(studentId);

        if(!user){
            return res.status(404).json({ message: 'Student not found' });
        }

        user.name = name;
        const updatedStudent = await user.save();

        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });

    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

// DELETE A STUDENT
export const deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if(!deletedStudent){
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });

    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// GET A STUDENT BY STUDENT ID
export const getStudentById = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId);

        if(!student){
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: "Student fetch Successfully", data: student });

    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

