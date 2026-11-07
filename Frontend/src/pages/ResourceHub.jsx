// NextGen Education - Engineering Resource Library
import React, { useState } from "react";
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Tag 
} from "lucide-react";
import { resourcesData } from "../data/resourcesData";
import { useToast } from "../context/ToastContext";

export default function ResourceHub() {
  const [search, setSearch] = useState("");
  const { addToast } = useToast();

  const filtered = resourcesData.filter(res =>
    res.title.toLowerCase().includes(search.toLowerCase()) ||
    res.description.toLowerCase().includes(search.toLowerCase()) ||
    res.category.toLowerCase().includes(search.toLowerCase()) ||
    res.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDownload = (res) => {
    addToast(`Preparing "${res.title}" for download...`, "info");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-cyan">ENGINEERING REPOSITORY</span>
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Resource & Reference Hub</h1>
        <p style={{ maxWidth: "720px", color: "var(--text-secondary)" }}>
          Official manufacturer datasheet archives, high-resolution microcontroller pinout posters, laboratory manuals, oscilloscope guides, and IPC soldering standards.
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
            placeholder="Search resources by keyword, component or manual (e.g. 'Pinout', 'Oscilloscope', 'Soldering', 'KiCad')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "2.5rem" }}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid-cols-2">
        {filtered.map(res => (
          <div key={res.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span className="badge badge-cyan" style={{ fontSize: "0.7rem" }}>
                  {res.category}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {res.size} • {res.format}
                </span>
              </div>

              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                {res.title}
              </h3>

              <div style={{ fontSize: "0.78rem", color: "var(--accent-cyan)", marginBottom: "0.75rem" }}>
                Publisher: {res.author}
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineHeight: 1.6 }}>
                {res.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                {res.tags.map(t => (
                  <span key={t} style={{ fontSize: "0.72rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.03)", padding: "2px 6px", borderRadius: "4px" }}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
              <button onClick={() => handleDownload(res)} className="btn btn-primary btn-sm">
                <Download size={14} /> Download Reference
              </button>

              {res.externalUrl && (
                <a href={res.externalUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <ExternalLink size={14} /> Official Site
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
