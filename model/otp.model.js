import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date
});
const OTP = mongoose.model("OTP", otpSchema);

export default OTP