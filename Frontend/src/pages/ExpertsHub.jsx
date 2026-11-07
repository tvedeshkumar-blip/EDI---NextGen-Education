// NextGen Education - Faculty Mentors & Industry Experts Hub
import React from "react";
import { 
  Users, 
  Calendar, 
  Mail, 
  Award, 
  Building2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { expertsData } from "../data/expertsData";
import { useToast } from "../context/ToastContext";

export default function ExpertsHub() {
  const { addToast } = useToast();

  const handleRequestMentorship = (expert) => {
    addToast(`Demo Request dispatched to ${expert.name}. (Mentorship booking simulation)`, "info");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Notice Banner (Mandatory EDI Demo Notification) */}
      <div style={{
        background: "rgba(245, 158, 11, 0.1)",
        border: "1px solid rgba(245, 158, 11, 0.3)",
        borderRadius: "var(--radius-lg)",
        padding: "1rem 1.25rem",
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
      }}>
        <AlertCircle size={20} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>
          <strong>Demonstration Mode:</strong> All faculty mentor and engineering advisor profiles below are simulated educational demo personas designed for platform evaluation.
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">ADVISORY NETWORK</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Engineering Mentors & Advisors</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          Connect with experienced researchers and industry engineers specializing in embedded firmware, analog IC design, autonomous robotics, and IoT cloud architectures.
        </p>
      </div>

      {/* Experts Grid */}
      <div className="grid-cols-2">
        {expertsData.map(expert => (
          <div key={expert.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  loading="lazy"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--accent-cyan)"
                  }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.2rem", color: "var(--text-main)" }}>{expert.name}</h3>
                    <span className="badge badge-amber" style={{ fontSize: "0.6rem" }}>Demo</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--accent-cyan)", fontWeight: 600 }}>{expert.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{expert.organization} • {expert.experienceYears} Years Exp</div>
                </div>
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
                {expert.bio}
              </p>

              {/* Expertise Tags */}
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Areas of Expertise:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {expert.expertise.map(area => (
                    <span key={area} className="badge badge-cyan" style={{ fontSize: "0.7rem", textTransform: "none" }}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentorship Topics */}
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "var(--radius-md)", marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 700, marginBottom: "0.3rem" }}>POPULAR ADVISORY TOPICS:</div>
                <ul style={{ listStyle: "none", fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {expert.topics.map((topic, i) => (
                    <li key={i}>• {topic}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {expert.availability}
              </span>

              <button onClick={() => handleRequestMentorship(expert)} className="btn btn-primary btn-sm">
                <Calendar size={14} /> Book Advisory Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
