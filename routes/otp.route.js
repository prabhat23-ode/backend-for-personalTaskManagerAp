import express from "express";
import {
  generateOtp,
  verifyOtp
} from "../controller/otp.controller.js";

const otpRouter = express.Router();

otpRouter.post("/send-otp", generateOtp); //generate
otpRouter.post("/verify-otp", verifyOtp); //verify


export default otpRouter;