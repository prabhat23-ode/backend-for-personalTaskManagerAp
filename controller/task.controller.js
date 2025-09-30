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

//remove a task

//deleting a user
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "No Task Found" });
    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Failed" });
  }
};


export {newTask, deleteTask};
