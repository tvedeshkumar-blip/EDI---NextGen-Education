// NextGen Education - Student Registration Page
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Cpu, Lock, Mail, User, GraduationCap, Building2, ArrowRight } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    department: "Electronics & Communication Engineering (ECE)",
    year: "3rd Year"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await register(formData.email, formData.password, {
        name: formData.name,
        college: formData.college || "Engineering College",
        department: formData.department,
        year: formData.year
      });
      addToast("Account created successfully! Welcome to NextGen Education.", "success");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.code === "auth/email-already-in-use" 
          ? "This email address is already registered." 
          : err.message || "Failed to register account."
      );
      addToast("Registration failed. Please check form details.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "3rem 1rem", maxWidth: "560px" }}>
      <div className="card" style={{ padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", marginBottom: "0.75rem" }}>
            <div className="brand-logo-icon" style={{ width: "48px", height: "48px" }}>
              <Cpu size={28} />
            </div>
          </div>
          <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Join NextGen Education</h2>
          <p style={{ fontSize: "0.9rem" }}>Create your student profile and start practical engineering labs</p>
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
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={handleChange}
                style={{ paddingLeft: "2.5rem" }}
                required
              />
              <User size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="alex.johnson@college.edu"
                value={formData.email}
                onChange={handleChange}
                style={{ paddingLeft: "2.5rem" }}
                required
              />
              <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          {/* College / Institution */}
          <div className="form-group">
            <label className="form-label">College / University</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name="college"
                className="form-input"
                placeholder="e.g. Institute of Engineering & Technology"
                value={formData.college}
                onChange={handleChange}
                style={{ paddingLeft: "2.5rem" }}
              />
              <Building2 size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          {/* Department & Year (Grid) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select name="department" className="form-select" value={formData.department} onChange={handleChange}>
                <option value="Electronics & Communication Engineering (ECE)">ECE</option>
                <option value="Electrical & Electronics Engineering (EEE)">EEE</option>
                <option value="Instrumentation & Control">Instrumentation</option>
                <option value="Computer Science & Engineering (IoT)">CSE (IoT)</option>
                <option value="Robotics & Automation">Robotics</option>
                <option value="Diploma to Degree Engineering">Diploma to Degree</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Year of Study</label>
              <select name="year" className="form-select" value={formData.year} onChange={handleChange}>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year (Final Year)">4th Year (Final Year)</option>
                <option value="Graduate / Hobbyist">Graduate / Hobbyist</option>
              </select>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Min 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ paddingLeft: "2.5rem" }}
                  required
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm *</label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ paddingLeft: "2.5rem" }}
                  required
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            {loading ? "Registering Account..." : "Create Student Account"} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.88rem" }}>
          Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Sign In here</Link>
        </div>
      </div>
    </div>
  );
}
