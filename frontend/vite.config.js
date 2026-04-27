import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * vite.config.js
 * ---------------
 * Vite configuration file.
 *
 * The proxy setting below forwards any request that starts with /api
 * from the React dev server (port 3000) to the Express backend (port 5000).
 *
 * This means in React you can write:
 *   axios.post("/api/analyze", data)
 * instead of:
 *   axios.post("http://localhost:5000/api/analyze", data)
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // React runs on http://localhost:3000
    proxy: {
      // Proxy /api/* → http://localhost:5000/api/*
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
