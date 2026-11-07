// NextGen Education - Global Cross-Platform Search Modal
// Searches across Lessons, Components, Experiments, Projects, Videos, Resources, Quizzes, and Experts.

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  X, 
  Cpu, 
  FlaskConical, 
  FolderGit2, 
  Video, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  Users,
  ArrowRight
} from "lucide-react";

import { componentsData } from "../../data/componentsData";
import { experimentsData } from "../../data/experimentsData";
import { projectsData } from "../../data/projectsData";
import { videosData } from "../../data/videosData";
import { quizzesData } from "../../data/quizzesData";
import { learningTopics } from "../../data/learningData";
import { resourcesData } from "../../data/resourcesData";
import { expertsData } from "../../data/expertsData";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Perform search across all entities
  const results = {
    components: q ? componentsData.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.id.toLowerCase().includes(q) ||
      c.partNumber.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    ) : [],
    experiments: q ? experimentsData.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.objective.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    ) : [],
    projects: q ? projectsData.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ) : [],
    videos: q ? videosData.filter(v => 
      v.title.toLowerCase().includes(q) || 
      v.description.toLowerCase().includes(q) ||
      v.topics.some(t => t.toLowerCase().includes(q))
    ) : [],
    quizzes: q ? quizzesData.filter(qz => 
      qz.title.toLowerCase().includes(q) || 
      qz.category.toLowerCase().includes(q)
    ) : [],
    lessons: q ? learningTopics.filter(l => 
      l.title.toLowerCase().includes(q) || 
      l.summary.toLowerCase().includes(q) ||
      l.category.toLowerCase().includes(q)
    ) : [],
    resources: q ? resourcesData.filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.description.toLowerCase().includes(q)
    ) : [],
    experts: q ? expertsData.filter(ex => 
      ex.name.toLowerCase().includes(q) || 
      ex.expertise.some(ep => ep.toLowerCase().includes(q))
    ) : []
  };

  const totalResults = 
    results.components.length + 
    results.experiments.length + 
    results.projects.length + 
    results.videos.length + 
    results.quizzes.length + 
    results.lessons.length + 
    results.resources.length +
    results.experts.length;

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: "720px", padding: "1.5rem" }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          borderBottom: "1px solid var(--border-card)",
          paddingBottom: "1rem",
          marginBottom: "1.25rem"
        }}>
          <Search size={22} color="var(--accent-cyan)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search components, experiments, projects, videos, quizzes... (e.g., 'ESP32', 'Ohm', 'Relay')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-main)",
              fontSize: "1.1rem",
              fontFamily: "var(--font-sans)"
            }}
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          )}
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px" }}>
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "0.5rem" }}>
          {!q && (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>Popular Engineering Searches:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                {["ESP32", "HC-SR04 Ultrasonic", "Ohm's Law", "BC547 Transistor", "L293D Motor Driver", "LDR Sensor", "555 Timer", "Relay"].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="badge badge-cyan"
                    style={{ cursor: "pointer", border: "1px solid var(--border-card)" }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && totalResults === 0 && (
            <div style={{ padding: "3rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>No results found for "{query}"</p>
              <p style={{ fontSize: "0.88rem" }}>Try searching for a component name (e.g. "DHT11"), experiment ("Blink"), or technology ("PWM").</p>
            </div>
          )}

          {/* Components Matches */}
          {results.components.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Cpu size={14} /> Components ({results.components.length})
              </div>
              {results.components.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleSelect(`/components/${item.id}`)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.02)",
                    marginBottom: "0.35rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{item.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.partNumber} • {item.category}</div>
                  </div>
                  <ArrowRight size={16} color="var(--accent-cyan)" />
                </div>
              ))}
            </div>
          )}

          {/* Experiments Matches */}
          {results.experiments.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-emerald)", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FlaskConical size={14} /> Laboratory Experiments ({results.experiments.length})
              </div>
              {results.experiments.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleSelect(`/experiments/${item.id}`)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.02)",
                    marginBottom: "0.35rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{item.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.difficulty} • {item.category}</div>
                  </div>
                  <ArrowRight size={16} color="var(--accent-emerald)" />
                </div>
              ))}
            </div>
          )}

          {/* Projects Matches */}
          {results.projects.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-blue)", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FolderGit2 size={14} /> Projects ({results.projects.length})
              </div>
              {results.projects.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleSelect(`/projects/${item.id}`)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.02)",
                    marginBottom: "0.35rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{item.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.difficulty} • {item.estimatedTime}</div>
                  </div>
                  <ArrowRight size={16} color="var(--accent-blue)" />
                </div>
              ))}
            </div>
          )}

          {/* Videos Matches */}
          {results.videos.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-rose)", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Video size={14} /> Practical Videos ({results.videos.length})
              </div>
              {results.videos.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleSelect(`/videos/${item.id}`)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.02)",
                    marginBottom: "0.35rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(244, 63, 94, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{item.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.channel} • {item.duration}</div>
                  </div>
                  <ArrowRight size={16} color="var(--accent-rose)" />
                </div>
              ))}
            </div>
          )}

          {/* Quizzes Matches */}
          {results.quizzes.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-purple)", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <HelpCircle size={14} /> Quizzes ({results.quizzes.length})
              </div>
              {results.quizzes.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleSelect(`/quizzes/${item.id}`)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.02)",
                    marginBottom: "0.35rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-main)" }}>{item.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.difficulty} • 5 Practical Questions</div>
                  </div>
                  <ArrowRight size={16} color="var(--accent-purple)" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
