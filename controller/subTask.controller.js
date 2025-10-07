import SubTask from "../model/subTask.model.js";

//add a task
const newSubTask = async (req, res) => {
  try {
    const { title, deadline, taskId, complete } = req.body;
    const task = new SubTask(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
  }
};

//get tasks
const getSubTask = async (req, res) => {
  try {
    const { taskId } = req.params;
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
