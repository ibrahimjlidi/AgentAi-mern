/**
 * routes/analyze.js — GreenLife Analysis Route
 * ----------------------------------------------
 * This Express route acts as a bridge between the React frontend
 * and the Python FastAPI AI service.
 *
 * Flow:
 *   React (POST /api/analyze)
 *     → This route
 *       → Python FastAPI (POST /analyze)
 *         → Returns eco_score + recommendations
 */

const express = require("express");
const axios = require("axios");

const router = express.Router();

// The URL of the Python AI service (running on port 8000)
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

/**
 * POST /api/analyze
 *
 * Accepts consumption data from the frontend,
 * forwards it to the Python AI service,
 * and returns the result.
 *
 * Request Body:
 *   { electricity: number, water: number, recycling: number }
 *
 * Response:
 *   { eco_score: number, recommendations: [{ tip, impact }] }
 */
router.post("/", async (req, res) => {
  const { electricity, water, recycling } = req.body;

  // --- Input Validation ---
  // Make sure all required fields are present and are valid numbers
  if (
    electricity === undefined ||
    water === undefined ||
    recycling === undefined
  ) {
    return res.status(400).json({
      error: "Missing required fields: electricity, water, recycling",
    });
  }

  if (
    typeof electricity !== "number" ||
    typeof water !== "number" ||
    typeof recycling !== "number"
  ) {
    return res.status(400).json({
      error: "All fields (electricity, water, recycling) must be numbers",
    });
  }

  try {
    // --- Forward request to Python AI Service ---
    const aiResponse = await axios.post(`${AI_SERVICE_URL}/analyze`, {
      electricity,
      water,
      recycling,
    });

    // Send the AI response back to the frontend
    return res.status(200).json(aiResponse.data);
  } catch (error) {
    // Handle errors from the AI service or network issues
    console.error("Error calling AI service:", error.message);

    // If the AI service returned an error response, forward it
    if (error.response) {
      return res.status(error.response.status).json({
        error: "AI service error",
        details: error.response.data,
      });
    }

    // Generic server error
    return res.status(500).json({
      error: "Failed to connect to the AI service. Is it running on port 8000?",
    });
  }
});

module.exports = router;
