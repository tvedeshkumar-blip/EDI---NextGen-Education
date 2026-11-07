// NextGen Education - Structured Learning Curriculum Hub
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Bookmark 
} from "lucide-react";
import { learningTopics, learningCategories } from "../data/learningData";
import { useProgress } from "../context/ProgressContext";

export default function LearningHub() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const { completedLessons } = useProgress();

  const filtered = learningTopics.filter(topic => {
    const matchesCat = selectedCategory === "ALL" || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">ACADEMIC CURRICULUM</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Engineering Learning Hub</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          A rigorous practical curriculum bridging engineering mathematics, semiconductor physics, embedded microcontrollers, and IoT protocols into bite-sized applied modules.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        marginBottom: "2.5rem",
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem"
      }}>
        {/* Search Bar */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search lessons by topic, circuit law, or concept (e.g. 'Ohm', 'Op-Amp', 'FreeRTOS')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", overflowX: "auto" }}>
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`btn btn-sm ${selectedCategory === "ALL" ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Disciplines ({learningTopics.length})
          </button>
          {learningCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lessons */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>No Lessons Found</h3>
          <p>Try clearing your search query or selecting another discipline.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {filtered.map(lesson => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <div 
                key={lesson.id} 
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
                    <span className="badge badge-cyan" style={{ fontSize: "0.68rem" }}>
                      {lesson.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Clock size={12} /> {lesson.readingTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                    {lesson.title}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineClamp: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {lesson.summary}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <Link to={`/learn/${lesson.id}`} className="btn btn-outline btn-sm">
                    Study Lesson <ArrowRight size={14} />
                  </Link>

                  {isCompleted && (
                    <span style={{ color: "var(--accent-emerald)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <CheckCircle2 size={15} /> Completed
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
