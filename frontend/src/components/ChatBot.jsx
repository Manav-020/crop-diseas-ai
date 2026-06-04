import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your crop assistant 🌿 Ask me anything about plant diseases, treatments, or farming tips.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMsg = { sender: "user", text: message };

  setChat((prev) => [...prev, userMsg]);
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      {
        sender: "bot",
        text: data.bot_response.answer,
        sources: data.bot_response.sources || [],
      },
    ]);
  } catch (error) {
    setChat((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "⚠️ Could not reach the server. Please try again.",
        sources: [],
      },
    ]);
  }

  setLoading(false);
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-root">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-avatar">🌿</div>
        <div>
          <p className="chatbot-name">Crop Assistant</p>
          <span className="chatbot-status">
            <span className="status-dot" />
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="chatbot-messages">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`message-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}
          >
            {msg.sender === "bot" && (
              <div className="bot-icon">🌱</div>
            )}
            <div
  className={`bubble ${
    msg.sender === "user"
      ? "user-bubble"
      : "bot-bubble"
  }`}
>
  <div>{msg.text}</div>

  {msg.sources?.length > 0 && (
    <div className="source-links">
      {msg.sources.map((source, index) => (
        <a
          key={index}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          🔗 {source.title}
        </a>
      ))}
    </div>
  )}
</div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="message-row bot-row">
            <div className="bot-icon">🌱</div>
            <div className="bubble bot-bubble typing-bubble">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div className="quick-prompts">
        {["What causes leaf blight?", "How to treat rust?", "Organic pesticides?"].map((q) => (
          <button key={q} className="quick-chip" onClick={() => setMessage(q)}>
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="chatbot-input-wrap">
        <input
          className="chatbot-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about crops..."
        />
        <button
          className={`send-btn ${!message.trim() ? "send-disabled" : ""}`}
          onClick={sendMessage}
          disabled={!message.trim() || loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
