from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io

from inference import run_fraud_detection

app = FastAPI(
    title="FraudShield API",
    description="Hybrid Credit Card Fraud Detection using XGBoost + Autoencoder",
    version="1.0.0",
)

# -------------------------
# Constants
# -------------------------
REQUIRED_COLUMNS = ["Time"] + [f"V{i}" for i in range(1, 29)] + ["Amount"]

# -------------------------
# CORS CONFIGURATION ✅
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Health Check
# -------------------------
@app.get("/")
def health_check():
    return {"status": "FraudShield API is running"}

# -------------------------
# Prediction Endpoint
# -------------------------
@app.post("/predict")
async def predict_fraud(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        if df.empty:
            raise HTTPException(status_code=400, detail="Uploaded CSV is empty")

        # 🔥 AUTO-FIX COMMON CSV ISSUES
        df = df.loc[:, ~df.columns.str.contains("^Unnamed")]  # drop index col
        df = df.drop(columns=["Class"], errors="ignore")       # drop label

        REQUIRED_COLUMNS = ["Time"] + [f"V{i}" for i in range(1, 29)] + ["Amount"]
        missing_cols = set(REQUIRED_COLUMNS) - set(df.columns)

        if missing_cols:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns: {sorted(missing_cols)}"
            )

        df = df[REQUIRED_COLUMNS]

        if df.isnull().any().any():
            raise HTTPException(
                status_code=400,
                detail="CSV contains missing values (NaN)"
            )

        # ✅ Run inference
        result_df = run_fraud_detection(df)

        total_txns = len(result_df)
        total_frauds = int(result_df["Prediction"].sum())
        fraud_percent = round((total_frauds / total_txns) * 100, 2)

        return JSONResponse(
            content={
                "summary": {
                    "total_transactions": total_txns,
                    "predicted_frauds": total_frauds,
                    "fraud_percentage": fraud_percent,
                },
                "predictions": result_df.to_dict(orient="records"),
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------------------------
# CSV Download Endpoint
# -------------------------
@app.post("/predict/download")
async def predict_and_download(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        # Same validations
        missing_cols = set(REQUIRED_COLUMNS) - set(df.columns)
        if missing_cols:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns: {sorted(missing_cols)}"
            )

        df = df[REQUIRED_COLUMNS]

        result_df = run_fraud_detection(df)

        buffer = io.StringIO()
        result_df.to_csv(buffer, index=False)
        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="text/csv",
            headers={
                "Content-Disposition": "attachment; filename=fraud_detection_results.csv"
            },
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))