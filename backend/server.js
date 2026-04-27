/**
 * server.js — GreenLife Express Backend
 * ----------------------------------------
 * This is the main entry point of the Node.js backend.
 * It sets up the Express server, connects to MongoDB (optional),
 * and registers API routes.
 *
 * To start the server:
 *   node server.js       (production)
 *   nodemon server.js    (development — auto-restarts on change)
 *
 * The server listens on http://localhost:5000
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import the analyze route (POST /api/analyze)
const analyzeRoute = require("./routes/analyze");

// -----------------------------------------------------------
// Initialize Express App
// -----------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------------------------------------
// Middleware
// -----------------------------------------------------------

// Enable CORS so the React frontend (on port 3000) can call this server
app.use(cors());

// Parse incoming JSON request bodies (so req.body works)
app.use(express.json());

// -----------------------------------------------------------
// MongoDB Connection (Optional)
// Comment this block out if you don't have MongoDB installed.
// -----------------------------------------------------------
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/greenlife";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB at:", MONGO_URI);
  })
  .catch((err) => {
    // MongoDB is optional — the app still works without it
    console.warn("⚠️  MongoDB not connected (optional):", err.message);
  });

// -----------------------------------------------------------
// API Routes
// -----------------------------------------------------------

// Health check — visit http://localhost:5000/ to confirm server is running
app.get("/", (req, res) => {
  res.json({ message: "GreenLife Backend is running 🌱" });
});

// Main analysis route — delegates to routes/analyze.js
// Full path: POST http://localhost:5000/api/analyze
app.use("/api/analyze", analyzeRoute);

// -----------------------------------------------------------
// 404 Handler — catches any unknown routes
// -----------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.path} not found` });
});

// -----------------------------------------------------------
// Global Error Handler — catches unexpected errors
// -----------------------------------------------------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// -----------------------------------------------------------
// Start the Server
// -----------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 GreenLife backend running at http://localhost:${PORT}`);
  console.log(`📡 Forwarding AI requests to Python service on port 8000`);
});
