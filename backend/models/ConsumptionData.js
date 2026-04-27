/**
 * models/ConsumptionData.js — MongoDB Consumption Schema
 * --------------------------------------------------------
 * Stores each analysis result for a user.
 * This allows users to track their eco score over time
 * and see if their habits are improving.
 *
 * Each document is linked to a User via the userId reference.
 */

const mongoose = require("mongoose");

// Schema for a single recommendation item
const recommendationSchema = new mongoose.Schema({
  tip: { type: String, required: true },
  impact: { type: String, required: true },
});

// Main schema for one consumption analysis session
const consumptionDataSchema = new mongoose.Schema(
  {
    // Reference to the User who submitted this data
    // This creates a relationship between collections (like a foreign key in SQL)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the "User" model
      required: false, // Allow anonymous submissions for demo purposes
    },

    // --- Input Data ---
    electricity: {
      type: Number,
      required: true,
      min: 0, // Cannot be negative
    },

    water: {
      type: Number,
      required: true,
      min: 0,
    },

    recycling: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Recycling is a percentage
    },

    // --- AI Output ---
    eco_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    recommendations: {
      type: [recommendationSchema],
      default: [],
    },
  },
  {
    // Automatically records when this document was created/updated
    timestamps: true,
  }
);

module.exports = mongoose.model("ConsumptionData", consumptionDataSchema);
