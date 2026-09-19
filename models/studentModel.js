import mongoose from 'mongoose';
import {registrationNumberFormatHint ,registrationNumberRegex} from "../utils/validateRegNumber.js";


const studentSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: [true, 'Registration number is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validate => registrationNumberRegex.test(validate),
            message: props => `${props.value} is not a valid registration number format. Expected format: ${registrationNumberFormatHint}`
        }
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId, ref: "assignment"
    }]
}, {timestamps: true});

const student = mongoose.model('Student', studentSchema);

export default student;