// NextGen Education - Assessment Quiz Engine
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HelpCircle, 
  Search, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Clock, 
  BarChart3 
} from "lucide-react";
import { quizzesData } from "../data/quizzesData";
import { useProgress } from "../context/ProgressContext";

export default function QuizSystem() {
  const [search, setSearch] = useState("");
  const { quizResults } = useProgress();

  const filtered = quizzesData.filter(q => 
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.description.toLowerCase().includes(search.toLowerCase()) ||
    q.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-purple">ENGINEERING ASSESSMENT</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Practical Quiz System</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          10 rigorous diagnostic quizzes covering Ohm's law, diode rectification, transistor switching, op-amp filters, microcontroller timers, IoT telemetry, and benchtop oscilloscope debugging.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        marginBottom: "2.5rem"
      }}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search quizzes by title or concept (e.g. 'Ohm', 'Semiconductor', 'Troubleshoot', 'IoT')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid-cols-2">
        {filtered.map(quiz => {
          const attempt = quizResults.find(r => r.quizId === quiz.id);
          return (
            <div 
              key={quiz.id} 
              className="card" 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                borderColor: attempt ? "rgba(139, 92, 246, 0.4)" : "var(--border-card)"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-purple" style={{ fontSize: "0.68rem" }}>
                    {quiz.category}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Clock size={12} /> {quiz.timeLimitMin} Mins • 5 Questions
                  </span>
                </div>

                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                  {quiz.title}
                </h3>

                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                  {quiz.description}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                <Link to={`/quizzes/${quiz.id}`} className="btn btn-outline btn-sm">
                  {attempt ? "Retake Quiz" : "Start Quiz"} <ArrowRight size={14} />
                </Link>

                {attempt && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Last Score:</span>
                    <span className={`badge ${attempt.percentage >= 80 ? 'badge-emerald' : attempt.percentage >= 60 ? 'badge-amber' : 'badge-rose'}`}>
                      {attempt.percentage}% ({attempt.score}/{attempt.total})
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
