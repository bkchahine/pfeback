const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// Create a user (head or normal)
exports.createUser = async (req, res) => {
  try {
    const { username, password, role, department } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      department,
    });

    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
exports.updateUser = async (req, res) => {
try {
  const { username, password, role, department } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, {
    username, password, role, department });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }

}
