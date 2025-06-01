const express = require("express");
const router = express.Router();
const headController = require("../controllers/headController.js");



// View their department users
router.get("/users", headController.getDepartmentUsers);

module.exports = router;
