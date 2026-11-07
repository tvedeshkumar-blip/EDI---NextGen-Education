// NextGen Education - My Saved Content (Bookmarks)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Cpu, 
  FlaskConical, 
  FolderGit2, 
  Video, 
  BookOpen, 
  FileText 
} from "lucide-react";

export default function SavedContent() {
  const { bookmarks, toggleBookmark } = useProgress();
  const [filterType, setFilterType] = useState("all");

  const filtered = filterType === "all"
    ? bookmarks
    : bookmarks.filter(b => b.type === filterType);

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Bookmark size={24} color="var(--accent-cyan)" />
            <h2>My Saved Content</h2>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Quick access to your pinned components, experiments, capstone projects, and study guides.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {["all", "component", "experiment", "project", "video", "lesson"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`btn btn-sm ${filterType === type ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: "capitalize" }}
            >
              {type === "all" ? `All (${bookmarks.length})` : type}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📌</div>
          <h3 style={{ marginBottom: "0.5rem" }}>No Saved Resources Found</h3>
          <p style={{ maxWidth: "450px", margin: "0 auto 1.5rem auto" }}>
            Browse through the Component Hub, Experiment Lab, or Project Lab and click the bookmark button to save items here for quick reference.
          </p>
          <Link to="/components" className="btn btn-primary">
            Explore Component Hub <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-cyan" style={{ fontSize: "0.7rem" }}>
                    {item.type.toUpperCase()}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {item.category}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                  {item.title}
                </h3>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                <Link to={item.link || `/components/${item.id}`} className="btn btn-outline btn-sm">
                  Open Details <ArrowRight size={14} />
                </Link>

                <button 
                  onClick={() => toggleBookmark(item)}
                  className="btn btn-secondary btn-sm"
                  style={{ color: "var(--accent-rose)", padding: "0.4rem" }}
                  title="Remove from bookmarks"
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
