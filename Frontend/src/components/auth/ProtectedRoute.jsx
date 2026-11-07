// NextGen Education - Protected Route Wrapper
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ color: "var(--accent-cyan)", fontSize: "1.1rem" }}>Loading NextGen Session...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ color: "var(--accent-rose)", fontSize: "1.1rem" }}>Verifying Administrative Authorization...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <div className="card" style={{ maxWidth: "550px", margin: "0 auto", borderColor: "var(--accent-rose)" }}>
          <h2 style={{ color: "var(--accent-rose)", marginBottom: "1rem" }}>Access Restricted</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            The Admin Management Console is restricted to authorized faculty and administrative accounts. Normal student accounts do not have permission to modify educational records.
          </p>
          <a href="/dashboard" className="btn btn-secondary">
            Return to Student Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
}
