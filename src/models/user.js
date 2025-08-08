const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50  
    }, 
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50 
    },
    emailId: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password" + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.rmim2jYzNpSCslo60INohQHaF9?w=204&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid"+ value)
            }
        }
    },
    about: {
        type: String,
        default: "This is the default about of the user",
    },
    skills: {
        type: [String],
    }

}, { 
    timestamps: true,
}

)

const User = mongoose.model('User', userSchema);

module.exports = User;