// NextGen Education - Main Navigation Bar
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { 
  Cpu, 
  Search, 
  Bookmark, 
  Bot, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Wrench, 
  FlaskConical, 
  FolderGit2, 
  Video, 
  BookOpen, 
  HelpCircle,
  ShieldAlert
} from "lucide-react";

export default function Navbar({ onOpenSearch }) {
  const { currentUser, userProfile, isAdmin, logout } = useAuth();
  const { bookmarks } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="NextGen Education Home">
          <div className="brand-logo-icon">
            <Cpu size={22} />
          </div>
          <div>
            <div style={{ lineHeight: 1.1 }}>NEXTGEN <span style={{ color: "var(--accent-cyan)" }}>EDUCATION</span></div>
            <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: 600 }}>
              LEARN • EXPERIMENT • BUILD
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/learn" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <BookOpen size={16} />
            <span>Learn</span>
          </NavLink>
          <NavLink to="/components" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Cpu size={16} />
            <span>Components</span>
          </NavLink>
          <NavLink to="/experiments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <FlaskConical size={16} />
            <span>Lab</span>
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <FolderGit2 size={16} />
            <span>Projects</span>
          </NavLink>
          <NavLink to="/videos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Video size={16} />
            <span>Videos</span>
          </NavLink>
          <NavLink to="/quizzes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <HelpCircle size={16} />
            <span>Quizzes</span>
          </NavLink>
          <NavLink to="/tools" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Wrench size={16} />
            <span>Tools</span>
          </NavLink>
          <NavLink to="/ai-assistant" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ color: "var(--accent-cyan)" }}>
            <Bot size={16} />
            <span>AI Assistant</span>
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Quick Search Shortcut Button */}
          <button 
            onClick={onOpenSearch} 
            className="btn btn-secondary btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.85rem" }}
            title="Search Platform (Ctrl+K)"
          >
            <Search size={15} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Search...</span>
            <kbd style={{ 
              background: "rgba(255,255,255,0.08)", 
              padding: "1px 5px", 
              borderRadius: "4px", 
              fontSize: "0.7rem",
              border: "1px solid var(--border-subtle)" 
            }}>⌘K</kbd>
          </button>

          {/* Bookmarks Quick Link */}
          <Link 
            to="/saved" 
            className="btn btn-secondary btn-sm" 
            style={{ position: "relative", padding: "0.45rem 0.65rem" }}
            title="Saved Content"
          >
            <Bookmark size={16} />
            {bookmarks.length > 0 && (
              <span style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                background: "var(--accent-cyan)",
                color: "#0a0e17",
                fontSize: "0.65rem",
                fontWeight: 800,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {bookmarks.length}
              </span>
            )}
          </Link>

          {/* User Account / Profile */}
          {currentUser ? (
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="btn btn-secondary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}>
                  {userProfile?.name?.charAt(0) || "U"}
                </div>
                <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {userProfile?.name || "Student"}
                </span>
                {isAdmin && (
                  <span className="badge badge-rose" style={{ fontSize: "0.6rem", padding: "1px 4px" }}>Admin</span>
                )}
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  width: "220px",
                  background: "#0f172a",
                  border: "1px solid var(--border-card)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-lg)",
                  padding: "0.5rem",
                  zIndex: 200,
                  animation: "scaleUp 0.15s ease"
                }}>
                  <div style={{ padding: "0.5rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "0.25rem" }}>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--text-main)" }}>{userProfile?.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{userProfile?.email}</div>
                  </div>

                  <Link to="/dashboard" className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "flex-start", marginBottom: "0.25rem" }}>
                    <User size={15} /> Dashboard
                  </Link>

                  <Link to="/profile" className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "flex-start", marginBottom: "0.25rem" }}>
                    <BookOpen size={15} /> Profile & Records
                  </Link>

                  {isAdmin && (
                    <Link to="/admin" className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "flex-start", marginBottom: "0.25rem", color: "var(--accent-rose)" }}>
                      <ShieldAlert size={15} /> Admin Console
                    </Link>
                  )}

                  <button onClick={handleLogout} className="btn btn-danger btn-sm" style={{ width: "100%", justifyContent: "flex-start", marginTop: "0.25rem" }}>
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: "var(--nav-height)",
          left: 0,
          right: 0,
          background: "#0a0e17",
          borderBottom: "1px solid var(--border-card)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 999,
          maxHeight: "calc(100dvh - var(--nav-height))",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          boxShadow: "var(--shadow-lg)"
        }}>
          <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Learn Curriculum</Link>
          <Link to="/components" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Component Library</Link>
          <Link to="/experiments" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Experiment Lab</Link>
          <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Project Lab</Link>
          <Link to="/videos" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Video Learning</Link>
          <Link to="/quizzes" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Quiz System</Link>
          <Link to="/tools" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Engineering Tools</Link>
          <Link to="/resources" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Resource Hub</Link>
          <Link to="/experts" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem" }}>Faculty Mentors</Link>
          <Link to="/ai-assistant" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ fontSize: "1.1rem", color: "var(--accent-cyan)" }}>AI Learning Assistant</Link>
          <hr style={{ borderColor: "var(--border-subtle)" }} />
          {currentUser ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary">Student Dashboard</Link>
              {isAdmin && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="btn btn-danger">Admin Panel</Link>}
              <button onClick={() => { setMobileMenuOpen(false); handleLogout(); }} className="btn btn-outline">Sign Out</button>
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
