import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected on host ${conn.connection.host}`);
  } catch (err) {
    console.log(`ERR: ${err.message}`);
  }
};

export default connectDB;
