import SubTask from "../model/subTask.model.js";
import Task from "../model/task.model.js";

//add a task
const newSubTask = async (req, res) => {
  try {
    const { title, deadline, taskId, complete } = req.body;
    // If user is authenticated, ensure they own the parent task
    if (req.userId) {
      const parent = await Task.findById(taskId);
      if (!parent) return res.status(404).json({ message: "Parent task not found" });
      if (parent.userId && parent.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }
    const task = new SubTask(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "Failed to create subtask" });
  }
};

//get tasks
const getSubTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    // If user is authenticated, ensure the parent task belongs to them
    if (req.userId) {
      const parent = await Task.findById(taskId);
      if (!parent) return res.status(404).json({ message: "Parent task not found" });
      if (parent.userId && parent.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }
    const task = await SubTask.find({ taskId: taskId });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message || "Cannot get Task" });
  }
};

//update a task
const updateSubTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { complete } = req.body;
    const task = await SubTask.findByIdAndUpdate(
      id,
      { complete },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message || "Cannot update Task" });
  }
};

//remove a task
const deleteSubTask = async (req, res) => {
  try {
    const task = await SubTask.findByIdAndDelete(req.params.id);
    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed" });
  }
};

export { newSubTask, getSubTask, updateSubTask, deleteSubTask };
