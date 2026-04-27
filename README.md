# AgentAi-mern 🌱

GreenLife is a MERN stack application (MongoDB, Express, React, Node.js) integrated with a Python FastAPI AI service to help users reduce their environmental impact.

## 🚀 Architecture
- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **AI Service**: Python + FastAPI + Scikit-Learn
- **Database**: MongoDB

## 🛠️ Getting Started

### 1. AI Service (Python)
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
python generate_data.py
python train.py
uvicorn main:app --port 8000
```

### 2. Backend (Node.js)
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## 🤖 AI Logic
The project uses a **RandomForestRegressor** model trained on synthetic consumption data to predict a user's Eco Score.
