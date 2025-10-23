import OTP from "../model/otp.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// import { Resend } from "resend";

// const resend = new Resend("re_Z1qGPJp3_AEod7Vy1Z14nyaNbGDwREDnE");

//generate and send otp

const generateOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 mins
  await OTP.deleteMany({ email }); // clear old OTPs
  await OTP.create({ email, otp, expiresAt });
  // Setup nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code for personal taskmanager app is ${otp}, it is valid for next 10 minutes`,
  };
  res.json({ success: true, message: "OTP sent successfully" });

  await transporter.sendMail(mailOptions);
};

//verify otp

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = await OTP.findOne({ email });

  console.log(otp)

  if (!record)
    return res.status(400).json({ success: false, message: "No OTP found" });
  if (record.expiresAt < Date.now())
    return res.status(400).json({ success: false, message: "OTP expired" });
  if (record.otp !== otp.toString())
    return res.status(400).json({ success: false, message: "Invalid OTP" });

  // OTP valid, generate token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  await OTP.deleteMany({ email }); // clear used OTPs

  res.json({ success: true, token });
};

export { generateOtp, verifyOtp };
