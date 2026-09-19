import assignment from "../models/assignmentModel.js";
import student from "../models/studentModel.js";
import {
  normalizeRegistrationNumber,
  registrationNumberFormatHint,
  isValidRegistrationFormat,
} from "../utils/validateRegNumber.js";

//create an assigment

const uploadAssignment = async (req, res) => {
  try {
    const studentExist = await student.findById(req.params.userId);

    if (!studentExist) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const {
      title,
      regNumber,
      courseCode,
      courseName,
      instructorsName,
      institutionsName,
      attachment
    } = req.body;

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
      attachment
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
      error: error.message,
    });
  }
};

//update an assigment
