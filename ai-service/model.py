"""
model.py — GreenLife AI Logic
-------------------------------
This module contains the core "AI" logic for GreenLife.
It uses a rule-based scoring system to evaluate a user's
environmental impact and generate recommendations.

This is a great starting point for students to understand
how rule-based AI systems work before moving on to ML models.
"""

# -----------------------------------------------------------
# Data Models using Pydantic (for request/response validation)
# -----------------------------------------------------------
from pydantic import BaseModel
from typing import List


class ConsumptionInput(BaseModel):
    """
    Represents the data sent by the user about their consumption habits.
    - electricity: monthly usage in kWh
    - water: monthly usage in liters
    - recycling: percentage of waste they recycle (0–100)
    """
    electricity: float  # kWh per month
    water: float        # Liters per month
    recycling: float    # Recycling rate as a percentage (0–100)


class Recommendation(BaseModel):
    """
    A single recommendation with a tip and its potential impact.
    """
    tip: str
    impact: str


class AnalysisResult(BaseModel):
    """
    The full response returned to the user after analysis.
    - eco_score: a score between 0 and 100 (100 = perfectly eco-friendly)
    - recommendations: list of personalized tips
    """
    eco_score: float
    recommendations: List[Recommendation]


# -----------------------------------------------------------
# Core Analysis Function
# -----------------------------------------------------------

import joblib
import os
import pandas as pd

# Load the ML model if it exists
ML_MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
ml_model = None
if os.path.exists(ML_MODEL_PATH):
    try:
        ml_model = joblib.load(ML_MODEL_PATH)
        print("Successfully loaded ML model!")
    except Exception as e:
        print(f"Error loading ML model: {e}")

class ChatInput(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

def get_chatbot_response(user_message: str) -> str:
    """
    Simplified chatbot logic based on keyword matching.
    """
    msg = user_message.lower()
    
    if "électricité" in msg or "electricity" in msg or "courant" in msg:
        return "Pour réduire votre consommation d'électricité, débranchez les appareils en veille et passez aux ampoules LED !"
    
    if "eau" in msg or "water" in msg or "douche" in msg:
        return "Une douche de 5 minutes consomme environ 60L d'eau. Installer un mousseur peut réduire cela de 50% !"
    
    if "recyclage" in msg or "tri" in msg or "déchet" in msg:
        return "Le tri sélectif est crucial. Séparez bien le verre, le plastique et le papier pour faciliter le recyclage."
    
    if "score" in msg or "calcul" in msg:
        return "Votre Eco Score est calculé par notre modèle de Machine Learning basé sur vos données de consommation mensuelle."
    
    if "bonjour" in msg or "hello" in msg or "salut" in msg:
        return "Bonjour ! Je suis l'assistant GreenLife. Comment puis-je vous aider à réduire votre impact écologique ?"
        
    return "Je n'ai pas bien compris, mais je suis là pour vous aider avec vos questions sur l'écologie et votre score GreenLife !"

def analyze_consumption(data: ConsumptionInput) -> AnalysisResult:
    """
    Main function that:
    1. Calculates an eco score using an ML model (if available) or falls back to rule-based.
    2. Generates recommendations based on rule-based thresholds.

    Returns an AnalysisResult object.
    """

    recommendations = []

    # ---------------------------------------------------
    # RULE 1: High electricity usage
    # ---------------------------------------------------
    if data.electricity > 300:
        recommendations.append(Recommendation(
            tip="Reduce your electricity consumption by switching to LED bulbs and unplugging devices on standby.",
            impact=f"You use {data.electricity} kWh/month. Reducing by 20% could save ~€{round(data.electricity * 0.2 * 0.15, 1)}/month and lower your carbon footprint."
        ))

    # ---------------------------------------------------
    # RULE 2: High water usage
    # ---------------------------------------------------
    if data.water > 4000:
        recommendations.append(Recommendation(
            tip="Install water-saving showerheads and fix any leaking taps to reduce water usage.",
            impact=f"You use {data.water} L/month. Cutting 15% could save ~{round(data.water * 0.15)} liters per month."
        ))

    # ---------------------------------------------------
    # RULE 3: Low recycling rate
    # ---------------------------------------------------
    if data.recycling < 50:
        recommendations.append(Recommendation(
            tip="Sort your waste carefully: paper, plastic, glass, and organic matter should be separated.",
            impact=f"You recycle {data.recycling}% of your waste. Reaching 70% would significantly reduce landfill contributions."
        ))

    # ---------------------------------------------------
    # If everything looks good — reward the user!
    # ---------------------------------------------------
    if not recommendations:
        recommendations.append(Recommendation(
            tip="Great job! Your consumption is already eco-friendly. Keep it up!",
            impact="You are contributing positively to the environment. Share your habits with others!"
        ))

    # ---------------------------------------------------
    # ECO SCORE CALCULATION
    # ---------------------------------------------------
    if ml_model is not None:
        # Use the trained Machine Learning model
        input_df = pd.DataFrame([{
            "electricity": data.electricity,
            "water": data.water,
            "recycling": data.recycling
        }])
        predicted_score = ml_model.predict(input_df)[0]
        eco_score = max(0.0, min(100.0, predicted_score))
    else:
        # Fallback to rule-based formula
        raw_score = (
            100
            - (data.electricity * 0.05)
            - (data.water * 0.002)
            + (data.recycling * 0.2)
        )
        eco_score = max(0.0, min(100.0, raw_score))

    eco_score = round(eco_score, 1)

    return AnalysisResult(
        eco_score=eco_score,
        recommendations=recommendations
    )
