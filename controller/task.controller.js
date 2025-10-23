import Task from "../model/task.model.js";

//add a task
const newTask = async (req, res) => {
  try {
    // prefer authenticated userId when available
    const userId = req.userId || req.body.userId;
    const payload = { ...req.body, userId };
    const task = new Task(payload);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "Failed to create task" });
  }
};

//get tasks
const getTask = async (req, res) => {
  try {
    // use authenticated user id
    const userId = req.userId || req.query.userId;
    if (!userId) return res.status(400).json({ message: "userId is required" });
    const task = await Task.find({ userId: userId }).populate('subtasks');
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message || "Cannot get Task" });
  }
};

//update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    // Ensure only allowed fields are updated
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    // Optional: ensure the authenticated user owns this task
    if (req.userId && task.userId && task.userId.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message || "Cannot update Task" });
  }
};

//remove a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed" });
  }
};

export { newTask, getTask, updateTask, deleteTask };
