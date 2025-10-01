import User from "../model/user.model.js";

//registering a user
const newUser = async (req, res) => {
  try {
    const { userName, email, password, avatar } = req.body;
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message || "User creation failed" });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated user Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Cannot update User" });
  }
};

//deleting a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message || "User deletion failed" });
  }
};

export { newUser, updateUser, deleteUser };
