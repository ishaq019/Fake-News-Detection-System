import { useMemo, useState } from "react";
import "./App.css";

const DEFAULT_API = "http://127.0.0.1:8000"; // change later to your hosted backend

export default function App() {
  const [apiBase, setApiBase] = useState(DEFAULT_API);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null); // {label, prediction, confidence, ms}
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { chars, words };
  }, [text]);

  async function onPredict() {
    setError("");
    setResult(null);

    const trimmed = text.trim();
    if (trimmed.length < 10) {
      setError("Enter at least 10 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.detail || "Prediction failed.");
      }

      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onExample() {
    setText(
      "Officials confirmed the incident occurred on Tuesday, according to a public statement. Local reporters and witnesses corroborated the timeline and no injuries were reported."
    );
    setError("");
    setResult(null);
  }

  function onClear() {
    setText("");
    setError("");
    setResult(null);
  }

  const badge = result?.prediction === 0 ? "reliable" : "unreliable";
  const confPct = result ? Math.round(result.confidence * 100) : 0;

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Fake News Detector</h1>
          <p className="sub">
            Single-page React UI → calls your FastAPI backend. Keep it simple, keep it fast.
          </p>
        </div>

        <div className="apiBox">
          <label>API Base</label>
          <input
            value={apiBase}
            onChange={(e) => setApiBase(e.target.value.trim())}
            placeholder="http://127.0.0.1:8000"
          />
          <small>Tip: later replace with your hosted URL.</small>
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <div className="row">
            <h2>Paste news text</h2>
            <div className="muted">{stats.words} words • {stats.chars} chars</div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the news content here..."
          />

          <div className="actions">
            <button className="ghost" onClick={onExample} disabled={loading}>
              Try example
            </button>
            <button className="ghost" onClick={onClear} disabled={loading || !text}>
              Clear
            </button>
            <button className="primary" onClick={onPredict} disabled={loading}>
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </section>

        <section className="card">
          <h2>Result</h2>

          {!result ? (
            <div className="empty">
              No prediction yet. Enter text and click <b>Predict</b>.
            </div>
          ) : (
            <>
              <div className={`badge ${badge}`}>
                {result.label}
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
                  Confidence is model probability — it’s not truth, it’s a signal.
                </p>
              </div>

              <div className="tips">
                <h3>Quick sanity checks</h3>
                <ul>
                  <li>Short text → unreliable output is common.</li>
                  <li>Sensational language can push it to “Unreliable”.</li>
                  <li>Use it as a filter, not a verdict.</li>
                </ul>
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        <span>Backend docs:</span>
        <a href={`${apiBase}/docs`} target="_blank" rel="noreferrer">
          /docs
        </a>
        <span>•</span>
        <a href={`${apiBase}/meta`} target="_blank" rel="noreferrer">
          /meta
        </a>
      </footer>
    </div>
  );
}
