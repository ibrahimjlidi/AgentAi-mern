/**
 * src/App.jsx — Root Application Component
 * ------------------------------------------
 * This is the top-level React component.
 * It renders the page header, the Dashboard, and the footer.
 *
 * In a larger app, you'd add React Router here to handle
 * multiple pages (e.g. /login, /dashboard, /history).
 */

import React from "react";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="app-wrapper">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">GreenLife</span>
          </div>
          <p className="header-tagline">
            Track your footprint. Build better habits.
          </p>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────── */}
      <main className="app-main">
        <Dashboard />
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="app-footer">
        <p>
          🌍 GreenLife &copy; {new Date().getFullYear()} — Built for a
          sustainable future.
        </p>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;
