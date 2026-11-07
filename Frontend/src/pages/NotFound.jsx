// NextGen Education - 404 Not Found Page
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "6rem 1rem", textAlign: "center", maxWidth: "600px" }}>
      <div style={{
        display: "inline-flex",
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        background: "rgba(244, 63, 94, 0.15)",
        color: "#f43f5e",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem"
      }}>
        <Cpu size={36} />
      </div>
      <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>Circuit Node Not Found</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: 1.6 }}>
        The requested URL path does not correspond to an active component, experiment, or curriculum document in the NextGen Education database.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={16} /> Return to Home Platform
      </Link>
    </div>
  );
}
