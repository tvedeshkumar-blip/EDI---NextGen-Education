// NextGen Education - Premium Engineering Home Page
import React from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  FlaskConical, 
  FolderGit2, 
  Video, 
  HelpCircle, 
  Bot, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Compass, 
  Layers,
  Sparkles,
  BookOpen,
  Terminal,
  Activity
} from "lucide-react";

import { componentsData } from "../data/componentsData";
import { experimentsData } from "../data/experimentsData";
import { projectsData } from "../data/projectsData";

export default function Home() {
  const featuredComponents = componentsData.slice(0, 4);
  const featuredExperiments = experimentsData.slice(0, 3);
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section style={{
        position: "relative",
        padding: "5rem 0 6rem 0",
        overflow: "hidden"
      }}>
        {/* Glow backdrop spheres */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "350px",
          background: "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 80%)",
          pointerEvents: "none",
          filter: "blur(60px)",
          zIndex: 0
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", marginBottom: "1.5rem" }}>
            <span className="badge badge-cyan" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
              <Sparkles size={14} /> Practical Engineering Learning Platform
            </span>
          </div>

          {/* Heading */}
          <h1 style={{ maxWidth: "900px", margin: "0 auto 1.5rem auto", fontWeight: 800 }}>
            NEXTGEN <span style={{ 
              background: "linear-gradient(135deg, #06b6d4 0%, #38bdf8 50%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>EDUCATION</span>
          </h1>

          <p style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontWeight: 600,
            color: "var(--text-main)",
            marginBottom: "1rem",
            letterSpacing: "-0.01em"
          }}>
            "Learn. Experiment. Build. Innovate."
          </p>

          <p style={{
            maxWidth: "680px",
            margin: "0 auto 2.5rem auto",
            fontSize: "1.08rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6
          }}>
            Turn engineering theory into tangible practical skills through interactive lab experiments, real electronic components, embedded projects, video tutorials, and AI-powered troubleshooting.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
            <Link to="/learn" className="btn btn-primary btn-lg">
              START LEARNING <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn btn-secondary btn-lg">
              <FolderGit2 size={18} /> EXPLORE PROJECTS
            </Link>
            <Link to="/ai-assistant" className="btn btn-outline btn-lg" style={{ borderColor: "rgba(6, 182, 212, 0.4)" }}>
              <Bot size={18} /> ASK NEXTGEN AI
            </Link>
          </div>

          {/* Technical Architecture Strip */}
          <div style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid var(--border-card)",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem 2rem",
            maxWidth: "1050px",
            margin: "0 auto",
            backdropFilter: "blur(12px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            textAlign: "left"
          }}>
            <div style={{ borderLeft: "3px solid var(--accent-cyan)", paddingLeft: "1rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-main)" }}>24+</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Electronic Components with Pinouts</div>
            </div>
            <div style={{ borderLeft: "3px solid var(--accent-emerald)", paddingLeft: "1rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-main)" }}>15</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Structured Lab Experiments</div>
            </div>
            <div style={{ borderLeft: "3px solid var(--accent-blue)", paddingLeft: "1rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-main)" }}>12</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Working Capstone Projects</div>
            </div>
            <div style={{ borderLeft: "3px solid var(--accent-purple)", paddingLeft: "1rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-main)" }}>10</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Engineering Diagnostic Quizzes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION STATEMENT */}
      <section style={{ padding: "4rem 0", background: "rgba(10, 14, 23, 0.5)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3rem auto" }}>
            <span className="badge badge-amber" style={{ marginBottom: "0.75rem" }}>THE ENGINEERING EDUCATION GAP</span>
            <h2>Why NextGen Education Was Created</h2>
            <p style={{ marginTop: "0.75rem" }}>
              Engineering curricula excel at teaching equations, derivations, and blackboard circuits. Yet when students enter the laboratory or workforce, they struggle to connect formulas with physical components, debugging tools, and real-world embedded software.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
            <div className="card" style={{ borderColor: "rgba(244, 63, 94, 0.3)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(244, 63, 94, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f43f5e", marginBottom: "1rem" }}>
                ✕
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "#fb7185" }}>Traditional Academic Limitations</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <li>• Theoretical Ohm's and Kirchhoff's laws taught with zero component parasitics.</li>
                <li>• Pinouts and datasheets treated as abstract reference footnotes.</li>
                <li>• Microcontroller code copied blindly without hardware register comprehension.</li>
                <li>• Circuit failure causes panic without systematic troubleshooting methodology.</li>
              </ul>
            </div>

            <div className="card" style={{ borderColor: "rgba(16, 185, 129, 0.4)", background: "rgba(16, 185, 129, 0.03)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", marginBottom: "1rem" }}>
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "#34d399" }}>NextGen Connected Learning Architecture</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <li>• <strong>Every theory</strong> connects directly to components, circuits, and experiments.</li>
                <li>• <strong>Pinout tables & electrical limits</strong> are integrated into interactive 3D/2D cards.</li>
                <li>• <strong>Step-by-step procedures</strong> feature actual multimeter observations and code.</li>
                <li>• <strong>AI Assistant</strong> provides immediate, safe troubleshooting and schematic guidance.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 10-STEP PRACTICAL LEARNING JOURNEY */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 3.5rem auto" }}>
            <span className="badge badge-cyan" style={{ marginBottom: "0.75rem" }}>PRODUCT PHILOSOPHY</span>
            <h2>The Complete Engineering Learning Journey</h2>
            <p style={{ marginTop: "0.75rem" }}>
              NextGen Education is not a passive documentation website. Every single resource seamlessly connects to the next stage of your engineering workflow:
            </p>
          </div>

          {/* Workflow Pipeline */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "0.75rem",
            textAlign: "center"
          }}>
            {[
              { step: "01", name: "THEORY", icon: "📐", desc: "Laws & Math" },
              { step: "02", name: "CONCEPT", icon: "💡", desc: "Physics & Logic" },
              { step: "03", name: "COMPONENT", icon: "⚡", desc: "Pinouts & Specs" },
              { step: "04", name: "CIRCUIT", icon: "🔌", desc: "Schematic Wire" },
              { step: "05", name: "EXPERIMENT", icon: "🧪", desc: "Bench Procedure" },
              { step: "06", name: "VIDEO", icon: "🎥", desc: "Visual Deep Dive" },
              { step: "07", name: "PROJECT", icon: "🚀", desc: "Full System Build" },
              { step: "08", name: "QUIZ", icon: "🎯", desc: "Diagnostic Test" },
              { step: "09", name: "AI ASSIST", icon: "🤖", desc: "Troubleshooting" },
              { step: "10", name: "SKILL", icon: "🏆", desc: "Mastery & Career" }
            ].map((node) => (
              <div key={node.step} className="card" style={{ padding: "1.2rem 0.6rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{node.icon}</div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent-cyan)", letterSpacing: "0.05em" }}>STEP {node.step}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-main)", marginTop: "0.2rem" }}>{node.name}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{node.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED COMPONENTS HUB */}
      <section style={{ padding: "4rem 0", background: "rgba(15, 23, 42, 0.4)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: "0.5rem" }}>HARDWARE HUB</span>
              <h2>Electronics Component Library</h2>
              <p style={{ marginTop: "0.4rem" }}>Pinouts, electrical specs, safe usage guidelines, and related circuits for 24+ components.</p>
            </div>
            <Link to="/components" className="btn btn-outline btn-sm">
              View All 24 Components <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-cols-4">
            {featuredComponents.map(comp => (
              <Link key={comp.id} to={`/components/${comp.id}`} className="card" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-cyan" style={{ fontSize: "0.68rem" }}>{comp.category}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{comp.partNumber.split(" ")[0]}</span>
                </div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>{comp.name}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1rem", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {comp.shortDesc}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-cyan)", fontSize: "0.8rem", fontWeight: 600 }}>
                  Inspect Pinout & Circuit <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED EXPERIMENTS & PROJECTS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          {/* Experiments Section */}
          <div style={{ marginBottom: "4.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: "0.5rem" }}>LABORATORY</span>
                <h2>Practical Experiment Lab</h2>
                <p style={{ marginTop: "0.4rem" }}>15 real benchtop experiments with theory, connections, observations, and safety guidelines.</p>
              </div>
              <Link to="/experiments" className="btn btn-outline btn-sm">
                View All 15 Experiments <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid-cols-3">
              {featuredExperiments.map(exp => (
                <Link key={exp.id} to={`/experiments/${exp.id}`} className="card" style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span className="badge badge-emerald">{exp.difficulty}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{exp.estimatedTime}</span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--text-main)" }}>{exp.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {exp.objective}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-emerald)", fontSize: "0.82rem", fontWeight: 600 }}>
                    Start Lab Experiment <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: "0.5rem" }}>INNOVATION</span>
                <h2>Capstone Project Lab</h2>
                <p style={{ marginTop: "0.4rem" }}>12 complete engineering projects with code, circuit wiring, block diagrams, and troubleshooting.</p>
              </div>
              <Link to="/projects" className="btn btn-outline btn-sm">
                View All 12 Projects <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid-cols-3">
              {featuredProjects.map(proj => (
                <Link key={proj.id} to={`/projects/${proj.id}`} className="card" style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span className="badge badge-purple">{proj.difficulty}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{proj.estimatedTime}</span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem", color: "var(--text-main)" }}>{proj.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {proj.objective}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-blue)", fontSize: "0.82rem", fontWeight: 600 }}>
                    Inspect Project Blueprint <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI ASSISTANT HIGHLIGHT */}
      <section style={{ padding: "5rem 0", background: "linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(6, 182, 212, 0.08) 100%)" }}>
        <div className="container">
          <div style={{
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            borderRadius: "var(--radius-xl)",
            padding: "3.5rem 2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "center",
            boxShadow: "0 0 35px rgba(6, 182, 212, 0.15)"
          }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>
                <Bot size={14} /> NEXTGEN AI KNOWLEDGE ENGINE
              </span>
              <h2 style={{ marginBottom: "1rem", fontSize: "2rem" }}>
                Your 24/7 Practical Engineering Lab Assistant
              </h2>
              <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Stuck on a chattering relay? Confused by an ESP32 strapping pin reset loop? Wondering which MOSFET gate driver to choose?
                The NextGen AI Assistant analyzes your query and cross-references actual platform components, experiments, and projects with real engineering troubleshooting steps.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/ai-assistant" className="btn btn-primary">
                  Launch AI Assistant <ArrowRight size={16} />
                </Link>
                <Link to="/tools" className="btn btn-secondary">
                  <Wrench size={16} /> Engineering Calculators
                </Link>
              </div>
            </div>

            {/* Simulated AI Terminal Box */}
            <div style={{
              background: "#080c14",
              border: "1px solid var(--border-card)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              boxShadow: "var(--shadow-lg)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f43f5e" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>NextGen AI Terminal</span>
              </div>
              <div style={{ color: "var(--accent-cyan)", marginBottom: "0.5rem" }}>
                student@nextgen:~$ query "Why does my ultrasonic sensor read 0cm?"
              </div>
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                <span style={{ color: "#34d399", fontWeight: 700 }}>[AI Analysis]</span> Checking HC-SR04 common failure modes:<br/>
                1. <strong>PulseIn Timeout:</strong> Ensure pulseIn() timeout is specified (e.g. 30,000 µs).<br/>
                2. <strong>Voltage Level:</strong> HC-SR04 requires 5V VCC; powering with 3.3V produces zero echo return.<br/>
                3. <strong>Target Angle:</strong> Echo reflects away if target is tilted &gt;15°.<br/>
                <span style={{ color: "#38bdf8" }}>→ Linked Resource:</span> <span style={{ textDecoration: "underline" }}>Experiment 09: Ultrasonic Ranging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section style={{ padding: "6rem 0", textAlign: "center" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.4rem", marginBottom: "1.2rem" }}>
              Ready to Master Practical Engineering?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
              Join engineering students, ECE diploma-to-degree learners, and makers building real hardware with NextGen Education.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Free Student Account <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-lg">
                Open Student Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
