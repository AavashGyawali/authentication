// const mongoose =require('mongoose');
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.log(`The connect Database error is ${err.message}`);
    process.exit(1); // exits if failure
  }
};


export default connectDB;