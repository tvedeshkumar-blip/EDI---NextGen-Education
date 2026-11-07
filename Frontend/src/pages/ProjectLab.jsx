// NextGen Education - Capstone Project Lab
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FolderGit2, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Coins, 
  Layers 
} from "lucide-react";
import { projectsData } from "../data/projectsData";
import { useProgress } from "../context/ProgressContext";

const difficulties = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

export default function ProjectLab() {
  const [selectedDiff, setSelectedDiff] = useState("ALL");
  const [search, setSearch] = useState("");
  const { completedProjects } = useProgress();

  const filtered = projectsData.filter(proj => {
    const matchesDiff = selectedDiff === "ALL" || proj.difficulty === selectedDiff;
    const matchesSearch = 
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.description.toLowerCase().includes(search.toLowerCase()) ||
      proj.category.toLowerCase().includes(search.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-purple">CAPSTONE & MINI PROJECTS</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Project Design Lab</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          12 comprehensive engineering capstone projects with full schematics, block diagrams, tested source code, bill-of-materials cost estimates, and real-world industrial relevance.
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
            placeholder="Search projects by title, application, or system type (e.g. 'Street Light', 'Robot', 'Weather', 'Energy')..."
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
              {diff === "ALL" ? `All Projects (${projectsData.length})` : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🚀</div>
          <h3>No Projects Matched</h3>
          <p>Try refining your search keyword or switching difficulty filters.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {filtered.map(proj => {
            const isCompleted = completedProjects.includes(proj.id);
            return (
              <div 
                key={proj.id} 
                className="card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  borderColor: isCompleted ? "rgba(59, 130, 246, 0.4)" : "var(--border-card)"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span className="badge badge-purple" style={{ fontSize: "0.68rem" }}>
                      {proj.difficulty}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Clock size={12} /> {proj.estimatedTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.4rem", color: "var(--text-main)" }}>
                    {proj.title}
                  </h3>

                  <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", marginBottom: "0.75rem", fontWeight: 600 }}>
                    {proj.category}
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineClamp: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {proj.description}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <Link to={`/projects/${proj.id}`} className="btn btn-outline btn-sm">
                    Open Blueprint <ArrowRight size={14} />
                  </Link>

                  {isCompleted && (
                    <span style={{ color: "var(--accent-blue)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <CheckCircle2 size={15} /> Built
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
