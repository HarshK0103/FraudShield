<h1 align="center">💳 FraudShield</h1>
<h3 align="center">🔐 Hybrid Credit Card Fraud Detection using XGBoost + Autoencoder</h3>

---

## 🚀 Overview

**FraudShield** is a **production‑ready, full‑stack machine learning application** designed to detect fraudulent credit card transactions using a **hybrid modeling approach**. It combines the strengths of **supervised learning (XGBoost)** and **unsupervised learning (Deep Autoencoder)** to deliver accurate, explainable, and robust fraud predictions through a modern web interface.

---

## 🌐 Live Deployment

- **Frontend (React + Vite + Tailwind CSS):**  
  🔗 https://fraud-shield-vert.vercel.app/

- **Backend (FastAPI + ML Inference):**  
  🔗 https://fraudshield-7hs7.onrender.com

> ⚠️ Backend may take a few seconds to wake up if deployed on free-tier hosting.

---

## 🚀 Why FraudShield?

Credit card fraud is highly **imbalanced**, **evolving**, and **costly**. Traditional classifiers struggle with:
- Detecting **novel fraud patterns**
- Maintaining performance on **unseen data**
- Explaining why a transaction is risky

FraudShield addresses these challenges by:
- Detecting **known fraud patterns** with XGBoost  
- Detecting **unknown / zero-day frauds** using anomaly detection  
- Combining both signals into a **Hybrid Risk Score**  
- Presenting results in a **clean, interactive dashboard**

---

## 🧠 Core ML Approach

### 1️⃣ XGBoost Classifier (Supervised)
- Trained on labeled fraud data
- Outputs probability of fraud
- High precision on known fraud signatures
- Handles class imbalance effectively

### 2️⃣ Autoencoder (Unsupervised)
- Trained only on normal (non-fraud) transactions
- Learns normal transaction behavior
- High reconstruction error → anomalous transaction
- Detects new and evolving fraud patterns

### 3️⃣ Hybrid Risk Score
A weighted combination of both models:

```
Hybrid Risk Score = α × P(fraud | XGBoost) + (1 − α) × Anomaly Score
```

- α dynamically balances confidence
- Final score scaled to **0–100%**
- Fraud flag triggered if score > 50%

---

## 🏗️ System Architecture

```
User CSV Upload
      │
      ▼
React Frontend (Vite + Tailwind)
      │
      ▼
FastAPI Backend (REST API)
      │
      ├── Preprocessing (Scaling, Validation)
      ├── XGBoost Inference
      ├── Autoencoder Inference
      └── Hybrid Risk Computation
      │
      ▼
JSON Response
      │
      ▼
Dashboard + Charts + CSV Download
```

---

## 🖥️ Frontend Features

- 📁 CSV file upload
- 📊 Interactive charts (risk distribution, fraud ratio)
- 📋 Detailed transaction-level results table
- 🔢 Fraud probability, anomaly score & hybrid score
- 📥 Download predictions as CSV
- 🌙 Dark‑themed FinTech UI (Tailwind + Framer Motion)

**Tech Stack**
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Axios

---

## ⚙️ Backend Features

- RESTful API using FastAPI
- CSV validation & preprocessing
- Model loading once at startup (optimized)
- Batch inference
- Downloadable prediction results
- CORS enabled for frontend access

**Tech Stack**
- FastAPI
- Pandas, NumPy
- Scikit‑learn
- XGBoost
- TensorFlow / Keras
- Joblib

---

## 📂 Current Project Structure

```
FraudShield/
│
├── backend/
│   ├── main.py              # FastAPI app & routes
│   ├── inference.py         # Hybrid ML inference logic
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── index.css
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
├── models/
│   ├── xgb_model.pkl
│   ├── autoencoder_model.keras
│   └── scaler.pkl
│
├── dataset/
│   └── creditcard.csv
│
├── notebook/
│   └── Credit card Fraud.ipynb
│
├── sample.csv
├── README.md
└── .gitignore
```

---

## 🧪 Dataset

- **Source:** Kaggle – Credit Card Fraud Detection  
- **Transactions:** 284,807  
- **Fraud Cases:** 492 (0.17%)
- **Features:**  
  - `Time`, `Amount`  
  - PCA components `V1`–`V28`

> Full dataset not included due to size.

---

## ▶️ Running Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:8080`  
Backend: `http://127.0.0.1:8000`

---

## 📈 Output Example

Each transaction produces:
- Fraud Probability (%)
- Anomaly Score (%)
- Hybrid Risk Score (%)
- Final Prediction (Fraud / Non‑Fraud)

---

## 🎯 Use Cases

- Banking fraud monitoring
- FinTech risk engines
- ML portfolio projects
- Research on hybrid anomaly detection
- Real‑world ML system design

---

## 🧑‍💻 Author

**Harsh Karekar**  
B.Tech – Electronics & Communication Engineering  
Aspiring Data Scientist / AI/ML Engineer
 
📫 [LinkedIn](https://www.linkedin.com/in/harsh-karekar-01h6910a04/) | 💻 [GitHub](https://github.com/HarshK0103)

---

## ⭐ Support

If this project helped you or inspired you:
- ⭐ Star the repository
- 🍴 Fork it
- 🧠 Extend it with explainability (SHAP / LIME)

---

**FraudShield – Detecting Fraud Before It Costs You.**

---
