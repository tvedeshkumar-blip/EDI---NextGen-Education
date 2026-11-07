// NextGen Education - Detailed Laboratory Experiment Bench
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  FlaskConical, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  AlertTriangle, 
  ShieldAlert, 
  Wrench, 
  Cpu, 
  Layers, 
  FileText 
} from "lucide-react";
import { getExperimentById } from "../services/firebaseService";
import { useProgress } from "../context/ProgressContext";
import { useToast } from "../context/ToastContext";
import RelatedResources from "../components/common/RelatedResources";

export default function ExperimentDetail() {
  const { id } = useParams();
  const [experiment, setExperiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const { isBookmarked, toggleBookmark, markExperimentComplete, completedExperiments } = useProgress();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadExp() {
      setLoading(true);
      const data = await getExperimentById(id);
      setExperiment(data);
      setLoading(false);
    }
    loadExp();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <p style={{ color: "var(--accent-emerald)" }}>Loading Practical Experiment...</p>
      </div>
    );
  }

  if (!experiment) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Experiment Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>The requested laboratory experiment could not be located.</p>
        <Link to="/experiments" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Experiment Lab
        </Link>
      </div>
    );
  }

  const isCompleted = completedExperiments.includes(experiment.id);
  const bookmarked = isBookmarked(experiment.id);

  const handleToggleBookmark = () => {
    const state = toggleBookmark({
      id: experiment.id,
      type: "experiment",
      title: experiment.title,
      category: experiment.category,
      link: `/experiments/${experiment.id}`
    });
    addToast(state ? "Experiment saved to bookmarks!" : "Removed from bookmarks.", "info");
  };

  const handleMarkComplete = () => {
    markExperimentComplete(experiment.id, experiment.title);
    addToast("Experiment verified! +150 XP gained.", "success");
  };

  const handleCopyCode = () => {
    if (!experiment.codeSnippet) return;
    navigator.clipboard.writeText(experiment.codeSnippet);
    setCopied(true);
    addToast("Source code copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Experiment URL copied to clipboard!", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "1000px" }}>
      {/* Breadcrumb */}
      <div className="breadcrumbs">
        <Link to="/experiments">Experiment Lab</Link>
        <span>/</span>
        <span>{experiment.category}</span>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>{experiment.title}</span>
      </div>

      {/* Header Card */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
              <span className="badge badge-emerald">{experiment.difficulty}</span>
              <span className="badge badge-cyan">{experiment.category}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Clock size={13} /> {experiment.estimatedTime}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>{experiment.title}</h1>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleToggleBookmark} className={`btn btn-sm ${bookmarked ? 'btn-primary' : 'btn-secondary'}`}>
              <Bookmark size={15} /> {bookmarked ? "Bookmarked" : "Save Lab"}
            </button>
            <button onClick={handleShare} className="btn btn-secondary btn-sm" title="Share URL">
              <Share2 size={15} />
            </button>
          </div>
        </div>

        <div style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", borderLeft: "3px solid var(--accent-emerald)" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-emerald)", textTransform: "uppercase" }}>OBJECTIVE</div>
          <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginTop: "0.25rem" }}>{experiment.objective}</p>
        </div>
      </div>

      {/* Theory */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FileText size={18} color="var(--accent-cyan)" /> Theoretical Background
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--text-main)", fontSize: "0.95rem" }}>
          {experiment.theory}
        </p>
      </div>

      {/* Components & Equipment (2-col grid) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Components */}
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Cpu size={18} color="var(--accent-cyan)" /> Required Electronic Components
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {experiment.requiredComponents?.map((item, idx) => (
              <li key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.02)" }}>
                <span style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>{item.name}</span>
                <span className="badge badge-cyan" style={{ fontSize: "0.7rem" }}>Qty: {item.qty}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Equipment */}
        <div className="card">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Wrench size={18} color="var(--accent-amber)" /> Laboratory Equipment
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {experiment.requiredEquipment?.map((item, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.02)" }}>
                <span style={{ color: "var(--accent-amber)" }}>•</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Circuit Connections */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Layers size={18} color="var(--accent-blue)" /> Circuit Diagram & Connections
        </h3>
        <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          {experiment.circuitDiagramDesc}
        </p>

        <div style={{ background: "#080c14", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-blue)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
            Pin-to-Pin Wiring Table:
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
            {experiment.connections?.map((conn, idx) => (
              <li key={idx} style={{ color: "#38bdf8" }}>
                {conn}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step-by-Step Procedure */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FlaskConical size={18} color="var(--accent-emerald)" /> Step-by-Step Laboratory Procedure
        </h3>
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {experiment.procedure?.map((step, idx) => (
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

      {/* Firmware / Code Snippet (if applicable) */}
      {experiment.codeSnippet && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              Firmware & Verification Script
            </h3>
            <button onClick={handleCopyCode} className="btn btn-secondary btn-sm">
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <pre><code>{experiment.codeSnippet}</code></pre>
        </div>
      )}

      {/* Expected Output, Observation & Result */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="card">
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "0.4rem" }}>EXPECTED OUTPUT</div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.6 }}>{experiment.expectedOutput}</p>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-amber)", textTransform: "uppercase", marginBottom: "0.4rem" }}>LAB OBSERVATION</div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.6 }}>{experiment.observation}</p>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-emerald)", textTransform: "uppercase", marginBottom: "0.4rem" }}>FINAL RESULT</div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-main)", lineHeight: 1.6 }}>{experiment.result}</p>
        </div>
      </div>

      {/* Troubleshooting Table */}
      <div className="card" style={{ marginBottom: "2rem", borderColor: "rgba(245, 158, 11, 0.3)" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#fbbf24", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AlertTriangle size={18} color="#f59e0b" /> Laboratory Troubleshooting Guide
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-card)", color: "#fbbf24" }}>
                <th style={{ padding: "0.75rem" }}>Observed Issue</th>
                <th style={{ padding: "0.75rem" }}>Likely Cause</th>
                <th style={{ padding: "0.75rem" }}>Remedial Action</th>
              </tr>
            </thead>
            <tbody>
              {experiment.troubleshooting?.map((tb, idx) => (
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

      {/* Safety Precautions */}
      <div className="card" style={{ marginBottom: "2.5rem", borderColor: "rgba(244, 63, 94, 0.3)", background: "rgba(244, 63, 94, 0.02)" }}>
        <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", color: "#fb7185", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <ShieldAlert size={18} color="#f43f5e" /> Safety Precautions
        </h3>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          {experiment.safetyNotes?.map((sn, idx) => (
            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
              <span style={{ color: "#f43f5e" }}>⚠️</span>
              <span>{sn}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action Card */}
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
          <div style={{ fontWeight: 700, color: "var(--text-main)" }}>Performed this experiment on your bench?</div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Record completion in your verified practical portfolio (+150 XP)</div>
        </div>

        <button 
          onClick={handleMarkComplete} 
          disabled={isCompleted}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
        >
          <CheckCircle2 size={16} /> {isCompleted ? "Experiment Verified ✓" : "Mark as Completed"}
        </button>
      </div>

      {/* Interconnected Knowledge Widget */}
      <RelatedResources currentType="experiment" currentId={experiment.id} related={experiment.related} />
    </div>
  );
}
