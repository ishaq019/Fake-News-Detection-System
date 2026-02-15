# 📰 Fake News Detection System

![Fake News Detection System Banner](assets/banner.png)

A full-stack web app (**React SPA + FastAPI API**) that classifies news text as **Reliable** or **Unreliable** using an NLP + ML pipeline (**TF-IDF (uni+bi-grams) + Logistic Regression**).

## 🔗 Live Links

| Component | URL |
|---|---|
| **Frontend (GitHub Pages + custom domain)** | https://syedishaq.me/Fake-News-Detection-System/ |
| **Backend API (Vercel)** | https://backend-hosting-fake-news-detection.vercel.app/ |
| **Swagger UI** | https://backend-hosting-fake-news-detection.vercel.app/docs |

## ✨ Features

| Category | Feature |
|---|---|
| Core | Predicts **Reliable** vs **Unreliable** from raw news text |
| NLP | Regex cleanup → lowercasing → stopwords removal (NLTK) → Porter stemming |
| ML | TF-IDF vectorization (uni+bi-grams) + Logistic Regression classifier |
| API | `/predict`, `/health`, `/meta`, Swagger UI at `/docs` |
| UX | Paste text → click predict → see **label + confidence + latency** |
| Hosting | Frontend on GitHub Pages (path-based), backend on Vercel |

## 🧰 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React (SPA) |
| Backend | FastAPI (Python) |
| ML | scikit-learn (`TfidfVectorizer`, `LogisticRegression`) |
| NLP | NLTK stopwords, `PorterStemmer` |
| Hosting | GitHub Pages (frontend) + Vercel (backend) |

## 🏗️ Architecture

```text
Browser (React SPA)
  -> FastAPI (Vercel): POST /predict
    -> preprocess text (regex + stopwords + stemming)
    -> TF-IDF transform (vector.pkl)
    -> Logistic Regression inference (model.pkl)
  <- JSON response (label + confidence + latency)
```

## 📚 API Reference

**Base URL:** https://backend-hosting-fake-news-detection.vercel.app

### GET `/`

Returns a basic message.

**Response (200):**
```json
{ "message": "API running. See /docs. Use POST /predict." }
```

### GET `/health`

Health check.

**Response (200):**
```json
{ "ok": true }
```

### GET `/meta`

Runtime metadata.

**Response (200):**
```json
{
  "model": "LogisticRegression",
  "vectorizer": "TfidfVectorizer",
  "labels": { "0": "Reliable", "1": "Unreliable" }
}
```

### POST `/predict`

Predict classification for input text.

#### Request Body

| Field | Type | Constraints |
|---|---|---|
| `text` | string | 10–20000 chars |

#### Response Body

| Field | Type | Meaning |
|---|---|---|
| `prediction` | int | 0 = Reliable, 1 = Unreliable |
| `label` | string | Human label |
| `confidence` | float | Max predicted probability (if available) |
| `ms` | int | Inference time (ms) |

#### Example Request

```bash
curl -X POST "https://backend-hosting-fake-news-detection.vercel.app/predict" \
  -H "Content-Type: application/json" \
  -d '{"text":"This is a sample news paragraph long enough to test prediction."}'
```

#### Example Response

```json
{ "prediction": 1, "label": "Unreliable", "confidence": 0.88, "ms": 15 }
```

## 🚀 Installation & Usage

### ✅ Prerequisites

| Tool | Recommended |
|---|---|
| Python | 3.10+ (3.11 ideal) |
| Node.js | 18+ |
| Git | Latest |

## 🧪 Run Backend (FastAPI) Locally

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the API:
   ```bash
   python -m uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
   ```

3. Validate:
   - http://127.0.0.1:8000/health  
   - http://127.0.0.1:8000/docs

## 🖥️ Run Frontend (React) Locally

From your frontend directory (example: `fake-news-ui/`):

1. Install:
   ```bash
   npm install
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Configure API base URL:
   - Local backend: `http://127.0.0.1:8000`
   - Production backend: `https://backend-hosting-fake-news-detection.vercel.app`

**Tip:** keep API URL in an env var like `VITE_API_BASE_URL` (Vite) or `REACT_APP_API_BASE_URL` (CRA), and commit a `.env.example`.

## ✅ End-user Flow

1. Open the frontend: https://syedishaq.me/Fake-News-Detection-System/  
2. Paste a news paragraph (≥ 10 characters)  
3. Click **Predict**  
4. View:
   - classification (Reliable/Unreliable)
   - confidence score
   - response time (ms)

## 🧠 ML Pipeline

| Stage | Details |
|---|---|
| Labels | 0 = Reliable (True), 1 = Unreliable (Fake) |
| Preprocessing | letters-only regex → lowercase → stopwords removal → Porter stemming |
| Vectorizer | `TfidfVectorizer(max_features=10000, ngram_range=(1,2))` |
| Model | `LogisticRegression(max_iter=2000, n_jobs=1)` |
| Artifacts | `vector.pkl`, `model.pkl` |

## 📈 Model Performance

Training run reported:

| Metric | Value |
|---|---|
| Accuracy | 0.9893 |

Classification report (summary):

- Class 0 (Reliable): precision 0.9859, recall 0.9921, f1 0.9889  
- Class 1 (Unreliable): precision 0.9925, recall 0.9867, f1 0.9896

## 🌍 Deployment Notes

### Frontend (GitHub Pages under custom domain path)

- Hosted at: https://syedishaq.me/Fake-News-Detection-System/  
- **Gotcha:** GitHub Pages sub-path hosting requires correct base path configuration. If wrong, JS/CSS assets may 404 and the page can render blank.

### Backend (Vercel)

- Hosted at: https://backend-hosting-fake-news-detection.vercel.app/

**Important checks**
- `model.pkl` and `vector.pkl` must ship with the deployment
- NLTK stopwords must be available (build-time download or runtime fallback)
- CORS must allow the origin: `https://syedishaq.me` *(origin has no path)*

## 🧯 Troubleshooting

| Problem | Symptom | Fix |
|---|---|---|
| CORS blocked | “Request failed / Failed to reach backend” | Allow origin `https://syedishaq.me` in backend CORS |
| GitHub Pages blank | Console shows JS/CSS 404 | Set correct base path for subfolder deployment |
| NLTK stopwords missing | `LookupError: stopwords` | Download stopwords at build or add runtime fallback |
| Artifacts missing | Backend fails at startup | Ensure `model.pkl` + `vector.pkl` exist where expected |

## 🔐 Security Note (Pickle)

Pickle files can execute arbitrary code when loaded. Never load untrusted `.pkl` files and keep `model.pkl` / `vector.pkl` under your control.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add: "
   ```
4. Push and open a Pull Request

**Guidelines**
- Keep PRs small and focused
- Add screenshots for UI changes
- Add request/response examples for API changes
- Do not commit secrets (tokens/keys)

## 📬 Contact

| Type | Details |
|---|---|
| Name | Ishaq |
| Website | https://syedishaq.me |
| GitHub | https://github.com/ishaq019 |
| Repository | https://github.com/ishaq019/Fake-News-Detection-System |

## 🧾 Assumptions

- Backend entrypoint is `api.main:app` (FastAPI)
- Frontend is a React SPA deployed under the GitHub Pages sub-path

## 🧭 Next Steps

- Add `.env.example` for frontend/backend configuration (API base URL, allowed origins)
- Add CI/CD (GitHub Actions) for automated frontend deploy and backend validation
- Add tests for `/predict` with sample inputs and expected response shape

## 🎨 Generate the README Banner (DALL·E Prompt)

Save the generated image as: `assets/banner.png`

**Prompt:**
> A modern flat vector banner for a “Fake News Detection System” web app. Include subtle icons: newspaper, shield/checkmark for reliable, warning triangle for unreliable, and small AI/ML nodes. Clean white background, minimal pastel accents, professional tech style, wide aspect ratio 3:1, no photorealism, no text artifacts.

## 📄 License

Add a license file if you plan to open-source this project (MIT is common). *(If you already have one, link it here.)*
