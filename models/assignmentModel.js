import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    regNumber: {
        type: String,
        required: true
    },
    courseCode: {
        type: Number,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    instructorsName: {
        type: String,
        required: true
    },
    institutionsName: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: true
    }
}, {timestamps: true});

const assignment = mongoose.model("Assignment", assignmentSchema)

export default assignment;