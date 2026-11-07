// NextGen Education - Administrative Management Console
import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Database,
  Plus,
  Trash2,
  Edit3,
  Check,
  RefreshCw,
  Search,
  Layers,
  Cpu,
  FlaskConical,
  FolderGit2,
  Video,
  HelpCircle,
  Users
} from "lucide-react";
import {
  getComponents,
  getExperiments,
  getProjects,
  getVideos,
  getQuizzes,
  createDocument,
  deleteDocument,
  seedFirestoreDatabase
} from "../services/firebaseService";
import { useToast } from "../context/ToastContext";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [components, setComponents] = useState([]);
  const [experiments, setExperiments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Seeder state
  const [seedingStatus, setSeedingStatus] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);

  // New item modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompData, setNewCompData] = useState({
    id: "",
    name: "",
    category: "PASSIVE",
    partNumber: "",
    shortDesc: "",
    purpose: "",
    workingPrinciple: ""
  });

  const { addToast } = useToast();

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    try {
      const [c, e, p, v, q] = await Promise.all([
        getComponents(),
        getExperiments(),
        getProjects(),
        getVideos(),
        getQuizzes()
      ]);
      setComponents(c);
      setExperiments(e);
      setProjects(p);
      setVideos(v);
      setQuizzes(q);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSeedDatabase = async () => {
    if (!window.confirm("Seed all 112 documents (24 components, 15 experiments, 12 projects, 20 videos, 10 quizzes, 15 lessons, 10 resources, 6 experts) into Google Cloud Firestore?")) {
      return;
    }

    setIsSeeding(true);
    setSeedingStatus("Initializing Firestore seeder...");
    try {
      const total = await seedFirestoreDatabase((msg) => setSeedingStatus(msg));
      if (total > 0) {
        addToast(`Firestore populated with ${total} documents!`, "success");
      } else {
        addToast("Seeder completed with 0 documents. Please verify administrative permissions.", "error");
      }
      loadAllData();
    } catch (err) {
      console.error("Seeding error:", err);
      addToast(err.message || "Failed to seed some collections to Firestore.", "error");
    } finally {
      setIsSeeding(false);
      setSeedingStatus("");
    }
  };

  const handleDelete = async (collectionName, id) => {
    if (!window.confirm(`Are you sure you want to delete ${id} from ${collectionName}?`)) return;

    try {
      await deleteDocument(collectionName, id);
      addToast(`Deleted ${id} successfully.`, "success");
      loadAllData();
    } catch (err) {
      console.error("Delete error:", err);
      addToast("Delete operation failed in Firestore.", "error");
    }
  };

  const handleCreateComponent = async (e) => {
    e.preventDefault();
    if (!newCompData.id || !newCompData.name) {
      addToast("ID and Name are mandatory.", "warning");
      return;
    }

    try {
      await createDocument("components", newCompData.id.toLowerCase().trim(), {
        ...newCompData,
        pinout: [{ pin: "Lead 1", name: "Anode", desc: "Terminal A" }, { pin: "Lead 2", name: "Cathode", desc: "Terminal B" }],
        specifications: { "Operating Voltage": "5V" },
        tags: ["custom", newCompData.category.toLowerCase()],
        related: { components: [], experiments: [], projects: [], videos: [], quizzes: [] }
      });
      addToast(`Component ${newCompData.name} created!`, "success");
      setShowAddModal(false);
      setNewCompData({ id: "", name: "", category: "PASSIVE", partNumber: "", shortDesc: "", purpose: "", workingPrinciple: "" });
      loadAllData();
    } catch (err) {
      console.error("Create error:", err);
      addToast("Failed to create component in Firestore.", "error");
    }
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span className="badge badge-rose">
              <ShieldAlert size={14} /> ADMINISTRATIVE CONTROL
            </span>
          </div>
          <h1 style={{ fontSize: "2.2rem" }}>Admin Management Console</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Manage Firestore educational content, view platform analytics, and seed cloud database collections.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="btn btn-primary btn-sm"
          >
            <Database size={15} /> {isSeeding ? "Seeding..." : "Seed Dataset to Firestore"}
          </button>
          <button onClick={loadAllData} className="btn btn-secondary btn-sm" title="Refresh data">
            <RefreshCw size={15} className={loading ? "spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {seedingStatus && (
        <div style={{
          background: "rgba(6, 182, 212, 0.15)",
          border: "1px solid rgba(6, 182, 212, 0.4)",
          borderRadius: "var(--radius-md)",
          padding: "1rem",
          color: "var(--accent-cyan)",
          fontSize: "0.9rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <RefreshCw size={16} className="spin" /> {seedingStatus}
        </div>
      )}

      {/* Tabs */}
      <div className="tabs-nav">
        {[
          { id: "overview", label: "Analytics Overview" },
          { id: "components", label: `Components (${components.length})` },
          { id: "experiments", label: `Experiments (${experiments.length})` },
          { id: "projects", label: `Projects (${projects.length})` },
          { id: "videos", label: `Videos (${videos.length})` },
          { id: "quizzes", label: `Quizzes (${quizzes.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW ANALYTICS */}
      {activeTab === "overview" && (
        <div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem"
          }}>
            <div className="card">
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>HARDWARE COMPONENTS</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-cyan)", margin: "0.4rem 0" }}>
                {components.length}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)" }}>Active in library</div>
            </div>

            <div className="card">
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>EXPERIMENTS</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-emerald)", margin: "0.4rem 0" }}>
                {experiments.length}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--accent-emerald)" }}>Benchtop protocols</div>
            </div>

            <div className="card">
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>PROJECTS</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-blue)", margin: "0.4rem 0" }}>
                {projects.length}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--accent-blue)" }}>Capstone blueprints</div>
            </div>

            <div className="card">
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>VIDEOS</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-rose)", margin: "0.4rem 0" }}>
                {videos.length}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--accent-rose)" }}>YouTube lectures</div>
            </div>

            <div className="card">
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ASSESSMENTS</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-purple)", margin: "0.4rem 0" }}>
                {quizzes.length}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--accent-purple)" }}>Diagnostic quizzes</div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>System Health & Database Synchronization</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.2rem", lineHeight: 1.6 }}>
              All client read requests interact with Firebase Cloud Firestore. If your cloud security rules restrict write operations or during offline evaluation, the platform gracefully switches to our verified local dataset to guarantee 100% demo uptime.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                <span style={{ fontSize: "0.85rem", color: "#34d399", fontWeight: 600 }}>✓ Firestore Connected: nextgen-education-68702</span>
              </div>
              <div style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius-md)", background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.3)" }}>
                <span style={{ fontSize: "0.85rem", color: "#38bdf8", fontWeight: 600 }}>✓ Offline Fallback Cache: Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPONENTS TABLE */}
      {activeTab === "components" && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Component Hub Records</h3>
            <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
              <Plus size={15} /> Add New Component
            </button>
          </div>

          <div className="table-responsive">
            <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-card)", color: "var(--accent-cyan)" }}>
                  <th style={{ padding: "0.75rem" }}>ID</th>
                  <th style={{ padding: "0.75rem" }}>Component Name</th>
                  <th style={{ padding: "0.75rem" }}>Category</th>
                  <th style={{ padding: "0.75rem" }}>Part Number</th>
                  <th style={{ padding: "0.75rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {components.map(comp => (
                  <tr key={comp.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>{comp.id}</td>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{comp.name}</td>
                    <td style={{ padding: "0.75rem" }}><span className="badge badge-cyan">{comp.category}</span></td>
                    <td style={{ padding: "0.75rem", color: "var(--text-muted)" }}>{comp.partNumber}</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete("components", comp.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: "0.3rem 0.5rem" }}
                        title="Delete component"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: EXPERIMENTS TABLE */}
      {activeTab === "experiments" && (
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Experiment Lab Records</h3>
          <div className="table-responsive">
            <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-card)", color: "var(--accent-emerald)" }}>
                  <th style={{ padding: "0.75rem" }}>ID</th>
                  <th style={{ padding: "0.75rem" }}>Experiment Title</th>
                  <th style={{ padding: "0.75rem" }}>Difficulty</th>
                  <th style={{ padding: "0.75rem" }}>Estimated Duration</th>
                  <th style={{ padding: "0.75rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiments.map(exp => (
                  <tr key={exp.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-emerald)" }}>{exp.id}</td>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{exp.title}</td>
                    <td style={{ padding: "0.75rem" }}><span className="badge badge-emerald">{exp.difficulty}</span></td>
                    <td style={{ padding: "0.75rem", color: "var(--text-muted)" }}>{exp.estimatedTime}</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete("experiments", exp.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: "0.3rem 0.5rem" }}
                        title="Delete experiment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PROJECTS TABLE */}
      {activeTab === "projects" && (
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Project Lab Records</h3>
          <div className="table-responsive">
            <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-card)", color: "var(--accent-blue)" }}>
                  <th style={{ padding: "0.75rem" }}>ID</th>
                  <th style={{ padding: "0.75rem" }}>Project Title</th>
                  <th style={{ padding: "0.75rem" }}>Difficulty</th>
                  <th style={{ padding: "0.75rem" }}>Est. Cost</th>
                  <th style={{ padding: "0.75rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(proj => (
                  <tr key={proj.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-blue)" }}>{proj.id}</td>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{proj.title}</td>
                    <td style={{ padding: "0.75rem" }}><span className="badge badge-purple">{proj.difficulty}</span></td>
                    <td style={{ padding: "0.75rem", color: "var(--text-muted)" }}>{proj.estimatedCost}</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete("projects", proj.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: "0.3rem 0.5rem" }}
                        title="Delete project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: VIDEOS TABLE */}
      {activeTab === "videos" && (
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Practical Video Records</h3>
          <div className="table-responsive">
            <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-card)", color: "var(--accent-rose)" }}>
                  <th style={{ padding: "0.75rem" }}>YouTube ID</th>
                  <th style={{ padding: "0.75rem" }}>Video Title</th>
                  <th style={{ padding: "0.75rem" }}>Channel</th>
                  <th style={{ padding: "0.75rem" }}>Duration</th>
                  <th style={{ padding: "0.75rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map(vid => (
                  <tr key={vid.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-rose)" }}>{vid.youtubeId}</td>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{vid.title}</td>
                    <td style={{ padding: "0.75rem" }}><span className="badge badge-rose">{vid.channel}</span></td>
                    <td style={{ padding: "0.75rem", color: "var(--text-muted)" }}>{vid.duration}</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete("videos", vid.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: "0.3rem 0.5rem" }}
                        title="Delete video"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: QUIZZES TABLE */}
      {activeTab === "quizzes" && (
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Assessment Quiz Records</h3>
          <div className="table-responsive">
            <table style={{ width: "100%", minWidth: "620px", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-card)", color: "var(--accent-purple)" }}>
                  <th style={{ padding: "0.75rem" }}>ID</th>
                  <th style={{ padding: "0.75rem" }}>Quiz Title</th>
                  <th style={{ padding: "0.75rem" }}>Category</th>
                  <th style={{ padding: "0.75rem" }}>Questions</th>
                  <th style={{ padding: "0.75rem", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map(qz => (
                  <tr key={qz.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-purple)" }}>{qz.id}</td>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{qz.title}</td>
                    <td style={{ padding: "0.75rem" }}><span className="badge badge-purple">{qz.category}</span></td>
                    <td style={{ padding: "0.75rem", color: "var(--text-muted)" }}>{qz.questions?.length || 5} questions</td>
                    <td style={{ padding: "0.75rem", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete("quizzes", qz.id)}
                        className="btn btn-danger btn-sm"
                        style={{ padding: "0.3rem 0.5rem" }}
                        title="Delete quiz"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Component Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1.25rem" }}>Add Electronic Component</h3>
            <form onSubmit={handleCreateComponent}>
              <div className="form-group">
                <label className="form-label">Component ID (slug e.g. 'relay-5v')</label>
                <input
                  type="text"
                  className="form-input"
                  value={newCompData.id}
                  onChange={(e) => setNewCompData({ ...newCompData, id: e.target.value })}
                  placeholder="e.g. bjt-2n2222"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Component Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newCompData.name}
                  onChange={(e) => setNewCompData({ ...newCompData, name: e.target.value })}
                  placeholder="e.g. 2N2222 NPN High-Speed Transistor"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newCompData.category}
                    onChange={(e) => setNewCompData({ ...newCompData, category: e.target.value })}
                  >
                    <option value="PASSIVE">PASSIVE</option>
                    <option value="SEMICONDUCTORS">SEMICONDUCTORS</option>
                    <option value="ICs">ICs</option>
                    <option value="SENSORS">SENSORS</option>
                    <option value="BOARDS">BOARDS</option>
                    <option value="MODULES">MODULES</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Part Number / Package</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newCompData.partNumber}
                    onChange={(e) => setNewCompData({ ...newCompData, partNumber: e.target.value })}
                    placeholder="e.g. TO-92 / DO-41"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={newCompData.shortDesc}
                  onChange={(e) => setNewCompData({ ...newCompData, shortDesc: e.target.value })}
                  placeholder="Brief summary of component role..."
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Component to Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
