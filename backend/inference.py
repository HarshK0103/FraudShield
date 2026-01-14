import os
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
import xgboost as xgb

# -------------------------
# Paths
# -------------------------
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MODEL_DIR = os.path.join(BASE_DIR, "models")

AUTOENCODER_PATH = os.path.join(MODEL_DIR, "autoencoder_model.keras")
XGB_MODEL_PATH = os.path.join(MODEL_DIR, "xgb_model.json")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

# -------------------------
# Load Models (ONCE at startup)
# -------------------------
autoencoder = tf.keras.models.load_model(AUTOENCODER_PATH)
autoencoder.trainable = False

xgb_model = xgb.XGBClassifier()
xgb_model.load_model(XGB_MODEL_PATH)

scaler = joblib.load(SCALER_PATH)

# -------------------------
# Feature Definitions
# -------------------------
RAW_COLUMNS = ["Time"] + [f"V{i}" for i in range(1, 29)] + ["Amount"]

EXPECTED_COLUMNS = (
    ["scaled_time", "scaled_amount"] + [f"V{i}" for i in range(1, 29)]
)

# -------------------------
# Inference Function
# -------------------------
def run_fraud_detection(df: pd.DataFrame) -> pd.DataFrame:
    # -------------------------
    # Validate Input Columns
    # -------------------------
    missing_cols = [c for c in RAW_COLUMNS if c not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing required columns: {missing_cols}")

    # -------------------------
    # Feature Preparation
    # -------------------------
    X_raw = df[RAW_COLUMNS].copy()

    # Scale Time & Amount (use .values to avoid sklearn warnings)
    X_raw["scaled_time"] = scaler.transform(X_raw[["Time"]].values)
    X_raw["scaled_amount"] = scaler.transform(X_raw[["Amount"]].values)

    # Drop raw columns
    X = X_raw.drop(columns=["Time", "Amount"])

    # Ensure correct column order
    X = X[EXPECTED_COLUMNS]

    # -------------------------
    # XGBoost Prediction
    # -------------------------
    xgb_probs = xgb_model.predict_proba(X)[:, 1]

    # -------------------------
    # Autoencoder Anomaly Detection
    # -------------------------
    reconstructions = autoencoder.predict(X, verbose=0)
    mse = np.mean(np.square(X.values - reconstructions), axis=1)

    # Safe normalization (avoid divide-by-zero)
    mse_min, mse_max = mse.min(), mse.max()
    if mse_max - mse_min == 0:
        mse_scaled = np.zeros_like(mse)
    else:
        mse_scaled = (mse - mse_min) / (mse_max - mse_min)

    # -------------------------
    # Hybrid Risk Score
    # -------------------------
    risk_score = ((0.5 * xgb_probs) + (0.5 * mse_scaled)) * 100
    risk_score = np.round(risk_score, 2)

    predictions = (risk_score > 50).astype(int)

    # -------------------------
    # Final Output DataFrame
    # -------------------------
    result_df = df.copy()
    result_df["Fraud Probability (%)"] = np.round(xgb_probs * 100, 2)
    result_df["Anomaly Score (%)"] = np.round(mse_scaled * 100, 2)
    result_df["Hybrid Risk Score (%)"] = risk_score
    result_df["Prediction"] = predictions

    return result_df