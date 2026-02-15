# Fake News Detection System 📰🚫

A full-stack web application (**React frontend + FastAPI backend**) that classifies a given news text as **Reliable** or **Unreliable** using an NLP pipeline with **TF-IDF + Logistic Regression**.

---

## Live Links

| Component | URL |
|---|---|
| Frontend (GitHub Pages + custom domain) | https://syedishaq.me/Fake-News-Detection-System/ |
| Backend API (Vercel) | https://backend-hosting-fake-news-detection.vercel.app/ |

---

## Features

| Category | Feature |
|---|---|
| Core | Predicts **Reliable** vs **Unreliable** from raw news text |
| NLP | Regex cleanup → lowercasing → stopwords removal (NLTK) → Porter stemming |
| ML | TF-IDF vectorization (uni+bi-grams) + Logistic Regression classifier |
| API | `/predict`, `/health`, `/meta`, Swagger UI at `/docs` |
| UX | Single-page flow: paste text → click predict → see result + confidence + latency |
| Hosting | Frontend on GitHub Pages (path-based), backend on Vercel |

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React (SPA) |
| Backend | FastAPI (Python) |
| ML | scikit-learn (`TfidfVectorizer`, `LogisticRegression`) |
| NLP | NLTK stopwords, `PorterStemmer` |
| Hosting | GitHub Pages (frontend) + Vercel (backend) |

---

## Architecture Overview

Browser (React SPA) -> FastAPI (Vercel): POST /predict -> preprocess text (regex + stopwords + stemming) -> TF-IDF transform (vector.pkl) -> Logistic Regression inference (model.pkl) <- JSON response (label + confidence + latency)

---

## API Reference

### Base URL
`https://backend-hosting-fake-news-detection.vercel.app`

### Endpoints

#### `GET /`
Returns a basic message.

**Response (200):**


Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   { "message": "API running. See /docs. Use POST /predict." }   `

#### GET /health

Health check.

**Response (200):**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   { "ok": true }   `

#### GET /meta

Runtime metadata (model/vectorizer types and label mapping).

**Response (200):**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "model": "LogisticRegression",    "vectorizer": "TfidfVectorizer",    "labels": { "0": "Reliable", "1": "Unreliable" }  }   `

#### POST /predict

Predict classification for input text.

**Request Body**

FieldTypeConstraintstextstring10â€“20000 chars

**Response Body**

FieldTypeMeaningpredictionint0 = Reliable, 1 = UnreliablelabelstringHuman labelconfidencefloatMax predicted probability (if available)msintInference time (ms)

**Example Request**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   curl -X POST "https://backend-hosting-fake-news-detection.vercel.app/predict" \    -H "Content-Type: application/json" \    -d "{\"text\":\"This is a sample news paragraph long enough to test prediction.\"}"   `

**Example Response**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   {    "prediction": 1,    "label": "Unreliable",    "confidence": 0.88,    "ms": 15  }   `

Installation & Usage
--------------------

### Prerequisites

ToolRecommendedPython3.10+ (3.11 ideal)Node.js18+GitLatest

### Backend (FastAPI) â€” Run Locally

1.  Install dependencies:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   pip install -r requirements.txt   `

1.  Start the API:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   python -m uvicorn api.main:app --reload --host 127.0.0.1 --port 8000   `

1.  Validate:
    

*   Health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
    
*   Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
    

### Frontend (React) â€” Run Locally

From your frontend directory (example: fake-news-ui/):

1.  Install:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

1.  Start dev server:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm run dev   `

1.  Set the API base URL in the frontend:
    

*   Local dev backend: http://127.0.0.1:8000
    
*   Production backend: https://backend-hosting-fake-news-detection.vercel.app
    

### Using the App (End-user Flow)

1.  Open the frontend URL
    
2.  Paste a news paragraph (â‰¥ 10 characters)
    
3.  Click **Predict**
    
4.  View:
    
    *   classification (Reliable/Unreliable)
        
    *   confidence score
        
    *   response time
        

ML Pipeline
-----------

StageDetailsLabels0 = Reliable (True), 1 = Unreliable (Fake)Preprocessingletters-only regex â†’ lowercase â†’ stopwords removal â†’ Porter stemmingVectorizerTfidfVectorizer(max\_features=10000, ngram\_range=(1,2))ModelLogisticRegression(max\_iter=2000, n\_jobs=1)Artifactsvector.pkl, model.pkl

Model Performance
-----------------

Training run reported:

MetricValueAccuracy**0.9893**

**Classification Report (summary):**

*   Class 0 (Reliable): precision **0.9859**, recall **0.9921**, f1 **0.9889**
    
*   Class 1 (Unreliable): precision **0.9925**, recall **0.9867**, f1 **0.9896**
    

Deployment
----------

### Frontend (GitHub Pages under custom domain path)

Hosted at:

*   [https://syedishaq.me/Fake-News-Detection-System/](https://syedishaq.me/Fake-News-Detection-System/)
    

**Important:** GitHub Pages sub-path hosting requires correct base path configuration; otherwise JS/CSS assets may 404 and the page may render blank.

### Backend (Vercel)

Hosted at:

*   [https://backend-hosting-fake-news-detection.vercel.app/](https://backend-hosting-fake-news-detection.vercel.app/)
    

**Important checks:**

*   model.pkl and vector.pkl must be included in deployment
    
*   NLTK stopwords must be available (build-time download or runtime fallback)
    
*   CORS must allow the origin: https://syedishaq.me (origin has no path)
    

Troubleshooting
---------------

ProblemSymptomFixCORS blockedâ€œRequest failed / Failed to reach backendâ€Allow origin https://syedishaq.me in backend CORSGitHub Pages blankConsole shows JS/CSS 404Set correct base path for subfolder deploymentNLTK stopwords missingLookupError: stopwordsDownload stopwords at build or add runtime fallbackArtifacts missingBackend fails at startupEnsure model.pkl + vector.pkl exist in expected location

Contributing
------------

1.  Fork the repository
    
2.  Create a feature branch:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git checkout -b feature/your-feature-name   `

1.  Make changes and commit:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git commit -m "Add: "   `

1.  Push and open a Pull Request.
    

**Guidelines**

*   Keep PRs small and focused
    
*   Add screenshots for UI changes
    
*   Add request/response examples for API changes
    
*   Do not commit secrets (tokens/keys)
    

Contact
-------

TypeDetailsNameIshaqWebsite[https://syedishaq.me](https://syedishaq.me)GitHub[https://github.com/ishaq019](https://github.com/ishaq019)Repository[https://github.com/ishaq019/Fake-News-Detection-System](https://github.com/ishaq019/Fake-News-Detection-System)

\-
