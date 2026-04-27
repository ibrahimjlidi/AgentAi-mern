# GreenLife: Detailed Project Walkthrough 🧭

This document provides a deep dive into every file of the GreenLife project, explaining the "Why" and "How" for each part of the stack.

---

## 📁 1. The AI Service (Python + FastAPI)
This service is the "intelligence" of the application. It handles data processing and Machine Learning.

### 📄 `requirements.txt`
Lists the Python libraries needed:
- `fastapi` & `uvicorn`: To create and run the web server.
- `pydantic`: For data validation (ensures the input is correct).
- `scikit-learn` & `pandas`: For Machine Learning and data manipulation.
- `joblib`: To save and load the trained model file.

### 📄 `main.py`
The entry point for the AI API.
- **Role**: Defines the URL endpoints.
- **Key Code**: `@app.post("/analyze")` takes user data and calls the `analyze_consumption` function.

### 📄 `model.py`
The core AI logic.
- **Loading**: It tries to load `model.pkl` on startup.
- **Logic**: 
    - If the model exists, it uses `ml_model.predict()` to calculate the Eco Score.
    - It also applies "Expert Rules" (if statements) to generate text recommendations (e.g., "Install LED bulbs").

### 📄 `generate_data.py` & `train.py`
The Machine Learning pipeline.
- **Generate**: Creates 1,000 fake users with random consumption to simulate a real-world dataset.
- **Train**: Uses a **Random Forest** algorithm to learn how electricity/water/recycling affects the score. It outputs `model.pkl`.

---

## 📁 2. The Backend (Node.js + Express)
The "Orchestrator" that connects the user to the database and the AI.

### 📄 `server.js`
The main server file.
- **Role**: Sets up the Express app, handles CORS (so the frontend can talk to it), and connects to MongoDB.

### 📄 `routes/analyze.js`
The "Proxy" or "Bridge".
- **Why?**: The frontend shouldn't talk directly to the AI service for security.
- **How**: It receives a request from React, uses `axios.post` to send it to the Python service (port 8000), waits for the answer, and sends it back to the user.

---

## 📁 3. The Frontend (React + Vite)
The user interface where everything comes to life.

### 📄 `src/components/Dashboard.jsx`
The most important frontend file.
- **State**: Uses `useState` to track what the user types in the form.
- **API Call**: When "Analyze" is clicked, it sends a POST request to `/api/analyze` (the Node.js backend).
- **Rendering**: Once the result arrives, it displays the Eco Score in a beautiful card and lists the recommendations.

### 📄 `src/index.css`
Contains the "Eco-friendly" design system, using greens, whites, and smooth transitions to make the app feel premium.

---

## 🚀 Step-by-Step Execution Flow
1.  **User** enters data in the **React Form**.
2.  **React** sends data to **Node.js** (`/api/analyze`).
3.  **Node.js** forwards data to **Python FastAPI** (`/analyze`).
4.  **Python** runs the data through the **ML Model** and generates tips.
5.  **Python** returns JSON to **Node.js**.
6.  **Node.js** returns JSON to **React**.
7.  **React** displays the results to the **User**.
