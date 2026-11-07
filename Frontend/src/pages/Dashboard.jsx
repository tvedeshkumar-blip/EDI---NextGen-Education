// NextGen Education - Student Engineering Dashboard
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { 
  Cpu, 
  FlaskConical, 
  FolderGit2, 
  Video, 
  HelpCircle, 
  Bot, 
  Award, 
  Zap, 
  Bookmark, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  Activity
} from "lucide-react";

export default function Dashboard() {
  const { userProfile } = useAuth();
  const { 
    completedExperiments, 
    completedProjects, 
    watchedVideos, 
    quizResults, 
    bookmarks,
    recentActivity,
    totalXP,
    knowledgeLevel
  } = useProgress();

  const averageQuizScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((acc, q) => acc + q.percentage, 0) / quizResults.length)
    : 0;

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Welcome Banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(6, 182, 212, 0.15) 100%)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-xl)",
        padding: "2.5rem",
        marginBottom: "2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.5rem",
        boxShadow: "var(--shadow-md)"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-cyan">
              <Sparkles size={13} /> Engineering Workspace
            </span>
            <span className="badge badge-emerald">
              Level {knowledgeLevel} Scholar
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", marginBottom: "0.4rem" }}>
            Welcome back, {userProfile?.name || "Student Engineer"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            {userProfile?.department} • {userProfile?.college}
          </p>
        </div>

        {/* Level & XP Gauge */}
        <div style={{
          background: "rgba(10, 14, 23, 0.7)",
          border: "1px solid var(--border-card)",
          borderRadius: "var(--radius-lg)",
          padding: "1rem 1.5rem",
          textAlign: "right",
          minWidth: "200px"
        }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Total Engineering XP
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
            {totalXP.toLocaleString()} XP
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
            {500 - (totalXP % 500)} XP to Level {knowledgeLevel + 1}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "1.25rem",
        marginBottom: "2.5rem"
      }}>
        {/* Experiments */}
        <Link to="/experiments" className="card" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>EXPERIMENTS</span>
            <FlaskConical size={18} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>
            {completedExperiments.length} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>/ 15</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-emerald)", marginTop: "0.25rem" }}>
            Practical Labs Verified
          </div>
        </Link>

        {/* Projects */}
        <Link to="/projects" className="card" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>PROJECTS</span>
            <FolderGit2 size={18} color="var(--accent-blue)" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>
            {completedProjects.length} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>/ 12</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)", marginTop: "0.25rem" }}>
            Capstone Prototypes Built
          </div>
        </Link>

        {/* Videos */}
        <Link to="/videos" className="card" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>VIDEOS</span>
            <Video size={18} color="var(--accent-rose)" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>
            {watchedVideos.length} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>/ 20</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-rose)", marginTop: "0.25rem" }}>
            Lectures & Walkthroughs
          </div>
        </Link>

        {/* Quiz Avg */}
        <Link to="/quizzes" className="card" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>QUIZ ACCURACY</span>
            <HelpCircle size={18} color="var(--accent-purple)" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>
            {averageQuizScore}%
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-purple)", marginTop: "0.25rem" }}>
            Across {quizResults.length} Assessment Attempts
          </div>
        </Link>

        {/* Bookmarks */}
        <Link to="/saved" className="card" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>SAVED ITEMS</span>
            <Bookmark size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>
            {bookmarks.length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", marginTop: "0.25rem" }}>
            Pinned Pins & Circuits
          </div>
        </Link>
      </div>

      {/* Main 2-Column Split */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2rem" }}>
        {/* Left Column: Learning Pathways & Recommendations */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Active Learning Path Card */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <TrendingUp size={18} color="var(--accent-cyan)" /> Recommended Next Step
              </h3>
              <span className="badge badge-cyan">In Progress</span>
            </div>

            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
              marginBottom: "1rem"
            }}>
              <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 700, textTransform: "uppercase" }}>
                IoT & Wireless Domain
              </div>
              <h4 style={{ margin: "0.3rem 0 0.5rem 0", color: "var(--text-main)" }}>
                ESP32 Real-Time Sensor Telemetry & Web Server
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                Connect an LDR or DHT11 to an ESP32 and host an asynchronous HTTP dashboard accessible over local Wi-Fi.
              </p>
              <Link to="/experiments/esp32-telemetry" className="btn btn-primary btn-sm">
                Open Experiment 14 <ArrowRight size={14} />
              </Link>
            </div>

            {/* AI Assistant Quick Launcher */}
            <div style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem"
            }}>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.95rem" }}>Stuck on your circuit?</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Ask NextGen AI for schematic diagnostics</div>
              </div>
              <Link to="/ai-assistant" className="btn btn-outline btn-sm">
                <Bot size={15} /> Open AI
              </Link>
            </div>
          </div>

          {/* Quiz Performance History */}
          <div className="card">
            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BarChart3 size={18} color="var(--accent-purple)" /> Assessment Performance
            </h3>

            {quizResults.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>No quizzes completed yet. Test your knowledge in the Quiz Lab!</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {quizResults.slice(0, 4).map((q, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-subtle)"
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.88rem" }}>{q.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Score: {q.score} / {q.total} • {q.date}</div>
                    </div>
                    <span className={`badge ${q.percentage >= 80 ? 'badge-emerald' : q.percentage >= 60 ? 'badge-amber' : 'badge-rose'}`}>
                      {q.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Bookmarks & Activity Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Pinned Bookmarks */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Bookmark size={18} color="var(--accent-cyan)" /> My Saved Content
              </h3>
              <Link to="/saved" style={{ fontSize: "0.8rem" }}>View All</Link>
            </div>

            {bookmarks.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>You haven't bookmarked any components or projects yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {bookmarks.slice(0, 4).map((bm) => (
                  <Link 
                    key={bm.id} 
                    to={bm.link}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(255,255,255,0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      border: "1px solid var(--border-subtle)"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.88rem" }}>{bm.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{bm.type.toUpperCase()} • {bm.category}</div>
                    </div>
                    <ArrowRight size={15} color="var(--accent-cyan)" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Platform Activity */}
          <div className="card">
            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Activity size={18} color="var(--accent-emerald)" /> Recent Learning Log
            </h3>

            {recentActivity.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>No recent activity logged yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {recentActivity.slice(0, 5).map((act, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.85rem" }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--accent-cyan)",
                      marginTop: "6px"
                    }} />
                    <div style={{ flex: 1 }}>
                      <Link to={act.link} style={{ color: "var(--text-main)", fontWeight: 500 }}>
                        {act.title}
                      </Link>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{act.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
