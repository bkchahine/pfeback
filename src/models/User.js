const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "head", "user"],
    default: "user",
  },
  department: { type: String },
});

module.exports = mongoose.model("User", userSchema);
