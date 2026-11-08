"use strict";

const {invalidArgument} = require("../utils/errors");

const VALID_CATEGORIES = new Set([
  "PASSIVE",
  "SEMICONDUCTORS",
  "ICS",
  "SENSORS",
  "BOARDS",
  "MODULES",
  "ELECTROMECHANICAL",
  "POWER",
]);

const VALID_DIFFICULTIES = new Set(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);

const VALID_COLLECTIONS = new Set([
  "components",
  "experiments",
  "projects",
  "videos",
  "quizzes",
  "lessons",
  "resources",
  "experts",
]);

/**
 * Validates slug ID format (lowercase alphanumeric and hyphens).
 * @param {string} id - Identifier to validate.
 * @return {boolean}
 */
function isValidSlug(id) {
  return typeof id === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id.trim());
}

/**
 * Validates component payload.
 * @param {object} data - Component document.
 */
function validateComponent(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument(
        "Component id must be a valid lowercase slug (e.g. 'esp32-wroom').",
    );
  }
  if (!data.name || typeof data.name !== "string" || data.name.length > 120) {
    throw invalidArgument("Component name is required (max 120 chars).");
  }
  const categoryUpper = (data.category || "").toUpperCase();
  if (!VALID_CATEGORIES.has(categoryUpper)) {
    throw invalidArgument(
        `Invalid category. Must be one of: ${[...VALID_CATEGORIES].join(", ")}`,
    );
  }
  if (!data.shortDesc || typeof data.shortDesc !== "string") {
    throw invalidArgument("Component shortDesc is required string.");
  }
  if (!data.purpose || typeof data.purpose !== "string") {
    throw invalidArgument("Component purpose is required string.");
  }
  if (!data.workingPrinciple || typeof data.workingPrinciple !== "string") {
    throw invalidArgument("Component workingPrinciple is required string.");
  }
  if (data.pinout && !Array.isArray(data.pinout)) {
    throw invalidArgument("Component pinout must be an array of pin objects.");
  }
  if (data.tags && !Array.isArray(data.tags)) {
    throw invalidArgument("Component tags must be an array of strings.");
  }
}

/**
 * Validates experiment payload.
 * @param {object} data - Experiment document.
 */
function validateExperiment(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument("Experiment id must be a valid lowercase slug.");
  }
  if (!data.title || typeof data.title !== "string" ||
      data.title.length > 150) {
    throw invalidArgument("Experiment title is required (max 150 chars).");
  }
  if (!VALID_DIFFICULTIES.has((data.difficulty || "").toUpperCase())) {
    throw invalidArgument(
        "Difficulty must be BEGINNER, INTERMEDIATE, or ADVANCED.",
    );
  }
  if (!data.objective || typeof data.objective !== "string") {
    throw invalidArgument("Experiment objective is required string.");
  }
  if (!data.theory || typeof data.theory !== "string") {
    throw invalidArgument("Experiment theory is required string.");
  }
  if (!Array.isArray(data.requiredComponents) ||
      data.requiredComponents.length === 0) {
    throw invalidArgument(
        "Experiment requiredComponents must be non-empty array.",
    );
  }
  if (!Array.isArray(data.procedure) || data.procedure.length === 0) {
    throw invalidArgument("Experiment procedure must be non-empty array.");
  }
}

/**
 * Validates project payload.
 * @param {object} data - Project document.
 */
function validateProject(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument("Project id must be a valid lowercase slug.");
  }
  if (!data.title || typeof data.title !== "string" ||
      data.title.length > 150) {
    throw invalidArgument("Project title is required (max 150 chars).");
  }
  if (!VALID_DIFFICULTIES.has((data.difficulty || "").toUpperCase())) {
    throw invalidArgument(
        "Difficulty must be BEGINNER, INTERMEDIATE, or ADVANCED.",
    );
  }
  if (!data.problemStatement || typeof data.problemStatement !== "string") {
    throw invalidArgument("Project problemStatement is required string.");
  }
  if (!data.objective || typeof data.objective !== "string") {
    throw invalidArgument("Project objective is required string.");
  }
  if (!Array.isArray(data.componentsList) || data.componentsList.length === 0) {
    throw invalidArgument("Project componentsList must be non-empty array.");
  }
  if (!Array.isArray(data.procedure) || data.procedure.length === 0) {
    throw invalidArgument("Project procedure must be non-empty array.");
  }
}

/**
 * Validates video payload.
 * @param {object} data - Video document.
 */
function validateVideo(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument("Video id must be a valid lowercase slug.");
  }
  if (!data.title || typeof data.title !== "string" ||
      data.title.length > 150) {
    throw invalidArgument("Video title is required (max 150 chars).");
  }
  if (!data.youtubeId || typeof data.youtubeId !== "string") {
    throw invalidArgument("Video youtubeId is required string.");
  }
  if (!data.duration || typeof data.duration !== "string") {
    throw invalidArgument("Video duration is required string.");
  }
}

/**
 * Validates quiz structure (questions, options, correct index).
 * Note: Grading logic is kept in Phase 4.
 * @param {object} data - Quiz document.
 */
function validateQuiz(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument("Quiz id must be a valid lowercase slug.");
  }
  if (!data.title || typeof data.title !== "string" ||
      data.title.length > 150) {
    throw invalidArgument("Quiz title is required (max 150 chars).");
  }
  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    throw invalidArgument("Quiz must contain at least one question.");
  }

  data.questions.forEach((q, idx) => {
    if (!q.id || !q.question || !Array.isArray(q.options)) {
      throw invalidArgument(
          `Question at index ${idx} is missing required fields.`,
      );
    }
    if (q.options.length < 2) {
      throw invalidArgument(`Question at index ${idx} must have >= 2 options.`);
    }
    if (typeof q.correctIndex !== "number" ||
        q.correctIndex < 0 ||
        q.correctIndex >= q.options.length) {
      throw invalidArgument(
          `Question at index ${idx} has invalid correctIndex.`,
      );
    }
  });
}

/**
 * Validates learning topic / lesson payload.
 * @param {object} data - Lesson document.
 */
function validateLesson(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument("Lesson id must be a valid lowercase slug.");
  }
  if (!data.title || typeof data.title !== "string" ||
      data.title.length > 150) {
    throw invalidArgument("Lesson title is required (max 150 chars).");
  }
  if (!Array.isArray(data.sections) || data.sections.length === 0) {
    throw invalidArgument("Lesson sections must be a non-empty array.");
  }
  data.sections.forEach((s, idx) => {
    if (!s.heading || !s.content) {
      throw invalidArgument(
          `Section at index ${idx} requires heading & content.`,
      );
    }
  });
}

/**
 * Validates downloadable resource payload.
 * @param {object} data - Resource document.
 */
function validateResource(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument("Resource id must be a valid lowercase slug.");
  }
  if (!data.title || typeof data.title !== "string" ||
      data.title.length > 150) {
    throw invalidArgument("Resource title is required (max 150 chars).");
  }
  if (!data.downloadUrl || typeof data.downloadUrl !== "string") {
    throw invalidArgument("Resource downloadUrl is required string.");
  }
}

/**
 * Validates expert advisor payload.
 * @param {object} data - Expert document.
 */
function validateExpert(data) {
  if (!isValidSlug(data.id)) {
    throw invalidArgument("Expert id must be a valid lowercase slug.");
  }
  if (!data.name || typeof data.name !== "string" || data.name.length > 100) {
    throw invalidArgument("Expert name is required (max 100 chars).");
  }
  if (!data.role || typeof data.role !== "string") {
    throw invalidArgument("Expert role is required string.");
  }
  if (!data.organization || typeof data.organization !== "string") {
    throw invalidArgument("Expert organization is required string.");
  }
}

/**
 * Generic dispatcher for validating content by collection name.
 * @param {string} collectionName - Target Firestore collection.
 * @param {object} data - Content document payload.
 */
function validateContent(collectionName, data) {
  if (!VALID_COLLECTIONS.has(collectionName)) {
    throw invalidArgument(
        `Unsupported collection '${collectionName}'. ` +
        `Must be one of: ${[...VALID_COLLECTIONS].join(", ")}`,
    );
  }
  if (!data || typeof data !== "object") {
    throw invalidArgument("Content payload must be a non-null object.");
  }

  switch (collectionName) {
    case "components":
      validateComponent(data);
      break;
    case "experiments":
      validateExperiment(data);
      break;
    case "projects":
      validateProject(data);
      break;
    case "videos":
      validateVideo(data);
      break;
    case "quizzes":
      validateQuiz(data);
      break;
    case "lessons":
      validateLesson(data);
      break;
    case "resources":
      validateResource(data);
      break;
    case "experts":
      validateExpert(data);
      break;
  }
}

module.exports = {
  isValidSlug,
  validateComponent,
  validateExperiment,
  validateProject,
  validateVideo,
  validateQuiz,
  validateLesson,
  validateResource,
  validateExpert,
  validateContent,
  VALID_COLLECTIONS,
};
