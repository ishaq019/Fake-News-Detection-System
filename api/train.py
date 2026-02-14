from pathlib import Path
import pandas as pd
import re
import pickle

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


BASE_DIR = Path(__file__).resolve().parent

def load_file(stem: str) -> pd.DataFrame:
    csv_path = BASE_DIR / f"{stem}.csv"
    xlsx_path = BASE_DIR / f"{stem}.xlsx"

    if csv_path.exists():
        return pd.read_csv(csv_path)
    if xlsx_path.exists():
        return pd.read_excel(xlsx_path)

    files = [p.name for p in BASE_DIR.iterdir()]
    raise FileNotFoundError(
        f"Could not find {stem}.csv or {stem}.xlsx in {BASE_DIR}\n"
        f"Files present: {files}"
    )

fake = load_file("Fake")
true = load_file("True")

# Labels: 1 = Unreliable/Fake, 0 = Reliable/True
fake["label"] = 1
true["label"] = 0

# Keep only 'text' if present, else fall back to 'title'+'text' if needed
if "text" not in fake.columns or "text" not in true.columns:
    raise ValueError(f"'text' column not found. Fake cols={list(fake.columns)}, True cols={list(true.columns)}")

data = pd.concat([fake[["text", "label"]], true[["text", "label"]]], ignore_index=True)

print(f"Loaded samples: {len(data)} | Fake: {len(fake)} | True: {len(true)}")

# ---- Preprocess (matches your original approach) ----
stemmer = PorterStemmer()
stop_words = set(stopwords.words("english"))

def preprocess(text: str) -> str:
    text = re.sub(r"[^a-zA-Z]", " ", str(text))
    words = text.lower().split()
    words = [stemmer.stem(w) for w in words if w not in stop_words]
    return " ".join(words)

data["clean_text"] = data["text"].apply(preprocess)

# Avoid empty rows after preprocessing
data = data[data["clean_text"].str.len() > 0].reset_index(drop=True)

# ---- Vectorize ----
vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2))
X = vectorizer.fit_transform(data["clean_text"])
y = data["label"].astype(int)

# ---- Split ----
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ---- Train ----
model = LogisticRegression(max_iter=2000, n_jobs=1)  # n_jobs=1 keeps resource use predictable
model.fit(X_train, y_train)

# ---- Evaluate ----
pred = model.predict(X_test)
acc = accuracy_score(y_test, pred)

print(f"Accuracy: {acc:.4f}")
print(classification_report(y_test, pred, digits=4))

# ---- Save artifacts (overwrite old) ----
with open(BASE_DIR / "model.pkl", "wb") as f:
    pickle.dump(model, f)

with open(BASE_DIR / "vector.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("Saved: model.pkl, vector.pkl")
