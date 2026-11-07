import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Quiz Scoring and Evaluation Engine
 * Matches the logic in src/pages/QuizDetail.jsx and src/context/ProgressContext.jsx
 */

export function gradeQuizSubmission(questions, userAnswers) {
  let score = 0;
  const gradedQuestions = questions.map((q) => {
    const userAnswer = userAnswers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    if (isCorrect) score++;

    return {
      id: q.id,
      correctIndex: q.correctIndex,
      userAnswer,
      isCorrect
    };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 70;
  const xpEarned = score * 40;

  return {
    score,
    totalQuestions,
    percentage,
    passed,
    xpEarned,
    gradedQuestions
  };
}

describe("Quiz Scoring Engine", () => {
  const sampleQuestions = [
    { id: "q1", question: "What does V stand for?", correctIndex: 1 },
    { id: "q2", question: "Unit of resistance?", correctIndex: 2 },
    { id: "q3", question: "Ohm's Law formula?", correctIndex: 0 },
    { id: "q4", question: "LED current direction?", correctIndex: 3 },
    { id: "q5", question: "Capacitor stores?", correctIndex: 1 }
  ];

  it("should score 100% and pass when all answers are correct", () => {
    const answers = { q1: 1, q2: 2, q3: 0, q4: 3, q5: 1 };
    const result = gradeQuizSubmission(sampleQuestions, answers);

    assert.equal(result.score, 5);
    assert.equal(result.percentage, 100);
    assert.equal(result.passed, true);
    assert.equal(result.xpEarned, 200); // 5 * 40
  });

  it("should calculate 80% passing result with 4/5 correct", () => {
    const answers = { q1: 1, q2: 2, q3: 0, q4: 3, q5: 0 }; // q5 wrong
    const result = gradeQuizSubmission(sampleQuestions, answers);

    assert.equal(result.score, 4);
    assert.equal(result.percentage, 80);
    assert.equal(result.passed, true);
    assert.equal(result.xpEarned, 160);
  });

  it("should fail when score is below 70% threshold (e.g. 3/5 = 60%)", () => {
    const answers = { q1: 1, q2: 2, q3: 0, q4: 0, q5: 0 }; // 3 correct
    const result = gradeQuizSubmission(sampleQuestions, answers);

    assert.equal(result.score, 3);
    assert.equal(result.percentage, 60);
    assert.equal(result.passed, false);
    assert.equal(result.xpEarned, 120);
  });

  it("should handle completely unanswered or 0% correct quiz safely", () => {
    const answers = {};
    const result = gradeQuizSubmission(sampleQuestions, answers);

    assert.equal(result.score, 0);
    assert.equal(result.percentage, 0);
    assert.equal(result.passed, false);
    assert.equal(result.xpEarned, 0);
  });
});
