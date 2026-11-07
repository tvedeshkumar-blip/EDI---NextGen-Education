// NextGen Education - NextGen AI Learning Assistant
import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Bot, 
  Send, 
  User, 
  RotateCcw, 
  Copy, 
  Check, 
  Cpu, 
  FlaskConical, 
  FolderGit2, 
  Key,
  ShieldCheck
} from "lucide-react";
import { queryGeminiWithNextGenContext } from "../services/aiService";
import { useToast } from "../context/ToastContext";

const promptSuggestions = [
  "What can I build using an ultrasonic sensor?",
  "Explain ESP32 pinout, 3.3V logic and strapping pins",
  "Why is my 7805 voltage regulator overheating?",
  "How to connect an LDR with an Arduino to make a street light?",
  "Difference between BJT (BC547) and MOSFET (IRFZ44N) switching"
];

export default function AIAssistant() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: `Hello! I am your **NextGen Engineering AI Assistant**.
I can help you understand semiconductor physics, decode pinouts, design breadboard circuits, troubleshoot failing experiments, and suggest capstone projects.

Try asking:
- *"What can I build with an ultrasonic sensor?"*
- *"Explain ESP32 Wi-Fi telemetry with Firebase"*
- *"Why does my LED burn out without a resistor?"*`,
      related: null
    }
  ]);

  const [input, setInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => sessionStorage.getItem("nextgen_gemini_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const { addToast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await queryGeminiWithNextGenContext(textToSend, geminiApiKey);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response.text,
        related: response.related
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "I encountered an issue processing that engineering query. Please try rephrasing."
        }
      ]);
      addToast("Failed to receive AI response.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle immediate send if query param was passed
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-restarted",
        sender: "ai",
        text: "Conversation cleared. How can I assist with your electronics or engineering project today?",
        related: null
      }
    ]);
    addToast("Chat history cleared.", "info");
  };

  const handleCopy = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    addToast("Copied to clipboard!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveApiKey = (key) => {
    setGeminiApiKey(key);
    sessionStorage.setItem("nextgen_gemini_key", key);
    setShowKeyInput(false);
    addToast("Gemini API key saved to browser session.", "success");
  };

  return (
    <div className="container" style={{ padding: "1.5rem 1rem", maxWidth: "940px" }}>
      {/* Header Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.25rem",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="brand-logo-icon" style={{ width: "32px", height: "32px" }}>
              <Bot size={18} />
            </div>
            <h2 style={{ fontSize: "1.5rem" }}>NextGen AI Assistant</h2>
            <span className="badge badge-cyan" style={{ fontSize: "0.7rem" }}>Knowledge Linked</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
            Pedagogical engineering assistant with direct connections to components, labs, and projects.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button 
            onClick={() => setShowKeyInput(!showKeyInput)} 
            className="btn btn-secondary btn-sm"
            title="Configure optional Gemini LLM Key"
          >
            <Key size={14} /> {geminiApiKey ? "API Key Configured" : "Config LLM Key"}
          </button>
          <button onClick={handleClear} className="btn btn-secondary btn-sm" title="Clear Chat">
            <RotateCcw size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Optional Gemini API Key Dialog Banner */}
      {showKeyInput && (
        <div className="card" style={{
          marginBottom: "1rem",
          padding: "1rem 1.25rem",
          background: "#080c14",
          borderColor: "rgba(6, 182, 212, 0.4)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <ShieldCheck size={16} color="var(--accent-cyan)" />
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>
              Optional Google Gemini API Key
            </div>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
            The assistant runs on its built-in engineering engine by default. You can optionally paste a personal Gemini API key to activate live LLM inference. Keys are stored only in your browser's temporary session and are never sent to external servers or committed to git.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="password"
              className="form-input"
              placeholder="AIzaSy..."
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}
            />
            <button onClick={() => handleSaveApiKey(geminiApiKey)} className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Viewport */}
      <div style={{
        background: "rgba(15, 23, 42, 0.75)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-xl)",
        padding: "1.25rem",
        minHeight: "360px",
        height: "clamp(360px, 58dvh, 650px)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        marginBottom: "1.25rem",
        boxShadow: "var(--shadow-md)"
      }}>
        {messages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isAi ? "flex-start" : "flex-end"
              }}
            >
              <div style={{
                display: "flex",
                gap: "0.75rem",
                maxWidth: "85%",
                flexDirection: isAi ? "row" : "row-reverse"
              }}>
                {/* Avatar Icon */}
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: isAi ? "linear-gradient(135deg, #06b6d4, #3b82f6)" : "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                  marginTop: "2px"
                }}>
                  {isAi ? <Bot size={18} /> : <User size={16} />}
                </div>

                {/* Message Bubble */}
                <div style={{
                  background: isAi ? "#0f172a" : "linear-gradient(135deg, #06b6d4, #2563eb)",
                  border: isAi ? "1px solid var(--border-card)" : "none",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.25rem",
                  color: "#fff",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                  position: "relative"
                }}>
                  {/* Markdown formatted text */}
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {msg.text}
                  </div>

                  {/* Copy button */}
                  {isAi && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "4px"
                      }}
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>

              {/* Connected Knowledge Cards */}
              {isAi && msg.related && (
                <div style={{
                  marginTop: "0.75rem",
                  marginLeft: "42px",
                  maxWidth: "85%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}>
                  {msg.related.components?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--accent-cyan)", fontWeight: 700 }}>COMPONENTS:</span>
                      {msg.related.components.map(c => (
                        <Link key={c.id} to={`/components/${c.id}`} className="badge badge-cyan" style={{ fontSize: "0.72rem", textTransform: "none" }}>
                          <Cpu size={12} /> {c.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {msg.related.experiments?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--accent-emerald)", fontWeight: 700 }}>EXPERIMENTS:</span>
                      {msg.related.experiments.map(e => (
                        <Link key={e.id} to={`/experiments/${e.id}`} className="badge badge-emerald" style={{ fontSize: "0.72rem", textTransform: "none" }}>
                          <FlaskConical size={12} /> {e.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {msg.related.projects?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--accent-blue)", fontWeight: 700 }}>PROJECTS:</span>
                      {msg.related.projects.map(p => (
                        <Link key={p.id} to={`/projects/${p.id}`} className="badge badge-blue" style={{ fontSize: "0.72rem", textTransform: "none" }}>
                          <FolderGit2 size={12} /> {p.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff"
            }}>
              <Bot size={18} />
            </div>
            <div style={{ padding: "0.75rem 1rem", background: "#0f172a", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-card)", color: "var(--accent-cyan)", fontSize: "0.85rem" }}>
              NextGen AI is formulating circuit analysis...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
        {promptSuggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSend(sug)}
            className="badge badge-cyan"
            style={{ cursor: "pointer", border: "1px solid var(--border-subtle)", padding: "0.3rem 0.65rem", fontSize: "0.72rem" }}
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Ask about circuits, pinouts, code, troubleshooting... (e.g. 'How do I wire an ESP32 to Firebase?')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{
              paddingRight: "3.5rem",
              paddingTop: "0.9rem",
              paddingBottom: "0.9rem",
              fontSize: "1rem"
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              position: "absolute",
              right: "8px",
              background: "linear-gradient(135deg, #06b6d4, #2563eb)",
              border: "none",
              borderRadius: "var(--radius-md)",
              color: "#fff",
              width: "38px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.15s ease"
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
