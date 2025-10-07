import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 20,
    },
    deadline: {
      type: String,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },
  },
  { timestamps: true }
);

const SubTask = mongoose.model("SubTask", taskSchema);

export default SubTask;
