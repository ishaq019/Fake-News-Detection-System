from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pathlib import Path
import pickle
import re
import time
from functools import lru_cache

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

app = FastAPI(
    title="Fake News Detection API",
    version="1.0.0",
    description="Predict whether a news text is Reliable or Unreliable using a TF-IDF + Logistic Regression model."
)

# ✅ For local dev allow all. For production, lock to your GitHub Pages domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ishaq019.github.io",
        "https://ishaq019.github.io/Fake-News-Detection-System",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    # allow_methods=["GET", "POST", "OPTIONS"],
    allow_methods=["*"],
    allow_headers=["*"],
)


BASE_DIR = Path(__file__).resolve().parent
STEMMER = PorterStemmer()

@lru_cache(maxsize=1)
def stopwords_set():
    return set(stopwords.words("english"))

def preprocess(text: str) -> str:
    text = re.sub(r"[^a-zA-Z]", " ", str(text))
    words = text.lower().split()
    sw = stopwords_set()
    words = [STEMMER.stem(w) for w in words if w not in sw]
    return " ".join(words)

with open(BASE_DIR / "vector.pkl", "rb") as f:
    VECTORIZER = pickle.load(f)

with open(BASE_DIR / "model.pkl", "rb") as f:
    MODEL = pickle.load(f)

LABELS = {0: "Reliable", 1: "Unreliable"}

class PredictRequest(BaseModel):
    text: str = Field(..., min_length=10, max_length=20000)

class PredictResponse(BaseModel):
    prediction: int
    label: str
    confidence: float
    ms: int

@app.get("/")
def root():
    return {"message": "API running. See /docs. Use POST /predict."}

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/meta")
def meta():
    return {
        "model": type(MODEL).__name__,
        "vectorizer": type(VECTORIZER).__name__,
        "labels": LABELS
    }

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    t0 = time.perf_counter()

    cleaned = preprocess(req.text)
    if not cleaned.strip():
        raise HTTPException(status_code=400, detail="Text became empty after preprocessing.")

    X = VECTORIZER.transform([cleaned])
    pred = int(MODEL.predict(X)[0])

    if hasattr(MODEL, "predict_proba"):
        proba = MODEL.predict_proba(X)[0]
        conf = float(max(proba))
    else:
        conf = 0.5

    ms = int((time.perf_counter() - t0) * 1000)
    return PredictResponse(prediction=pred, label=LABELS[pred], confidence=conf, ms=ms)
