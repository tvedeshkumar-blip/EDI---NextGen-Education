// NextGen Education - Student Profile & Academic Record
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { useToast } from "../context/ToastContext";
import { 
  User, 
  Mail, 
  Building2, 
  GraduationCap, 
  Calendar, 
  ShieldCheck, 
  Save, 
  Award,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function Profile() {
  const { userProfile, updateProfileData, isAdmin } = useAuth();
  const { totalXP, knowledgeLevel, completedExperiments, completedProjects, completedLessons, watchedVideos } = useProgress();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    college: userProfile?.college || "",
    department: userProfile?.department || "Electronics & Communication Engineering",
    year: userProfile?.year || "4th Year (Final Year)"
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfileData(formData);
    setIsEditing(false);
    addToast("Profile details updated successfully!", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "860px" }}>
      {/* Header Banner */}
      <div className="card" style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.8rem",
          fontWeight: 800,
          color: "#fff",
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)"
        }}>
          {userProfile?.name?.charAt(0) || "S"}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 style={{ fontSize: "1.6rem" }}>{userProfile?.name || "Student Engineer"}</h2>
            {isAdmin ? (
              <span className="badge badge-rose">Administrator</span>
            ) : (
              <span className="badge badge-cyan">Student</span>
            )}
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            {userProfile?.email}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <span className="badge badge-emerald">Level {knowledgeLevel} Scholar</span>
            <span className="badge badge-purple">{totalXP} Total XP</span>
          </div>
        </div>

        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="btn btn-secondary btn-sm"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Details & Academic Edit Form */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <GraduationCap size={20} color="var(--accent-cyan)" /> Academic Information
        </h3>

        {isEditing ? (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">College / University</label>
              <input
                type="text"
                className="form-input"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Year of Study</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>
              <Save size={16} /> Save Academic Profile
            </button>
          </form>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            <div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Institution</div>
              <div style={{ fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem" }}>{userProfile?.college || "Engineering College"}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Department</div>
              <div style={{ fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem" }}>{userProfile?.department || "ECE"}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Year of Study</div>
              <div style={{ fontWeight: 600, color: "var(--text-main)", marginTop: "0.2rem" }}>{userProfile?.year || "Final Year"}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Platform Role</div>
              <div style={{ fontWeight: 600, color: "var(--accent-cyan)", marginTop: "0.2rem" }}>{userProfile?.role?.toUpperCase()}</div>
            </div>
          </div>
        )}
      </div>

      {/* Practical Portfolio Breakdown */}
      <div className="card">
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Award size={20} color="var(--accent-emerald)" /> Verified Practical Record
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Experiments Verified</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-emerald)" }}>{completedExperiments.length}</div>
          </div>
          <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Projects Built</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-blue)" }}>{completedProjects.length}</div>
          </div>
          <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Lessons Mastered</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-purple)" }}>{completedLessons.length}</div>
          </div>
          <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Videos Completed</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-rose)" }}>{watchedVideos.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
