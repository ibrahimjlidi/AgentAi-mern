/**
 * models/User.js — MongoDB User Schema
 * ----------------------------------------
 * Defines the structure of a User document in MongoDB.
 * Uses Mongoose, which is an ODM (Object Data Modeling) library
 * that makes it easier to work with MongoDB in Node.js.
 *
 * Each user can have many consumption records (stored in ConsumptionData.js).
 */

const mongoose = require("mongoose");

// Define the schema (blueprint) for a User document
const userSchema = new mongoose.Schema(
  {
    // User's display name
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
    },

    // User's email address — must be unique across all users
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Stored as lowercase for consistency
      trim: true,
    },

    // Hashed password (never store plain text passwords!)
    password: {
      type: String,
      required: true,
    },

    // Optional: user's city for regional recommendations
    location: {
      type: String,
      default: "",
    },
  },
  {
    // Mongoose automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export the model so it can be used in routes
module.exports = mongoose.model("User", userSchema);
