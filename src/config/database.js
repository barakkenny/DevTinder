const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()

const MONGO_PASS = process.env.MONGO_URI

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://barakkenny500:${MONGO_PASS}.uyjuway.mongodb.net/`)
};

module.exports = connectDB;