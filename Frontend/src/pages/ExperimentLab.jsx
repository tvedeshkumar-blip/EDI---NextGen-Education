// NextGen Education - Practical Experiment Lab
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FlaskConical, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers 
} from "lucide-react";
import { experimentsData } from "../data/experimentsData";
import { useProgress } from "../context/ProgressContext";

const difficulties = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

export default function ExperimentLab() {
  const [selectedDiff, setSelectedDiff] = useState("ALL");
  const [search, setSearch] = useState("");
  const { completedExperiments } = useProgress();

  const filtered = experimentsData.filter(exp => {
    const matchesDiff = selectedDiff === "ALL" || exp.difficulty === selectedDiff;
    const matchesSearch = 
      exp.title.toLowerCase().includes(search.toLowerCase()) ||
      exp.objective.toLowerCase().includes(search.toLowerCase()) ||
      exp.category.toLowerCase().includes(search.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-emerald">BENCHTOP PRACTICAL LAB</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Experiment Laboratory</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          15 verified benchtop experiments covering semiconductor biasing, sensor acquisition, motor actuation, and cloud telemetry with complete step-by-step procedures, wiring guides, and troubleshooting.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        marginBottom: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem"
      }}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search experiments by title, transducer, or circuit type (e.g. 'Ohm', 'PWM', 'Ultrasonic', 'Servo')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        {/* Difficulty Filter */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDiff(diff)}
              className={`btn btn-sm ${selectedDiff === diff ? 'btn-primary' : 'btn-secondary'}`}
            >
              {diff === "ALL" ? `All Experiments (${experimentsData.length})` : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Experiments Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🧪</div>
          <h3>No Experiments Found</h3>
          <p>Try searching for a different keyword or resetting your difficulty filter.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {filtered.map(exp => {
            const isCompleted = completedExperiments.includes(exp.id);
            return (
              <div 
                key={exp.id} 
                className="card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  borderColor: isCompleted ? "rgba(16, 185, 129, 0.4)" : "var(--border-card)"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span className={`badge ${exp.difficulty === 'BEGINNER' ? 'badge-cyan' : exp.difficulty === 'INTERMEDIATE' ? 'badge-emerald' : 'badge-purple'}`} style={{ fontSize: "0.68rem" }}>
                      {exp.difficulty}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Clock size={12} /> {exp.estimatedTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                    {exp.title}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineClamp: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {exp.objective}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <Link to={`/experiments/${exp.id}`} className="btn btn-outline btn-sm">
                    Open Lab Bench <ArrowRight size={14} />
                  </Link>

                  {isCompleted && (
                    <span style={{ color: "var(--accent-emerald)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <CheckCircle2 size={15} /> Verified
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
