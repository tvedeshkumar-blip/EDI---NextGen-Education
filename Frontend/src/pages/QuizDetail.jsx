// NextGen Education - Interactive Quiz Engine
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Lightbulb, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { getQuizById } from "../services/firebaseService";
import { useProgress } from "../context/ProgressContext";
import { useToast } from "../context/ToastContext";
import RelatedResources from "../components/common/RelatedResources";

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { saveQuizResult } = useProgress();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadQuiz() {
      setLoading(true);
      const data = await getQuizById(id);
      setQuiz(data);
      setLoading(false);
    }
    loadQuiz();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <p style={{ color: "var(--accent-purple)" }}>Loading Engineering Assessment...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Quiz Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>The requested quiz could not be located.</p>
        <Link to="/quizzes" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Quiz System
        </Link>
      </div>
    );
  }

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return;
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionIndex
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(userAnswers).length < quiz.questions.length) {
      addToast("Please answer all questions before submitting.", "warning");
      return;
    }

    let calculatedScore = 0;
    quiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
    saveQuizResult(quiz.id, calculatedScore, quiz.questions.length, quiz.title);
    addToast(`Quiz submitted! Score: ${calculatedScore}/${quiz.questions.length}`, "success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "860px" }}>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/quizzes">Quiz System</Link>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>{quiz.title}</span>
      </div>

      {/* Header Banner */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span className="badge badge-purple">{quiz.category}</span>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            5 Diagnostic Questions
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: "0.5rem" }}>{quiz.title}</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{quiz.description}</p>
      </div>

      {/* Score Summary Box (shown after submission) */}
      {submitted && (
        <div className="card" style={{
          marginBottom: "2.5rem",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(139, 92, 246, 0.15) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.4)",
          textAlign: "center",
          padding: "2.5rem"
        }}>
          <div style={{ display: "inline-flex", marginBottom: "1rem" }}>
            <Award size={48} color={percentage >= 80 ? "var(--accent-emerald)" : percentage >= 60 ? "var(--accent-amber)" : "var(--accent-rose)"} />
          </div>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Assessment Result: {percentage}%
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
            You answered <strong style={{ color: "var(--text-main)" }}>{score}</strong> out of <strong style={{ color: "var(--text-main)" }}>{quiz.questions.length}</strong> questions correctly.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleRetry} className="btn btn-secondary">
              <RotateCcw size={16} /> Retake Assessment
            </button>
            <Link to="/quizzes" className="btn btn-outline">
              Explore Other Quizzes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "2.5rem" }}>
          {quiz.questions.map((q, qIndex) => {
            const isUserCorrect = submitted && userAnswers[q.id] === q.correctIndex;

            return (
              <div 
                key={q.id} 
                className="card" 
                style={{
                  borderLeft: submitted 
                    ? (isUserCorrect ? "4px solid var(--accent-emerald)" : "4px solid var(--accent-rose)") 
                    : "1px solid var(--border-card)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <span style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "rgba(139, 92, 246, 0.15)",
                      color: "var(--accent-purple)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      marginTop: "2px",
                      flexShrink: 0
                    }}>
                      {qIndex + 1}
                    </span>
                    <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", lineHeight: 1.5 }}>
                      {q.question}
                    </h3>
                  </div>

                  {submitted && (
                    <div>
                      {isUserCorrect ? (
                        <span className="badge badge-emerald">
                          <CheckCircle2 size={13} /> Correct
                        </span>
                      ) : (
                        <span className="badge badge-rose">
                          <XCircle size={13} /> Incorrect
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" }}>
                  {q.options.map((opt, optIndex) => {
                    const isSelected = userAnswers[q.id] === optIndex;
                    const isCorrectAnswer = submitted && optIndex === q.correctIndex;
                    const isWrongSelection = submitted && isSelected && !isCorrectAnswer;

                    let optionBg = "rgba(255, 255, 255, 0.02)";
                    let optionBorder = "var(--border-subtle)";

                    if (isSelected && !submitted) {
                      optionBg = "rgba(6, 182, 212, 0.12)";
                      optionBorder = "var(--accent-cyan)";
                    }
                    if (isCorrectAnswer) {
                      optionBg = "rgba(16, 185, 129, 0.15)";
                      optionBorder = "var(--accent-emerald)";
                    }
                    if (isWrongSelection) {
                      optionBg = "rgba(244, 63, 94, 0.15)";
                      optionBorder = "var(--accent-rose)";
                    }

                    return (
                      <div
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        style={{
                          padding: "0.85rem 1rem",
                          borderRadius: "var(--radius-md)",
                          background: optionBg,
                          border: `1px solid ${optionBorder}`,
                          cursor: submitted ? "default" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          transition: "all 0.15s ease"
                        }}
                      >
                        <div style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          border: `2px solid ${isSelected || isCorrectAnswer ? 'var(--accent-cyan)' : 'var(--text-muted)'}`,
                          background: isSelected || isCorrectAnswer ? 'var(--accent-cyan)' : 'transparent',
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          {(isSelected || isCorrectAnswer) && (
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0a0e17" }} />
                          )}
                        </div>
                        <span style={{ fontSize: "0.92rem", color: "var(--text-main)" }}>
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation (revealed after submission) */}
                {submitted && (
                  <div style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(15, 23, 42, 0.7)",
                    border: "1px solid var(--border-subtle)"
                  }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Lightbulb size={14} /> ENGINEERING EXPLANATION:
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary btn-lg">
              Submit Assessment Answers <ArrowRight size={18} />
            </button>
          </div>
        )}
      </form>

      {/* Connected Related Resources */}
      <RelatedResources currentType="quiz" currentId={quiz.id} related={quiz.related} />
    </div>
  );
}
