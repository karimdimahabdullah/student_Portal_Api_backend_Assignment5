import assignment from "../models/assignmentModel.js";
import Student from "../models/studentModel.js";
import {
  normalizeRegistrationNumber,
  registrationNumberFormatHint,
  isValidRegistrationFormat,
} from "../utils/validateRegNumber.js";
import cloudinary  from "../config/cloudinary.js";
//create an assigment
export const uploadAssignment = async (req, res) => {
  try {
    const studentExist = await Student.findById(req.params.userId);

    if (!studentExist) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.url)
    const imgUrl = await result.secure_url

    const {
      title,
      regNumber,
      courseCode,
      courseName,
      instructorsName,
      institutionsName,
    } = req.body;

    if (!title || !regNumber || !courseCode || !courseName || !instructorsName || !institutionsName) {
    return res.status(400).json( {message: "All fields are required"});
  }

    //check for a valid regNumber
    const normalized = normalizeRegistrationNumber(regNumber);

    if (!isValidRegistrationFormat(normalized)) {
      return res
        .status(400)
        .json({
          message: `Invalid registration number format. Expected format: ${registrationNumberFormatHint}`,
        });
    }

    const assigmentCreated = await assignment.create({
      title,
      regNumber,
      courseCode,
      courseName,
      instructorsName,
      institutionsName,
      attachment : imgUrl
    });

    await studentExist.owner.push(assigmentCreated)
    await studentExist.save()

    return res.status(201).json({
      message: "Assignment submitted successfully",
      data: assigmentCreated,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    })
  }
};

//update an assigment

export const getAllAssignments = async (req, res) =>  {
    try {

        const getAll = await assignment.find()
    
        return res.status(201).json({
            message: "All assignments retrieved successfully",
            data: getAll
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


