import express from "express";
import { newUser, updateUser, deleteUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", newUser);
userRouter.patch("/update/:id", updateUser)
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
