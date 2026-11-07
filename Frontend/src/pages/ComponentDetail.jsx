// NextGen Education - Detailed Electronic Component Blueprint
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Zap, 
  Sliders, 
  Layers, 
  FileText,
  FlaskConical,
  FolderGit2
} from "lucide-react";
import { getComponentById } from "../services/firebaseService";
import { useProgress } from "../context/ProgressContext";
import { useToast } from "../context/ToastContext";
import RelatedResources from "../components/common/RelatedResources";

export default function ComponentDetail() {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isBookmarked, toggleBookmark } = useProgress();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadComponent() {
      setLoading(true);
      const data = await getComponentById(id);
      setComponent(data);
      setLoading(false);
    }
    loadComponent();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <p style={{ color: "var(--accent-cyan)" }}>Loading Component Blueprint...</p>
      </div>
    );
  }

  if (!component) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Component Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>The requested component could not be located in the database.</p>
        <Link to="/components" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Component Hub
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(component.id);

  const handleToggleBookmark = () => {
    const state = toggleBookmark({
      id: component.id,
      type: "component",
      title: component.name,
      category: component.category,
      link: `/components/${component.id}`
    });
    addToast(state ? "Component saved to bookmarks!" : "Removed from bookmarks.", "info");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Component URL copied to clipboard!", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "1000px" }}>
      {/* Breadcrumb */}
      <div className="breadcrumbs">
        <Link to="/components">Component Hub</Link>
        <span>/</span>
        <span>{component.category}</span>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>{component.name}</span>
      </div>

      {/* Top Header Card */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
              <span className="badge badge-cyan">{component.category}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {component.partNumber}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>{component.name}</h1>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleToggleBookmark} className={`btn btn-sm ${bookmarked ? 'btn-primary' : 'btn-secondary'}`}>
              <Bookmark size={15} /> {bookmarked ? "Bookmarked" : "Save Component"}
            </button>
            <button onClick={handleShare} className="btn btn-secondary btn-sm" title="Share URL">
              <Share2 size={15} />
            </button>
          </div>
        </div>

        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          {component.shortDesc}
        </p>

        {/* Action Shortcuts */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {component.related?.experiments?.[0] && (
            <Link to={`/experiments/${component.related.experiments[0]}`} className="btn btn-primary btn-sm">
              <FlaskConical size={15} /> Start Related Experiment
            </Link>
          )}
          {component.related?.projects?.[0] && (
            <Link to={`/projects/${component.related.projects[0]}`} className="btn btn-secondary btn-sm">
              <FolderGit2 size={15} /> View Related Project
            </Link>
          )}
          {component.datasheetUrl && (
            <a href={component.datasheetUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              <ExternalLink size={15} /> Manufacturer Datasheet
            </a>
          )}
        </div>
      </div>

      {/* Purpose & Working Principle */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Zap size={18} color="var(--accent-amber)" /> Primary Circuit Purpose
          </h3>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)" }}>
            {component.purpose}
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Sliders size={18} color="var(--accent-cyan)" /> Working Principle
          </h3>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)" }}>
            {component.workingPrinciple}
          </p>
        </div>
      </div>

      {/* Pinout Table */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Layers size={18} color="var(--accent-cyan)" /> Hardware Pinout Architecture
        </h3>

        <div className="table-responsive">
          <table style={{ width: "100%", minWidth: "520px", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-card)", color: "var(--accent-cyan)" }}>
                <th style={{ padding: "0.75rem" }}>Pin / Terminal</th>
                <th style={{ padding: "0.75rem" }}>Designation</th>
                <th style={{ padding: "0.75rem" }}>Functional Description</th>
              </tr>
            </thead>
            <tbody>
              {component.pinout.map((pin, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--text-main)" }}>
                    {pin.pin}
                  </td>
                  <td style={{ padding: "0.75rem", color: "var(--accent-cyan)" }}>
                    {pin.name}
                  </td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>
                    {pin.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Specifications & Electrical Characteristics */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FileText size={18} color="var(--accent-blue)" /> Technical Specifications
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {Object.entries(component.specifications || {}).map(([key, val]) => (
            <div key={key} style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{key}</div>
              <div style={{ fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem", fontFamily: "var(--font-mono)" }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(6, 182, 212, 0.05)", border: "1px solid rgba(6, 182, 212, 0.2)" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "0.3rem" }}>ELECTRICAL BEHAVIOR & V-I CHARACTERISTICS</div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
            {component.electricalCharacteristics}
          </p>
        </div>
      </div>

      {/* How to Use & Example Circuit */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--accent-emerald)" }}>
            How to Use & Best Practices
          </h3>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)" }}>
            {component.howToUse}
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--accent-blue)" }}>
            Example Application Circuit
          </h3>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)" }}>
            {component.exampleCircuit}
          </p>
        </div>
      </div>

      {/* Common Mistakes & Safety */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div className="card" style={{ borderColor: "rgba(244, 63, 94, 0.3)", background: "rgba(244, 63, 94, 0.02)" }}>
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", color: "#fb7185", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <AlertTriangle size={18} color="#f43f5e" /> Common Wiring Mistakes
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            {component.commonMistakes?.map((m, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                <span style={{ color: "#f43f5e", fontWeight: 700 }}>✕</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ borderColor: "rgba(245, 158, 11, 0.3)", background: "rgba(245, 158, 11, 0.02)" }}>
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", color: "#fbbf24", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ShieldAlert size={18} color="#f59e0b" /> Laboratory Safety Precaution
          </h3>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)" }}>
            {component.safety}
          </p>
        </div>
      </div>

      {/* Connected Related Resources */}
      <RelatedResources currentType="component" currentId={component.id} related={component.related} />
    </div>
  );
}
