import express from "express";
import { newUser, updateUser, deleteUser, loginUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", newUser);
userRouter.patch("/update/:id", updateUser)
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/login", loginUser)

export default userRouter;
