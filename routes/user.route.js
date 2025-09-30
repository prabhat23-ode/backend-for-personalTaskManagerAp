import express from "express";
import { newUser, deleteUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", newUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
