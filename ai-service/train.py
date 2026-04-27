import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib

def train_model():
    print("Loading dataset...")
    df = pd.read_csv("dataset.csv")

    # Features (X) and Target (y)
    X = df[["electricity", "water", "recycling"]]
    y = df["eco_score"]

    # Split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training RandomForestRegressor model...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    print("Evaluating model...")
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(f"Mean Squared Error: {mse:.2f}")
    print(f"R-squared Score: {r2:.2f}")

    print("Saving model to model.pkl...")
    joblib.dump(model, "model.pkl")
    print("Training complete!")

if __name__ == "__main__":
    train_model()
