// NextGen Education - Practical Video Learning Hub
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Video, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Play, 
  Tv 
} from "lucide-react";
import { videosData } from "../data/videosData";
import { useProgress } from "../context/ProgressContext";

const categories = ["ALL", "ELECTRONICS FUNDAMENTALS", "ANALOG ELECTRONICS", "SEMICONDUCTORS", "ICs & ANALOG", "POWER SUPPLIES", "ROBOTICS & EMBEDDED", "SENSORS & ANALOG", "IoT & WIRELESS"];

export default function VideoHub() {
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [search, setSearch] = useState("");
  const { watchedVideos } = useProgress();

  const filtered = videosData.filter(vid => {
    const matchesCat = selectedCat === "ALL" || vid.category === selectedCat;
    const matchesSearch = 
      vid.title.toLowerCase().includes(search.toLowerCase()) ||
      vid.description.toLowerCase().includes(search.toLowerCase()) ||
      vid.topics.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      vid.channel.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-rose">PRACTICAL VIDEO WORKSHOP</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Video Learning Hub</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          20 curated practical engineering video lectures and lab walkthroughs from trusted educators (Ben Eater, The Engineering Mindset, DroneBot Workshop, GreatScott!, Afrotechmods).
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
            placeholder="Search videos by title, topic, or instructor (e.g. 'Ohm', 'ESP32', 'Transistor', 'Ben Eater')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`btn btn-sm ${selectedCat === cat ? 'btn-primary' : 'btn-secondary'}`}
            >
              {cat === "ALL" ? `All Videos (${videosData.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎥</div>
          <h3>No Videos Found</h3>
          <p>Try searching for a different keyword or reset your category filter.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {filtered.map(video => {
            const isWatched = watchedVideos.includes(video.id);
            return (
              <div 
                key={video.id} 
                className="card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  padding: 0,
                  overflow: "hidden"
                }}
              >
                {/* Thumbnail Container */}
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#0b0f19" }}>
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    loading="lazy"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(10, 14, 23, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s"
                  }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(6, 182, 212, 0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.6)"
                    }}>
                      <Play size={20} fill="#fff" style={{ marginLeft: "3px" }} />
                    </div>
                  </div>

                  <span style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono)"
                  }}>
                    {video.duration}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span className="badge badge-rose" style={{ fontSize: "0.68rem" }}>
                        {video.channel}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {video.difficulty}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem", color: "var(--text-main)", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {video.title}
                    </h3>

                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1rem", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {video.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                    <Link to={`/videos/${video.id}`} className="btn btn-outline btn-sm">
                      Watch Video <ArrowRight size={14} />
                    </Link>

                    {isWatched && (
                      <span style={{ color: "var(--accent-rose)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <CheckCircle2 size={15} /> Watched
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
