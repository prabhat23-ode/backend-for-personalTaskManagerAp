import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    importance: {
      type: String,
      lowercase: true,
    },
    subtasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTask"
    }]
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
