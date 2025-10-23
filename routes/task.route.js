import express from "express";
import auth from "../middleware/auth.js";
import {
  newTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

const taskRouter = express.Router();

// Create a new task for authenticated user
taskRouter.post("/new", auth, newTask);

// Get all tasks for the authenticated user
taskRouter.get("/tasks", auth, getTask);

// Update a task (only authenticated users)
taskRouter.patch("/update/:id", auth, updateTask);

// Delete a task (only authenticated users)
taskRouter.delete("/delete/:id", auth, deleteTask);

export default taskRouter;
