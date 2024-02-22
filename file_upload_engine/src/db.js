const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (e) {
    throw new Error(`Error connecting to database: ${e}`);
  }
}

module.exports = connectDB;
