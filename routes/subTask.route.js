import express from "express";
import auth from "../middleware/auth.js";
import {
  newSubTask,
  getSubTask,
  updateSubTask,
  deleteSubTask,
} from "../controller/subTask.controller.js";

const subTaskRouter = express.Router();

subTaskRouter.post("/new-sub", auth, newSubTask);
subTaskRouter.get("/sub-tasks/:taskId", auth, getSubTask);
subTaskRouter.put("/update-sub/:id", auth, updateSubTask);
subTaskRouter.delete("/delete-sub/:id", auth, deleteSubTask);

export default subTaskRouter;