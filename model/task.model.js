import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    picture:{
      type: String,
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task