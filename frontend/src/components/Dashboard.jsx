/**
 * src/components/Dashboard.jsx
 * ------------------------------
 * This component handles user input, form submission,
 * API calls to the backend, and displaying the results.
 */

import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  // --- State Variables ---
  // Store form input values
  const [formData, setFormData] = useState({
    electricity: "",
    water: "",
    recycling: "",
  });

  // Store the analysis result from the backend
  const [result, setResult] = useState(null);

  // Loading and error states for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Handlers ---
  // Update state when user types in an input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Send POST request to our Express backend
      // Because of vite.config.js proxy, /api/analyze goes to port 5000
      const response = await axios.post("/api/analyze", {
        electricity: Number(formData.electricity),
        water: Number(formData.water),
        recycling: Number(formData.recycling),
      });

      // Update state with the successful result
      setResult(response.data);
    } catch (err) {
      console.error(err);
      // Display a user-friendly error message
      setError(
        err.response?.data?.error ||
          "Failed to connect to the server. Make sure the backend and AI service are running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* ── Input Section ──────────────────────────────── */}
      <section className="input-section card">
        <h2>Enter Your Monthly Data</h2>
        <form onSubmit={handleSubmit} className="data-form">
          <div className="form-group">
            <label htmlFor="electricity">⚡ Electricity (kWh)</label>
            <input
              type="number"
              id="electricity"
              name="electricity"
              min="0"
              step="1"
              value={formData.electricity}
              onChange={handleChange}
              placeholder="e.g. 350"
              required
            />
            <small>Average is ~300 kWh/month</small>
          </div>

          <div className="form-group">
            <label htmlFor="water">💧 Water (Liters)</label>
            <input
              type="number"
              id="water"
              name="water"
              min="0"
              step="1"
              value={formData.water}
              onChange={handleChange}
              placeholder="e.g. 4500"
              required
            />
            <small>Average is ~4500 L/month</small>
          </div>

          <div className="form-group">
            <label htmlFor="recycling">♻️ Recycling Rate (%)</label>
            <input
              type="number"
              id="recycling"
              name="recycling"
              min="0"
              max="100"
              step="1"
              value={formData.recycling}
              onChange={handleChange}
              placeholder="e.g. 50"
              required
            />
            <small>Percentage of waste recycled</small>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze My Impact"}
          </button>
        </form>

        {/* Error Message Display */}
        {error && <div className="error-message">{error}</div>}
      </section>

      {/* ── Results Section ────────────────────────────── */}
      {result && (
        <section className="results-section slide-in">
          <h2>Your Analysis</h2>
          
          <div className="score-card card">
            <h3>Eco Score</h3>
            <div className={`score-circle ${result.eco_score >= 70 ? 'high' : result.eco_score >= 40 ? 'medium' : 'low'}`}>
              <span className="score-number">{result.eco_score}</span>
              <span className="score-max">/ 100</span>
            </div>
          </div>

          <div className="recommendations-card card">
            <h3>Personalized Recommendations</h3>
            {result.recommendations && result.recommendations.length > 0 ? (
              <ul className="recommendations-list">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="recommendation-item">
                    <div className="rec-tip">💡 {rec.tip}</div>
                    <div className="rec-impact">📈 {rec.impact}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recommendations available right now.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
