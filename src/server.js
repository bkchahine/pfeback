const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin.js");
const headRoutes = require("./routes/head");
const userRoutes = require("./routes/user"); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/head", headRoutes);
app.use("/api/user", userRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("ECM Backend is running 🚀");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  // Start the server after DB connects
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} `);
  });
})
.catch((err) => {
  console.error("❌ Failed to connect to MongoDB", err);
});
