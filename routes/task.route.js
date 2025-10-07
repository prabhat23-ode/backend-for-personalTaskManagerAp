import express from "express";
import {
  newTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/new", newTask);
taskRouter.get("/tasks", getTask);
taskRouter.patch("/update/:id", updateTask);
taskRouter.delete("/delete/:id", deleteTask);

export default taskRouter;
