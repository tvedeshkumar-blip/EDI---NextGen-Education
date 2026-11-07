// NextGen Education - Global Engineering Footer
import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      background: "#080c14",
      borderTop: "1px solid var(--border-card)",
      padding: "4.5rem 0 2.5rem 0",
      color: "var(--text-secondary)",
      fontSize: "0.9rem"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3.5rem"
        }}>
          {/* Brand & Mission */}
          <div style={{ gridColumn: "span 2" }}>
            <Link to="/" className="brand-logo" style={{ marginBottom: "1rem" }}>
              <div className="brand-logo-icon">
                <Cpu size={22} />
              </div>
              <div>
                <div style={{ lineHeight: 1.1 }}>NEXTGEN <span style={{ color: "var(--accent-cyan)" }}>EDUCATION</span></div>
                <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: 600 }}>
                  LEARN • EXPERIMENT • BUILD • INNOVATE
                </div>
              </div>
            </Link>
            <p style={{ marginTop: "1rem", maxWidth: "420px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              A unified practical engineering learning platform designed to bridge the critical gap between theoretical ECE concepts and hands-on laboratory implementation, component diagnostics, IoT telemetry, and AI-assisted innovation.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <span className="badge badge-cyan">
                <ShieldCheck size={14} /> Practical Engineering Capstone
              </span>
              <span className="badge badge-emerald">
                <Award size={14} /> Engineering Standards Compliant
              </span>
            </div>
          </div>

          {/* Practical Modules */}
          <div>
            <h4 style={{ color: "var(--text-main)", marginBottom: "1.2rem", fontSize: "0.98rem", letterSpacing: "0.02em" }}>PRACTICAL LABS</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li><Link to="/components">Electronic Component Hub</Link></li>
              <li><Link to="/experiments">Experiment Laboratory</Link></li>
              <li><Link to="/projects">Project Design Lab</Link></li>
              <li><Link to="/videos">Practical Video Hub</Link></li>
              <li><Link to="/quizzes">Assessment Quiz Engine</Link></li>
              <li><Link to="/tools">Engineering Calculators</Link></li>
            </ul>
          </div>

          {/* Academic Curriculum */}
          <div>
            <h4 style={{ color: "var(--text-main)", marginBottom: "1.2rem", fontSize: "0.98rem", letterSpacing: "0.02em" }}>LEARNING PATHS</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li><Link to="/learn">Fundamentals & Circuit Laws</Link></li>
              <li><Link to="/learn">Analog & Semiconductor Physics</Link></li>
              <li><Link to="/learn">Microcontrollers & ESP32</Link></li>
              <li><Link to="/learn">IoT Telemetry & Cloud</Link></li>
              <li><Link to="/resources">Datasheets & Pinout Posters</Link></li>
              <li><Link to="/experts">Faculty Mentors</Link></li>
            </ul>
          </div>

          {/* Student Hub & Platform */}
          <div>
            <h4 style={{ color: "var(--text-main)", marginBottom: "1.2rem", fontSize: "0.98rem", letterSpacing: "0.02em" }}>STUDENT PLATFORM</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li><Link to="/dashboard">Student Dashboard</Link></li>
              <li><Link to="/saved">My Bookmarked Resources</Link></li>
              <li><Link to="/ai-assistant">NextGen AI Assistant</Link></li>
              <li><Link to="/about">Platform Overview & Architecture</Link></li>
              <li><Link to="/contact">Engineering Support & Viva</Link></li>
              <li><Link to="/admin">Admin Management</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: "0.82rem",
          color: "var(--text-muted)"
        }}>
          <div>
            © {new Date().getFullYear()} NextGen Education. Practical Engineering Learning Platform. Built with React, Vite & Firebase.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Designed for ECE & Engineering Students</span>
            <Link to="/about">System Architecture</Link>
            <Link to="/contact">Report Bug</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
