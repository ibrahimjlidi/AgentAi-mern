"""
main.py — GreenLife AI Service Entry Point
-------------------------------------------
This is the FastAPI application that exposes the AI analysis
endpoint. FastAPI automatically generates documentation at:
  → http://localhost:8000/docs   (Swagger UI)
  → http://localhost:8000/redoc  (ReDoc)

To run this server:
  uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import our data models and analysis function from model.py
from model import ConsumptionInput, AnalysisResult, ChatInput, ChatResponse, analyze_consumption, get_chatbot_response

# -----------------------------------------------------------
# Initialize the FastAPI application
# -----------------------------------------------------------
app = FastAPI(
    title="GreenLife AI Service",
    description="Rule-based AI that analyzes household consumption and provides eco-friendly recommendations.",
    version="1.0.0"
)

# -----------------------------------------------------------
# CORS Middleware
# Allows the Node.js backend (running on a different port)
# to call this Python service without browser security errors.
# -----------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # In production, restrict this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------------------------
# Root endpoint — Health check
# -----------------------------------------------------------
@app.get("/")
def root():
    """
    Simple health check endpoint.
    Returns a welcome message if the service is running.
    """
    return {"message": "GreenLife AI Service is running 🌱"}


# -----------------------------------------------------------
# Main Analysis Endpoint
# POST /analyze
# -----------------------------------------------------------
@app.post("/analyze", response_model=AnalysisResult)
def analyze(data: ConsumptionInput):
    """
    Analyzes the user's consumption data and returns:
    - eco_score: a score from 0 (terrible) to 100 (perfect)
    - recommendations: a list of personalized, actionable tips

    Example request body:
    {
        "electricity": 350,
        "water": 5000,
        "recycling": 30
    }
    """
    # Delegate to our analysis function in model.py
    result = analyze_consumption(data)
    return result

@app.post("/chat", response_model=ChatResponse)
def chat(data: ChatInput):
    """
    Endpoint for the GreenLife Chatbot.
    """
    response_text = get_chatbot_response(data.message)
    return ChatResponse(response=response_text)
