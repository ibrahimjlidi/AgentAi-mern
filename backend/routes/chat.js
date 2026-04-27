const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * POST /api/chat
 * Proxy for the Python AI Chat Service
 */
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Forward the message to the Python FastAPI service on port 8000
        const response = await axios.post('http://localhost:8000/chat', { message });
        
        // Return the AI's response back to the React frontend
        res.json(response.data);
    } catch (error) {
        console.error("Chat Error:", error.message);
        res.status(500).json({ error: "L'assistant IA est temporairement indisponible." });
    }
});

module.exports = router;
