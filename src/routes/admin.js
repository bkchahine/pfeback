const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/auth");
const User = require("../models/User");
const Document = require("../models/Document");

// Protect all admin routes
router.use(verifyToken, requireRole("admin"));

// 👤 Admin User Management
router.post("/create-user", adminController.createUser);
router.get("/users", adminController.getAllUsers); // This already exists
router.delete("/user/:id", adminController.deleteUser);

// 📊 Admin Dashboard Stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const headCount = await User.countDocuments({ role: "head" });
    const departmentCount = await User.distinct("department");
    const documentCount = await Document.countDocuments();

    res.status(200).json({
      users: userCount,
      heads: headCount,
      departments: departmentCount.length,
      documents: documentCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err });
  }
});

module.exports = router;
