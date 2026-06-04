import { useState, useRef } from "react";
import ChatBot from "./components/ChatBot";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("/predict response:", data);
      setResult(data);
    } catch (err) {
      alert("Error connecting to backend");
      console.error(err);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="app-root">
      {/* Decorative background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* LEFT PANEL */}
      <main className="left-panel">
        <header className="app-header">
          <div className="logo-badge">
            <span className="logo-icon">🌿</span>
          </div>
          <div>
            <h1 className="app-title">CropScan AI</h1>
            <p className="app-subtitle">Instant disease detection for your crops</p>
          </div>
        </header>

        <div className="upload-section">
          {/* Drop Zone */}
          {!preview ? (
            <div
              className={`drop-zone ${isDragging ? "dragging" : ""}`}
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
            >
              <div className="drop-zone-inner">
                <div className="upload-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="drop-title">Drop your leaf image here</p>
                <p className="drop-sub">or <span className="drop-link">browse files</span></p>
                <p className="drop-hint">PNG, JPG up to 10MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <div className="preview-wrapper">
              <img src={preview} alt="Leaf preview" className="preview-image" />
              <button className="reset-btn" onClick={handleReset} title="Remove image">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="preview-label">{file?.name}</div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            className={`analyze-btn ${loading ? "loading" : ""} ${!file ? "disabled" : ""}`}
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing leaf...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Detect Disease
              </>
            )}
          </button>
        </div>
        {/* Result Card */}
        {result && (
          <div className="result-card animate-in">
            {/* If backend returned only a message (and no disease), show as warning */}
            {result.message && !result.disease ? (
              <div className="result-warning">
                <span className="result-emoji">⚠️</span>
                <h3>{result.message}</h3>
              </div>
            ) : (
              <>
                <div className="result-header">
                  <div className="disease-badge">{result.low_confidence ? "Uncertain Result" : "Disease Detected"}</div>
                  <h2 className="disease-name">🌱 {result.disease}</h2>
                  <div className="confidence-bar-wrap">
                    <span className="confidence-label">Confidence</span>
                    <div className="confidence-track">
                      <div
                        className="confidence-fill"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    <span className="confidence-value">{result.confidence}%</span>
                  </div>
                </div>

                {result.low_confidence && (
                  <div className="low-confidence-note">⚠️ Low confidence — results may be unreliable.</div>
                )}

                <div className="result-body">
                  <div className="result-section">
                    <div className="section-tag solution">💊 Solution</div>
                    <p>{result.solution || "Information not available."}</p>
                  </div>
                  <div className="result-section">
                    <div className="section-tag reason">🧠 Reason</div>
                    <p>{result.reason || "Information not available."}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* RIGHT PANEL — CHATBOT */}
      <aside className="right-panel">
        <ChatBot />
      </aside>
    </div>
  );
}

export default App;
