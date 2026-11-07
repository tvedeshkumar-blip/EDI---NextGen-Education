import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import { ToastProvider } from "./context/ToastContext";

// Common Layout Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import SearchModal from "./components/common/SearchModal";
import { ProtectedRoute, AdminRoute } from "./components/auth/ProtectedRoute";

// Lazy-loaded Pages for High Performance Bundle Splitting
const Home = lazy(() => import("./pages/Home"));
const LearningHub = lazy(() => import("./pages/LearningHub"));
const LearningDetail = lazy(() => import("./pages/LearningDetail"));
const ComponentHub = lazy(() => import("./pages/ComponentHub"));
const ComponentDetail = lazy(() => import("./pages/ComponentDetail"));
const ExperimentLab = lazy(() => import("./pages/ExperimentLab"));
const ExperimentDetail = lazy(() => import("./pages/ExperimentDetail"));
const ProjectLab = lazy(() => import("./pages/ProjectLab"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const VideoHub = lazy(() => import("./pages/VideoHub"));
const VideoDetail = lazy(() => import("./pages/VideoDetail"));
const QuizSystem = lazy(() => import("./pages/QuizSystem"));
const QuizDetail = lazy(() => import("./pages/QuizDetail"));
const EngineeringTools = lazy(() => import("./pages/EngineeringTools"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
const ResourceHub = lazy(() => import("./pages/ResourceHub"));
const ExpertsHub = lazy(() => import("./pages/ExpertsHub"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const SavedContent = lazy(() => import("./pages/SavedContent"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoadingFallback() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
      gap: "1rem",
      padding: "3rem 1rem"
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "3px solid rgba(6, 182, 212, 0.15)",
        borderTopColor: "var(--accent-cyan)",
        animation: "spin 0.8s linear infinite"
      }} />
      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", letterSpacing: "0.03em" }}>
        Loading NextGen module...
      </span>
    </div>
  );
}

export default function App() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Keyboard Shortcut: Ctrl+K or Cmd+K to open Search Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <ToastProvider>
            <div className="app-container">
              {/* Navigation Bar */}
              <Navbar onOpenSearch={() => setSearchModalOpen(true)} />

              {/* Global Cross-Platform Search Modal */}
              <SearchModal 
                isOpen={searchModalOpen} 
                onClose={() => setSearchModalOpen(false)} 
              />

              {/* Main Content Area */}
              <main className="main-content">
                <Suspense fallback={<PageLoadingFallback />}>
                  <Routes>
                    {/* Public Core Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Learning Curriculum */}
                    <Route path="/learn" element={<LearningHub />} />
                    <Route path="/learn/:id" element={<LearningDetail />} />

                    {/* Electronics Component Hub */}
                    <Route path="/components" element={<ComponentHub />} />
                    <Route path="/components/:id" element={<ComponentDetail />} />

                    {/* Practical Experiment Lab */}
                    <Route path="/experiments" element={<ExperimentLab />} />
                    <Route path="/experiments/:id" element={<ExperimentDetail />} />

                    {/* Capstone Project Lab */}
                    <Route path="/projects" element={<ProjectLab />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />

                    {/* Video Learning Hub */}
                    <Route path="/videos" element={<VideoHub />} />
                    <Route path="/videos/:id" element={<VideoDetail />} />

                    {/* Practical Quiz Assessment */}
                    <Route path="/quizzes" element={<QuizSystem />} />
                    <Route path="/quizzes/:id" element={<QuizDetail />} />

                    {/* Engineering Design Tools */}
                    <Route path="/tools" element={<EngineeringTools />} />

                    {/* AI Learning Assistant */}
                    <Route path="/ai-assistant" element={<AIAssistant />} />

                    {/* Resource & Datasheet Library */}
                    <Route path="/resources" element={<ResourceHub />} />

                    {/* Faculty & Industry Mentors */}
                    <Route path="/experts" element={<ExpertsHub />} />

                    {/* Student Protected Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/saved" 
                      element={
                        <ProtectedRoute>
                          <SavedContent />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Administrator Restricted Console */}
                    <Route 
                      path="/admin" 
                      element={
                        <AdminRoute>
                          <AdminDashboard />
                        </AdminRoute>
                      } 
                    />

                    {/* 404 Fallback */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>

              {/* Engineering Footer */}
              <Footer />
            </div>
          </ToastProvider>
        </ProgressProvider>
      </AuthProvider>
    </Router>
  );
}
