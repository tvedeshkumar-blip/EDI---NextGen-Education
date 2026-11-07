// NextGen Education - Interconnected Knowledge & Recommendation Widget
// Connects components, experiments, projects, videos, and quizzes seamlessly.

import React from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  FlaskConical, 
  FolderGit2, 
  Video, 
  HelpCircle, 
  Bot,
  Layers
} from "lucide-react";

import { componentsData } from "../../data/componentsData";
import { experimentsData } from "../../data/experimentsData";
import { projectsData } from "../../data/projectsData";
import { videosData } from "../../data/videosData";
import { quizzesData } from "../../data/quizzesData";

export default function RelatedResources({ 
  currentType, 
  currentId, 
  related = {} 
}) {
  // Resolve related components
  const relComponentIds = related.components || related.componentIds || (related.componentId ? [related.componentId] : []);
  const components = componentsData.filter(c => relComponentIds.includes(c.id));

  // Resolve related experiments
  const relExpIds = related.experiments || related.experimentIds || (related.experimentId ? [related.experimentId] : []);
  const experiments = experimentsData.filter(e => relExpIds.includes(e.id));

  // Resolve related projects
  const relProjIds = related.projects || related.projectId ? [related.projectId] : [];
  const projects = projectsData.filter(p => relProjIds.includes(p.id));

  // Resolve related videos
  const relVidIds = related.videos || related.videoIds || (related.videoId ? [related.videoId] : []);
  const videos = videosData.filter(v => relVidIds.includes(v.id));

  // Resolve related quizzes
  const relQuizIds = related.quizzes || related.quizIds || (related.quizId ? [related.quizId] : []);
  const quizzes = quizzesData.filter(q => relQuizIds.includes(q.id));

  const hasAny = components.length > 0 || experiments.length > 0 || projects.length > 0 || videos.length > 0 || quizzes.length > 0;

  if (!hasAny) return null;

  return (
    <div style={{
      marginTop: "3rem",
      padding: "2rem",
      background: "rgba(15, 23, 42, 0.6)",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--radius-xl)"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Layers size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: "1.25rem", color: "var(--text-main)" }}>Connected Learning Journey</h3>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            NextGen Education connects theory, components, experiments, projects, and assessments into one complete workflow.
          </p>
        </div>

        <Link to={`/ai-assistant?q=Help me understand ${currentId}`} className="btn btn-outline btn-sm">
          <Bot size={15} /> Ask AI Assistant
        </Link>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.25rem"
      }}>
        {/* Related Components */}
        {components.length > 0 && currentType !== "component" && (
          <div className="card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-cyan)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              <Cpu size={15} /> Component Specs
            </div>
            {components.map(item => (
              <Link 
                key={item.id} 
                to={`/components/${item.id}`}
                style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.03)" }}
              >
                <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.9rem" }}>{item.name}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.partNumber}</div>
              </Link>
            ))}
          </div>
        )}

        {/* Related Experiments */}
        {experiments.length > 0 && currentType !== "experiment" && (
          <div className="card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-emerald)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              <FlaskConical size={15} /> Practical Experiment
            </div>
            {experiments.map(item => (
              <Link 
                key={item.id} 
                to={`/experiments/${item.id}`}
                style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.03)" }}
              >
                <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.9rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.estimatedTime} • {item.difficulty}</div>
              </Link>
            ))}
          </div>
        )}

        {/* Related Projects */}
        {projects.length > 0 && currentType !== "project" && (
          <div className="card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-blue)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              <FolderGit2 size={15} /> Build Project
            </div>
            {projects.map(item => (
              <Link 
                key={item.id} 
                to={`/projects/${item.id}`}
                style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.03)" }}
              >
                <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.9rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.category} • {item.estimatedTime}</div>
              </Link>
            ))}
          </div>
        )}

        {/* Related Videos */}
        {videos.length > 0 && currentType !== "video" && (
          <div className="card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-rose)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              <Video size={15} /> Video Tutorial
            </div>
            {videos.map(item => (
              <Link 
                key={item.id} 
                to={`/videos/${item.id}`}
                style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.03)" }}
              >
                <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.9rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.channel} • {item.duration}</div>
              </Link>
            ))}
          </div>
        )}

        {/* Related Quizzes */}
        {quizzes.length > 0 && currentType !== "quiz" && (
          <div className="card" style={{ padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-purple)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
              <HelpCircle size={15} /> Knowledge Assessment
            </div>
            {quizzes.map(item => (
              <Link 
                key={item.id} 
                to={`/quizzes/${item.id}`}
                style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.03)" }}
              >
                <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.9rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>5 Practical Questions</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
