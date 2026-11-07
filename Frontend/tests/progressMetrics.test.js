import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Student Progress, XP Metrics, and Bookmark Logic
 * Matches logic in src/context/ProgressContext.jsx
 */

export function toggleBookmarkList(existingBookmarks, item) {
  const exists = existingBookmarks.some((b) => b.id === item.id);
  if (exists) {
    return existingBookmarks.filter((b) => b.id !== item.id);
  }
  return [...existingBookmarks, item];
}

export function computeTotalXP({
  completedExperiments = [],
  completedProjects = [],
  completedLessons = [],
  watchedVideos = [],
  quizResults = []
}) {
  return (
    completedExperiments.length * 150 +
    completedProjects.length * 300 +
    completedLessons.length * 100 +
    watchedVideos.length * 50 +
    quizResults.reduce((acc, q) => acc + (q.score || 0) * 40, 0)
  );
}

export function computeKnowledgeLevel(totalXP) {
  return Math.floor(totalXP / 500) + 1;
}

export function getLevelTitle(level) {
  if (level <= 1) return "Novice Engineer";
  if (level === 2) return "Circuit Builder";
  if (level === 3) return "Lab Specialist";
  if (level >= 4) return "Systems Architect";
  return "NextGen Innovator";
}

describe("Student Progress & Bookmark Metrics", () => {
  describe("Bookmark Management", () => {
    const item1 = { id: "esp32", title: "ESP32 MCU", type: "component", link: "/components/esp32" };
    const item2 = { id: "exp-01", title: "BJT Amplifier", type: "experiment", link: "/experiments/exp-01" };

    it("should add a new bookmark when not present", () => {
      const initial = [];
      const updated = toggleBookmarkList(initial, item1);

      assert.equal(updated.length, 1);
      assert.equal(updated[0].id, "esp32");
    });

    it("should remove an existing bookmark when toggled again", () => {
      const initial = [item1, item2];
      const updated = toggleBookmarkList(initial, item1);

      assert.equal(updated.length, 1);
      assert.equal(updated[0].id, "exp-01");
    });

    it("should not duplicate existing entries", () => {
      const initial = [item1];
      const step1 = toggleBookmarkList(initial, item2);
      assert.equal(step1.length, 2);

      const step2 = toggleBookmarkList(step1, item2); // removes
      assert.equal(step2.length, 1);
      assert.equal(step2[0].id, "esp32");
    });
  });

  describe("XP Calculation & Knowledge Levels", () => {
    it("should calculate 0 XP for a brand new student profile", () => {
      const xp = computeTotalXP({});
      assert.equal(xp, 0);
      assert.equal(computeKnowledgeLevel(xp), 1);
      assert.equal(getLevelTitle(1), "Novice Engineer");
    });

    it("should calculate correct XP across mixed activities", () => {
      const xp = computeTotalXP({
        completedExperiments: ["exp-1", "exp-2"],     // 2 * 150 = 300
        completedProjects: ["proj-1"],                 // 1 * 300 = 300
        completedLessons: ["lesson-1", "lesson-2"],    // 2 * 100 = 200
        watchedVideos: ["vid-1", "vid-2", "vid-3"],    // 3 * 50  = 150
        quizResults: [{ score: 5 }, { score: 4 }]      // 9 * 40  = 360
      });
      // 300 + 300 + 200 + 150 + 360 = 1310
      assert.equal(xp, 1310);
      // Math.floor(1310 / 500) + 1 = 2 + 1 = 3
      assert.equal(computeKnowledgeLevel(xp), 3);
      assert.equal(getLevelTitle(3), "Lab Specialist");
    });

    it("should level up to Level 2 at exactly 500 XP", () => {
      const xp = 500;
      assert.equal(computeKnowledgeLevel(xp), 2);
      assert.equal(getLevelTitle(2), "Circuit Builder");
    });

    it("should level up to Level 4 at 1500 XP", () => {
      const xp = 1500;
      assert.equal(computeKnowledgeLevel(xp), 4);
      assert.equal(getLevelTitle(4), "Systems Architect");
    });
  });
});
