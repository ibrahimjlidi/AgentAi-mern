import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import os

def train_chatbot_model():
    if not os.path.exists("chat_dataset.csv"):
        print("Dataset not found. Please run generate_chat_data.py first.")
        return

    print("Loading chat dataset...")
    df = pd.read_csv("chat_dataset.csv")

    # Create a pipeline: Vectorizer -> Classifier
    # This allows us to process raw text directly through the model later
    model_pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2))), # Look at single words and pairs of words
        ('clf', LogisticRegression(max_iter=1000))
    ])

    print("Training NLP Intent Classifier...")
    model_pipeline.fit(df['text'], df['intent'])

    print("Saving chatbot model to chatbot_model.pkl...")
    joblib.dump(model_pipeline, "chatbot_model.pkl")
    print("Chatbot training complete!")

if __name__ == "__main__":
    train_chatbot_model()
