import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);

    console.log("DB Connected successful");
  } catch (err) {
    console.error(`ERror: ${err.message}`);
  }
};

export default connectDB;
