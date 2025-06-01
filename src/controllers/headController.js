const User = require("../models/User.js");

// Get users in the same department
exports.getDepartmentUsers = async (req, res) => {
  try {
    const head = await User.findById(req.user.id);
    const users = await User.find({ department: head.department, role: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users", error });
  }
};
