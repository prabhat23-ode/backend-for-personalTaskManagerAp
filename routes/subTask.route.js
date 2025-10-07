import express from "express";
import {
  newSubTask,
  getSubTask,
  updateSubTask,
  deleteSubTask,
} from "../controller/subTask.controller.js";

const subTaskRouter = express.Router();

subTaskRouter.post("/new-sub", newSubTask);
subTaskRouter.get("/sub-tasks/:taskId", getSubTask);
subTaskRouter.put("/update-sub/:id", updateSubTask);
subTaskRouter.delete("/delete-sub/:id", deleteSubTask);

export default subTaskRouter;