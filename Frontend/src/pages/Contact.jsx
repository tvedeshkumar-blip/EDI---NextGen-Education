// NextGen Education - Support & Academic Contact
import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  MessageSquare, 
  Building2, 
  MapPin, 
  CheckCircle2 
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Academic Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill in all contact fields.", "warning");
      return;
    }
    setSubmitted(true);
    addToast("Feedback submitted successfully!", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "860px" }}>
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <span className="badge badge-cyan" style={{ marginBottom: "0.5rem" }}>COMMUNICATION</span>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>Engineering Support & Feedback</h1>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-secondary)" }}>
          Have feedback on an experiment procedure, suggested capstone project, or questions regarding the EDI system architecture? Reach out to the student engineering team.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        {/* Contact Information Card */}
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem" }}>Project Coordinates</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ padding: "0.5rem", borderRadius: "8px", background: "rgba(6, 182, 212, 0.1)", color: "var(--accent-cyan)" }}>
                <Mail size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Project Inquiries</div>
                <div style={{ fontWeight: 600, color: "var(--text-main)" }}>nextgen.education.edi@gmail.com</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ padding: "0.5rem", borderRadius: "8px", background: "rgba(16, 185, 129, 0.1)", color: "var(--accent-emerald)" }}>
                <Building2 size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Department</div>
                <div style={{ fontWeight: 600, color: "var(--text-main)" }}>Department of Electronics & Communication Engineering</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ padding: "0.5rem", borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "var(--accent-blue)" }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Platform Domain</div>
                <div style={{ fontWeight: 600, color: "var(--text-main)" }}>Practical Engineering Learning & Innovation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ display: "inline-flex", marginBottom: "1rem", color: "var(--accent-emerald)" }}>
                <CheckCircle2 size={48} />
              </div>
              <h3 style={{ marginBottom: "0.5rem" }}>Message Dispatched</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Thank you for your academic feedback. The project development team has logged your submission.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Examiner / Student"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="examiner@university.edu"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Nature</label>
                <select
                  className="form-select"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="Academic Inquiry">Academic Viva Evaluation</option>
                  <option value="Experiment Bug">Lab Experiment Feedback</option>
                  <option value="Project Suggestion">Project Design Suggestion</option>
                  <option value="General Support">General Platform Support</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Message</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your observations, suggestions or evaluation notes..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                <Send size={15} /> Send Academic Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
