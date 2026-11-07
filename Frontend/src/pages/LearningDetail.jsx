// NextGen Education - Detailed Lesson View
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  BookOpen, 
  Zap, 
  AlertTriangle,
  Lightbulb,
  FileCode2
} from "lucide-react";
import { getLearningTopicById } from "../services/firebaseService";
import { useProgress } from "../context/ProgressContext";
import { useToast } from "../context/ToastContext";
import RelatedResources from "../components/common/RelatedResources";

export default function LearningDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isBookmarked, toggleBookmark, markLessonComplete, completedLessons } = useProgress();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadLesson() {
      setLoading(true);
      const data = await getLearningTopicById(id);
      setLesson(data);
      setLoading(false);
    }
    loadLesson();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <p style={{ color: "var(--accent-cyan)" }}>Loading Engineering Curriculum...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Curriculum Module Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>The requested topic could not be located.</p>
        <Link to="/learn" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Learning Hub
        </Link>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);
  const bookmarked = isBookmarked(lesson.id);

  const handleToggleBookmark = () => {
    const state = toggleBookmark({
      id: lesson.id,
      type: "lesson",
      title: lesson.title,
      category: lesson.category,
      link: `/learn/${lesson.id}`
    });
    addToast(state ? "Lesson saved to bookmarks!" : "Removed from bookmarks.", "info");
  };

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id, lesson.title);
    addToast("Lesson marked complete! +100 XP gained.", "success");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Lesson URL copied to clipboard!", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "900px" }}>
      {/* Navigation Breadcrumb */}
      <div className="breadcrumbs">
        <Link to="/learn">Learning Hub</Link>
        <span>/</span>
        <span>{lesson.category}</span>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>{lesson.title}</span>
      </div>

      {/* Header Bar */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span className="badge badge-cyan">{lesson.category}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Clock size={13} /> {lesson.readingTime}
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleToggleBookmark} className={`btn btn-sm ${bookmarked ? 'btn-primary' : 'btn-secondary'}`}>
              <Bookmark size={15} /> {bookmarked ? "Bookmarked" : "Save"}
            </button>
            <button onClick={handleShare} className="btn btn-secondary btn-sm" title="Share URL">
              <Share2 size={15} />
            </button>
          </div>
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", marginBottom: "1rem" }}>
          {lesson.title}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {lesson.summary}
        </p>
      </div>

      {/* Overview Card */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <BookOpen size={18} color="var(--accent-cyan)" /> Conceptual Overview
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--text-main)" }}>
          {lesson.overview}
        </p>
      </div>

      {/* Core Principles */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Lightbulb size={18} color="var(--accent-amber)" /> Fundamental Engineering Principles
        </h3>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {lesson.corePrinciples.map((principle, idx) => (
            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", lineHeight: 1.6 }}>
              <div style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "rgba(6, 182, 212, 0.15)",
                color: "var(--accent-cyan)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                marginTop: "2px",
                flexShrink: 0
              }}>
                {idx + 1}
              </div>
              <span style={{ color: "var(--text-main)" }}>{principle}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Formulas */}
      <div className="card" style={{ marginBottom: "2rem", borderColor: "rgba(59, 130, 246, 0.3)" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Zap size={18} color="var(--accent-blue)" /> Governing Mathematical Formulas
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          {lesson.keyFormulas.map((formula, idx) => (
            <div key={idx} style={{
              background: "#080c14",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem 1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              color: "#38bdf8"
            }}>
              {formula}
            </div>
          ))}
        </div>
      </div>

      {/* Practical Circuit Example */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FileCode2 size={18} color="var(--accent-emerald)" /> Practical Benchtop Circuit Example
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--text-main)" }}>
          {lesson.circuitExample}
        </p>
      </div>

      {/* Common Pitfalls & Mistakes */}
      <div className="card" style={{ marginBottom: "2.5rem", borderColor: "rgba(244, 63, 94, 0.3)", background: "rgba(244, 63, 94, 0.02)" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#fb7185", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AlertTriangle size={18} color="#f43f5e" /> Common Engineering Pitfalls
        </h3>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {lesson.commonPitfalls.map((pitfall, idx) => (
            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#f43f5e", fontWeight: 700 }}>•</span>
              <span>{pitfall}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem",
        background: "rgba(15, 23, 42, 0.8)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-lg)",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <div style={{ fontWeight: 700, color: "var(--text-main)" }}>Mastered this topic?</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Record your progress to earn 100 Knowledge XP</div>
        </div>

        <button 
          onClick={handleMarkComplete} 
          disabled={isCompleted}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
        >
          <CheckCircle2 size={16} /> {isCompleted ? "Lesson Mastered ✓" : "Mark as Mastered"}
        </button>
      </div>

      {/* Interconnected Resources Widget */}
      <RelatedResources currentType="lesson" currentId={lesson.id} related={lesson.related} />
    </div>
  );
}
