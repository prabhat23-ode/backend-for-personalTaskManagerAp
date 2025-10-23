import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { sendMail } from "../utils/mailer.js"

//registering a user
const newUser = async (req, res) => {
  try {
    const { userName, email, password, avatar } = req.body;
    // check if email or username already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(409).json({ message: "Email already registered" });

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) return res.status(409).json({ message: "Username already taken" });

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message || "User creation failed" });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated user Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Cannot update User" });
  }
};

//deleting a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message || "User deletion failed" });
  }
};

//user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not registered" });

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Send response without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      user: userWithoutPassword,
      token,
      message: "Login successful, email sent!",
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Login failed" });
  }
};

export { newUser, updateUser, deleteUser, loginUser };
