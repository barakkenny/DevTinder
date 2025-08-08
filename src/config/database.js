const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://barakkenny500:FIKoL5tStZfsZR8A@de.uyjuway.mongodb.net/")
};

module.exports = connectDB;