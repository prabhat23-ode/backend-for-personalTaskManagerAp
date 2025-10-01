import Task from "../model/task.model.js";

//add a task
const newTask = async (req, res) => {
  try {
    const { title, description, content, picture } = req.body;
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
  }
};

//update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "update successful"})
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

export { newTask, updateTask, deleteTask };
