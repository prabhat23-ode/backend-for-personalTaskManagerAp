import Task from "../model/task.model.js";

//add a task
const newTask = async (req, res) => {
  try {
    const { title, description, userId, importance } = req.body;
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
  }
};

//get tasks
const getTask = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message || "Cannot get Task" });
  }
};

//update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "update successful" });
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
