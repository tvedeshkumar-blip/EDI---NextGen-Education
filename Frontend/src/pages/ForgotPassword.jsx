// NextGen Education - Password Reset Page
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Cpu, Mail, ArrowLeft, Send } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { resetPassword } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please provide your registered email address.");
      return;
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("A password recovery link has been dispatched to your email address.");
      addToast("Password recovery email sent.", "success");
    } catch (err) {
      console.error("Password reset error:", err);
      setError(err.message || "Failed to send reset link.");
      addToast("Failed to initiate password reset.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "3rem 1rem", maxWidth: "480px" }}>
      <div className="card" style={{ padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", marginBottom: "0.75rem" }}>
            <div className="brand-logo-icon" style={{ width: "48px", height: "48px" }}>
              <Cpu size={28} />
            </div>
          </div>
          <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Password Recovery</h2>
          <p style={{ fontSize: "0.9rem" }}>Enter your student email to receive a secure reset link</p>
        </div>

        {error && (
          <div style={{
            background: "rgba(244, 63, 94, 0.15)",
            border: "1px solid rgba(244, 63, 94, 0.3)",
            borderRadius: "var(--radius-md)",
            padding: "0.75rem 1rem",
            color: "#fb7185",
            fontSize: "0.88rem",
            marginBottom: "1.5rem"
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "var(--radius-md)",
            padding: "0.75rem 1rem",
            color: "#34d399",
            fontSize: "0.88rem",
            marginBottom: "1.5rem"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Registered Email</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                className="form-input"
                placeholder="student@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "2.5rem" }}
                required
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            {loading ? "Dispatching..." : "Send Reset Email"} <Send size={16} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
          <Link to="/login" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.88rem" }}>
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
