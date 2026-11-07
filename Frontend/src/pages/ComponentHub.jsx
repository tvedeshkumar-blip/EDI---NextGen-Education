// NextGen Education - Electronics Component Hub
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  Search, 
  ArrowRight, 
  Layers, 
  Bookmark, 
  SlidersHorizontal 
} from "lucide-react";
import { componentsData } from "../data/componentsData";
import { useProgress } from "../context/ProgressContext";

const categories = ["ALL", "PASSIVE", "SEMICONDUCTORS", "ICs", "SENSORS", "BOARDS", "MODULES"];

export default function ComponentHub() {
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [search, setSearch] = useState("");
  const { isBookmarked } = useProgress();

  const filtered = componentsData.filter(comp => {
    const matchesCat = selectedCat === "ALL" || comp.category === selectedCat;
    const matchesSearch = 
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.partNumber.toLowerCase().includes(search.toLowerCase()) ||
      comp.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      comp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">PRACTICAL HARDWARE DATABASE</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Electronics Component Hub</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          Comprehensive pinouts, electrical ratings, operating principles, common wiring mistakes, and practical application circuits for 24 fundamental engineering components.
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
            placeholder="Search by component name, part number, or keyword (e.g. 'BC547', 'ESP32', 'Ultrasonic', 'Timer')..."
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
              {cat === "ALL" ? `All (${componentsData.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Component Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚡</div>
          <h3>No Components Matched</h3>
          <p>Try refining your search keyword or switching category tabs.</p>
        </div>
      ) : (
        <div className="grid-cols-3">
          {filtered.map(comp => {
            const bookmarked = isBookmarked(comp.id);
            return (
              <div 
                key={comp.id} 
                className="card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between" 
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span className="badge badge-cyan" style={{ fontSize: "0.68rem" }}>
                      {comp.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {comp.partNumber.split(" ")[0]}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.4rem", color: "var(--text-main)" }}>
                    {comp.name}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.25rem", lineClamp: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {comp.shortDesc}
                  </p>
                </div>

                <div>
                  {/* Quick specs pill */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                    {comp.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{ fontSize: "0.7rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.04)", padding: "2px 6px", borderRadius: "4px" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                    <Link to={`/components/${comp.id}`} className="btn btn-outline btn-sm">
                      Inspect Pinout & Circuit <ArrowRight size={14} />
                    </Link>

                    {bookmarked && (
                      <span title="Bookmarked" style={{ color: "var(--accent-cyan)" }}>
                        <Bookmark size={16} fill="var(--accent-cyan)" />
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
