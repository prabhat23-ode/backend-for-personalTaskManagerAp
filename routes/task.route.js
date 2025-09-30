import express from "express"
import {newTask, deleteTask} from "../controller/task.controller.js"

const taskRouter = express.Router()

taskRouter.post("/new", newTask)
taskRouter.delete("/delete/:id", deleteTask)

export default taskRouter