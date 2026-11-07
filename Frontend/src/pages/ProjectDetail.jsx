// NextGen Education - Detailed Capstone Project Blueprint
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  FolderGit2, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Coins, 
  Copy, 
  Check, 
  AlertTriangle, 
  ShieldAlert, 
  Layers, 
  Cpu, 
  FileCode2, 
  Compass, 
  CheckSquare,
  Sparkles
} from "lucide-react";
import { getProjectById } from "../services/firebaseService";
import { useProgress } from "../context/ProgressContext";
import { useToast } from "../context/ToastContext";
import RelatedResources from "../components/common/RelatedResources";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const { isBookmarked, toggleBookmark, markProjectComplete, completedProjects } = useProgress();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadProj() {
      setLoading(true);
      const data = await getProjectById(id);
      setProject(data);
      setLoading(false);
    }
    loadProj();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <p style={{ color: "var(--accent-blue)" }}>Loading Capstone Project Blueprint...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Project Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>The requested engineering project could not be located.</p>
        <Link to="/projects" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Project Lab
        </Link>
      </div>
    );
  }

  const isCompleted = completedProjects.includes(project.id);
  const bookmarked = isBookmarked(project.id);

  const handleToggleBookmark = () => {
    const state = toggleBookmark({
      id: project.id,
      type: "project",
      title: project.title,
      category: project.category,
      link: `/projects/${project.id}`
    });
    addToast(state ? "Project saved to bookmarks!" : "Removed from bookmarks.", "info");
  };

  const handleMarkComplete = () => {
    markProjectComplete(project.id, project.title);
    addToast("Project completed! +300 XP recorded in your engineering portfolio.", "success");
  };

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    addToast("Project source code copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Project URL copied to clipboard!", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "1050px" }}>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/projects">Project Lab</Link>
        <span>/</span>
        <span>{project.category}</span>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>{project.title}</span>
      </div>

      {/* Header Banner */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
              <span className="badge badge-purple">{project.difficulty}</span>
              <span className="badge badge-blue">{project.category}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Clock size={13} /> {project.estimatedTime}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-amber)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Coins size={13} /> {project.estimatedCost}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}>{project.title}</h1>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleToggleBookmark} className={`btn btn-sm ${bookmarked ? 'btn-primary' : 'btn-secondary'}`}>
              <Bookmark size={15} /> {bookmarked ? "Bookmarked" : "Save Project"}
            </button>
            <button onClick={handleShare} className="btn btn-secondary btn-sm" title="Share URL">
              <Share2 size={15} />
            </button>
          </div>
        </div>

        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {project.description}
        </p>

        {/* Problem Statement & Objective Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", background: "rgba(244, 63, 94, 0.05)", borderLeft: "3px solid #f43f5e", borderRadius: "var(--radius-sm)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fb7185", textTransform: "uppercase" }}>REAL-WORLD PROBLEM STATEMENT</div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-main)", marginTop: "0.25rem" }}>{project.problemStatement}</p>
          </div>

          <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.05)", borderLeft: "3px solid #10b981", borderRadius: "var(--radius-sm)" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase" }}>ENGINEERING OBJECTIVE</div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-main)", marginTop: "0.25rem" }}>{project.objective}</p>
          </div>
        </div>
      </div>

      {/* Block Diagram & Architecture */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Compass size={18} color="var(--accent-cyan)" /> System Architecture & Block Diagram
        </h3>
        <div style={{
          background: "#080c14",
          border: "1px solid var(--border-subtle)",
          padding: "1.25rem",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          color: "#38bdf8",
          overflowX: "auto",
          textAlign: "center"
        }}>
          {project.blockDiagram}
        </div>
      </div>

      {/* Bill of Materials (Components List) */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Cpu size={18} color="var(--accent-blue)" /> Bill of Materials (BOM) & Components
        </h3>

        <div className="table-responsive">
          <table style={{ width: "100%", minWidth: "520px", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-card)", color: "var(--accent-blue)" }}>
                <th style={{ padding: "0.75rem" }}>Component Name</th>
                <th style={{ padding: "0.75rem" }}>Quantity</th>
                <th style={{ padding: "0.75rem" }}>Subsystem Role</th>
              </tr>
            </thead>
            <tbody>
              {project.componentsList?.map((comp, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600, color: "var(--text-main)" }}>{comp.name}</td>
                  <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)" }}>{comp.qty}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{comp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Circuit Diagram & Wiring */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Layers size={18} color="var(--accent-cyan)" /> Circuit Wiring & Pin Interfacing
        </h3>
        <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          {project.circuitDiagramNotes}
        </p>

        <div style={{ background: "#080c14", padding: "1.2rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
            Harness Connections:
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
            {project.wiringDetails?.map((wire, idx) => (
              <li key={idx} style={{ color: "#38bdf8" }}>
                {wire}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assembly Procedure */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckSquare size={18} color="var(--accent-emerald)" /> Physical Assembly & Build Procedure
        </h3>
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {project.procedure?.map((step, idx) => (
            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", lineHeight: 1.6 }}>
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                color: "var(--accent-emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 800,
                marginTop: "2px",
                flexShrink: 0
              }}>
                {idx + 1}
              </div>
              <span style={{ color: "var(--text-main)", fontSize: "0.92rem" }}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Full Working Source Code */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <FileCode2 size={18} color="var(--accent-blue)" /> Tested Embedded Firmware Code
          </h3>
          <button onClick={handleCopyCode} className="btn btn-secondary btn-sm">
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
        <pre><code>{project.codeSnippet}</code></pre>
      </div>

      {/* Code Walkthrough */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>Firmware Logic Walkthrough</h3>
        <p style={{ lineHeight: 1.7, color: "var(--text-main)", fontSize: "0.95rem" }}>
          {project.codeExplanation}
        </p>
      </div>

      {/* Testing Methodology & Expected Output */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--accent-cyan)" }}>
            Expected System Output
          </h3>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)" }}>
            {project.expectedOutput}
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--accent-emerald)" }}>
            Testing & Verification Steps
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            {project.testingSteps?.map((ts, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                <span style={{ color: "var(--accent-emerald)" }}>✓</span>
                <span>{ts}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Troubleshooting Guide */}
      <div className="card" style={{ marginBottom: "2rem", borderColor: "rgba(245, 158, 11, 0.3)" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#fbbf24", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AlertTriangle size={18} color="#f59e0b" /> Capstone Troubleshooting & Bug Diagnostics
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-card)", color: "#fbbf24" }}>
                <th style={{ padding: "0.75rem" }}>Observed Problem</th>
                <th style={{ padding: "0.75rem" }}>Root Cause</th>
                <th style={{ padding: "0.75rem" }}>Resolution</th>
              </tr>
            </thead>
            <tbody>
              {project.troubleshooting?.map((tb, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem", color: "#fb7185", fontWeight: 600 }}>{tb.issue}</td>
                  <td style={{ padding: "0.75rem", color: "var(--text-secondary)" }}>{tb.cause}</td>
                  <td style={{ padding: "0.75rem", color: "#34d399" }}>{tb.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications & Safety */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--accent-purple)" }}>
            Industrial & Commercial Applications
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.9rem", color: "var(--text-main)" }}>
            {project.applications?.map((app, idx) => (
              <li key={idx}>• {app}</li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ borderColor: "rgba(244, 63, 94, 0.3)", background: "rgba(244, 63, 94, 0.02)" }}>
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "#fb7185", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ShieldAlert size={18} color="#f43f5e" /> Project Safety Guidelines
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {project.safety}
          </p>
        </div>
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
          <div style={{ fontWeight: 700, color: "var(--text-main)" }}>Built this prototype on breadboard or PCB?</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Record completion in your capstone portfolio (+300 XP)</div>
        </div>

        <button 
          onClick={handleMarkComplete} 
          disabled={isCompleted}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
        >
          <CheckCircle2 size={16} /> {isCompleted ? "Capstone Project Built ✓" : "Mark as Built"}
        </button>
      </div>

      {/* Connected Related Resources */}
      <RelatedResources currentType="project" currentId={project.id} related={project.related} />
    </div>
  );
}
