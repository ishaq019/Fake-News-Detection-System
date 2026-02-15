import { useMemo, useState } from "react";
import "./App.css";

const API_BASE = "https://backend-hosting-fake-news-detection.vercel.app";

export default function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { chars, words };
  }, [text]);

  async function predict() {
    setError("");
    setResult(null);

    const trimmed = text.trim();
    if (trimmed.length < 10) {
      setError("Enter at least 10 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.detail || "Prediction failed.");
      setResult(data);
    } catch (e) {
      const msg = e?.message || "Something went wrong.";
      setError(msg === "Failed to fetch"
        ? "Failed to reach backend. This is usually CORS or backend downtime."
        : msg
      );
    } finally {
      setLoading(false);
    }
  }

  function fillExample() {
    setText(
      "Officials confirmed the incident occurred on Tuesday, according to a public statement. Local reporters and witnesses corroborated the timeline and no injuries were reported."
    );
    setError("");
    setResult(null);
  }

  function clearAll() {
    setText("");
    setError("");
    setResult(null);
  }

  const confPct = result ? Math.round((result.confidence ?? 0) * 100) : 0;
  const badgeClass =
    !result ? "badge" : result.prediction === 0 ? "badge reliable" : "badge unreliable";

  return (
    <div className="shell">
      <div className="page">
        <header className="header">
          <div className="brand">
            <h1>Fake News Detector</h1>
            <p className="sub">
              Powered by FastAPI on Vercel. Frontend hosted on GitHub Pages.
            </p>
          </div>

          <div className="topActions" aria-label="API links">
            <a className="chipLink" href={`${API_BASE}/docs`} target="_blank" rel="noreferrer">
              Docs
            </a>
            <a className="chipLink" href={`${API_BASE}/health`} target="_blank" rel="noreferrer">
              Health
            </a>
          </div>
        </header>

        <main className="grid">
          <section className="card">
            <div className="row">
              <h2>Paste news text</h2>
              <div className="muted">
                {stats.words} words • {stats.chars} chars
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the news content here..."
            />

            <div className="actions">
              <button className="ghost" onClick={fillExample} disabled={loading}>
                Try example
              </button>
              <button className="ghost" onClick={clearAll} disabled={loading || !text}>
                Clear
              </button>
              <button className="primary" onClick={predict} disabled={loading}>
                {loading ? "Predicting..." : "Predict"}
              </button>
            </div>

            {error && (
              <div className="error">
                <div className="errorTitle">Request failed</div>
                <div className="errorBody">{error}</div>
              </div>
            )}
          </section>

          <section className="card">
            <h2>Result</h2>

            {!result ? (
              <div className="empty">
                No prediction yet. Enter text and click <b>Predict</b>.
              </div>
            ) : (
              <>
                <div className={badgeClass}>
                  <span className="badgeMain">{result.label}</span>
                  <span className="pill">class: {result.prediction}</span>
                  <span className="pill">{result.ms} ms</span>
                </div>

                <div className="meter">
                  <div className="meterTop">
                    <span className="muted">Confidence</span>
                    <span className="muted">{confPct}%</span>
                  </div>
                  <div className="bar">
                    <div className="fill" style={{ width: `${confPct}%` }} />
                  </div>
                  <p className="hint">
                    Confidence is probability — useful signal, not absolute truth.
                  </p>
                </div>
              </>
            )}
          </section>
        </main>

        <footer className="footer">
          <span>Frontend: GitHub Pages</span>
          <span className="dot">•</span>
          <span>Backend: Vercel</span>
        </footer>
      </div>
    </div>
  );
}
