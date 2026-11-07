// NextGen Education - Student & Faculty Login Page
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Cpu, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, loginAsDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      addToast("Welcome back! Signed in successfully.", "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.code === "auth/invalid-credential" 
          ? "Invalid email or password combination." 
          : err.message || "Failed to log in."
      );
      addToast("Authentication failed. Please check credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudent = async () => {
    try {
      await loginAsDemo("student");
      addToast("Signed in as Demo Student (Alex Johnson).", "success");
      navigate("/dashboard");
    } catch {
      addToast("Demo session initialized.", "info");
      navigate("/dashboard");
    }
  };

  const handleDemoAdmin = async () => {
    try {
      await loginAsDemo("admin");
      addToast("Signed in as Demo Administrator.", "success");
      navigate("/admin");
    } catch {
      navigate("/admin");
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
          <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ fontSize: "0.9rem" }}>Sign in to continue your practical engineering journey</p>
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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
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

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label">Password</label>
              <Link to="/forgot-password" style={{ fontSize: "0.8rem" }}>Forgot?</Link>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "2.5rem" }}
                required
              />
              <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            {loading ? "Authenticating..." : "Sign In to Account"} <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick Demo Access for Viva Demonstrations */}
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", textAlign: "center" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
            One-Click Viva & Examiner Access
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <button 
              type="button" 
              onClick={handleDemoStudent} 
              className="btn btn-secondary btn-sm"
              style={{ fontSize: "0.8rem" }}
            >
              <UserCheck size={14} /> Demo Student
            </button>
            <button 
              type="button" 
              onClick={handleDemoAdmin} 
              className="btn btn-secondary btn-sm"
              style={{ fontSize: "0.8rem", color: "var(--accent-rose)" }}
            >
              <ShieldCheck size={14} /> Demo Admin
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.88rem" }}>
          Don't have an account? <Link to="/register" style={{ fontWeight: 600 }}>Create Student Account</Link>
        </div>
      </div>
    </div>
  );
}
