// NextGen Education - About Platform & EDI Architecture
import React from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  ShieldCheck, 
  Award, 
  Layers, 
  Sparkles, 
  Compass, 
  Terminal, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function About() {
  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "980px" }}>
      {/* Header Banner */}
      <div className="card" style={{ marginBottom: "2.5rem", textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ display: "inline-flex", marginBottom: "1rem" }}>
          <div className="brand-logo-icon" style={{ width: "54px", height: "54px" }}>
            <Cpu size={32} />
          </div>
        </div>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "0.5rem" }}>
          NEXTGEN EDUCATION
        </h1>
        <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--accent-cyan)", marginBottom: "1.25rem" }}>
          "Learn. Experiment. Build. Innovate."
        </p>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          A Comprehensive Practical Engineering Learning Platform dedicated to bridging the critical chasm between academic engineering theory and real-world physical electronics implementation.
        </p>
      </div>

      {/* Engineering Heritage Notice (MineGuard Mindset) */}
      <div className="card" style={{ marginBottom: "2rem", borderColor: "rgba(6, 182, 212, 0.3)", background: "rgba(6, 182, 212, 0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <Compass size={20} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: "1.25rem", color: "var(--text-main)" }}>Engineering Philosophy & Mindset</h3>
        </div>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
          NextGen Education adopts the rigorous engineering architecture and real-world problem-solving rigor established during our previous robotics and rover projects (MineGuard AI-Rover / SIH). Rather than building a generic content management system or textbook mockup, NextGen Education is engineered as a unified, production-ready practical platform:
        </p>
        <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem", marginTop: "1rem" }}>
          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <CheckCircle2 size={16} color="var(--accent-cyan)" /> Modular React 19 & Component Architecture
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <CheckCircle2 size={16} color="var(--accent-cyan)" /> Google Firebase Cloud Security & Role Isolation
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <CheckCircle2 size={16} color="var(--accent-cyan)" /> Hardware Pinouts & Real Electrical Limits
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <CheckCircle2 size={16} color="var(--accent-cyan)" /> 10-Step Connected Learning Pipeline
          </li>
        </ul>
      </div>

      {/* Target Audience */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Target Beneficiaries</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {[
            { title: "ECE & EEE Undergraduates", desc: "Connecting textbook semiconductor and circuit formulas to actual benchtop components." },
            { title: "Diploma-to-Degree Learners", desc: "Accelerating theoretical mastery with hands-on labs and visual schematics." },
            { title: "Embedded & IoT Engineers", desc: "Mastering ESP32 Wi-Fi telemetry, RTOS, sensor buses (I2C/SPI), and cloud databases." },
            { title: "Capstone Project Teams", desc: "Accessing tested bills of materials, schematics, and debugged C/C++ firmware." }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
              <h4 style={{ fontSize: "1rem", color: "var(--text-main)", marginBottom: "0.3rem" }}>{item.title}</h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Stack Specifications */}
      <div className="card" style={{ marginBottom: "2.5rem" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Terminal size={18} color="var(--accent-emerald)" /> Technology Stack & Specifications
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Frontend Framework</div>
            <div style={{ fontWeight: 700, color: "var(--text-main)", marginTop: "0.2rem" }}>React 19 & Vite 8</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Modular Single-Page Application</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Cloud & Authentication</div>
            <div style={{ fontWeight: 700, color: "var(--text-main)", marginTop: "0.2rem" }}>Google Firebase 12</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Cloud Firestore & Auth Rules</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Styling System</div>
            <div style={{ fontWeight: 700, color: "var(--text-main)", marginTop: "0.2rem" }}>Modern Vanilla CSS</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Design Tokens & Circuit Glassmorphism</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>AI Assistant Architecture</div>
            <div style={{ fontWeight: 700, color: "var(--text-main)", marginTop: "0.2rem" }}>Knowledge Engine + Gemini</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Cross-resource automatic linking</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/learn" className="btn btn-primary btn-lg">
          Start Exploring Curriculum <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
