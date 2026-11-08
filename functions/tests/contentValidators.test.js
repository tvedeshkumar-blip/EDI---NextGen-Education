"use strict";

const {describe, it} = require("node:test");
const assert = require("node:assert/strict");

const {
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
} = require("../src/validators/contentValidators");

describe("Phase 3: Educational Content Validators", () => {
  describe("Slug ID Validation", () => {
    it("should accept valid lowercase hyphenated slugs", () => {
      assert.equal(isValidSlug("esp32-wroom"), true);
      assert.equal(isValidSlug("led-blink"), true);
      assert.equal(isValidSlug("ohms-law-101"), true);
    });

    it("should reject invalid slugs (uppercase, spaces, special chars)", () => {
      assert.equal(isValidSlug("ESP32_WROOM"), false);
      assert.equal(isValidSlug("esp32 wroom"), false);
      assert.equal(isValidSlug("esp32@v1!"), false);
      assert.equal(isValidSlug(""), false);
      assert.equal(isValidSlug(null), false);
    });
  });

  describe("Component Validation", () => {
    const validComponent = {
      id: "bc547-transistor",
      name: "BC547 NPN BJT Transistor",
      category: "SEMICONDUCTORS",
      shortDesc: "General purpose NPN silicon bipolar junction transistor.",
      purpose: "Small signal amplification and fast switching.",
      workingPrinciple: "Base current regulates larger collector-emitter flow.",
      pinout: [{pin: "1", name: "Collector", desc: "Current entry"}],
      tags: ["transistor", "semiconductor"],
    };

    it("should accept valid component payload", () => {
      assert.doesNotThrow(() => validateComponent(validComponent));
    });

    it("should reject component with invalid category", () => {
      assert.throws(
          () => validateComponent({...validComponent, category: "UNSUPPORTED"}),
          {code: "invalid-argument"},
      );
    });

    it("should reject component with missing purpose", () => {
      const invalid = {...validComponent};
      delete invalid.purpose;
      assert.throws(() => validateComponent(invalid), {
        code: "invalid-argument",
      });
    });
  });

  describe("Experiment Validation", () => {
    const validExperiment = {
      id: "led-blink-test",
      title: "LED Flashing Verification",
      category: "DIGITAL",
      difficulty: "BEGINNER",
      estimatedTime: "20 Mins",
      objective: "Verify GPIO output high/low states.",
      theory: "Diode emits photons when forward biased.",
      requiredComponents: [{name: "LED", qty: "1"}],
      procedure: ["Insert LED", "Power breadboard"],
    };

    it("should accept valid experiment payload", () => {
      assert.doesNotThrow(() => validateExperiment(validExperiment));
    });

    it("should reject invalid difficulty", () => {
      assert.throws(
          () => validateExperiment({...validExperiment, difficulty: "EXPERT"}),
          {code: "invalid-argument"},
      );
    });

    it("should reject empty requiredComponents array", () => {
      assert.throws(
          () => validateExperiment({
            ...validExperiment,
            requiredComponents: [],
          }),
          {code: "invalid-argument"},
      );
    });
  });

  describe("Project Validation", () => {
    const validProject = {
      id: "auto-street-light-test",
      title: "Light-Activated Street Lamp",
      category: "AUTOMATION",
      difficulty: "BEGINNER",
      estimatedCost: "₹250",
      estimatedTime: "2 Hours",
      problemStatement: "Municipal lamps waste electricity during daylight.",
      objective: "Automate lamp activation using optical feedback.",
      description: "Uses LDR voltage divider driving BJT switch.",
      componentsList: [{name: "LDR", qty: "1", role: "Sensor"}],
      procedure: ["Mount LDR", "Wire base of transistor"],
    };

    it("should accept valid project payload", () => {
      assert.doesNotThrow(() => validateProject(validProject));
    });

    it("should reject project missing problemStatement", () => {
      const invalid = {...validProject};
      delete invalid.problemStatement;
      assert.throws(() => validateProject(invalid), {
        code: "invalid-argument",
      });
    });
  });

  describe("Video Validation", () => {
    const validVideo = {
      id: "vid-ohms-law-test",
      title: "Understanding Ohm's Law and Circuit Analysis",
      subject: "Circuit Fundamentals",
      category: "THEORY",
      duration: "14:22",
      youtubeId: "dQw4w9WgXcQ",
      description: "Step-by-step visual proof of Ohm's Law.",
    };

    it("should accept valid video payload", () => {
      assert.doesNotThrow(() => validateVideo(validVideo));
    });

    it("should reject video missing youtubeId", () => {
      const invalid = {...validVideo};
      delete invalid.youtubeId;
      assert.throws(() => validateVideo(invalid), {code: "invalid-argument"});
    });
  });

  describe("Quiz Validation", () => {
    const validQuiz = {
      id: "quiz-ohms-law-test",
      title: "Ohm's Law Assessment",
      category: "FUNDAMENTALS",
      difficulty: "BEGINNER",
      timeLimitMin: 10,
      description: "Quick 5 question check on electrical fundamentals.",
      questions: [
        {
          id: "q1",
          question: "V = I * R represents?",
          type: "mcq",
          options: ["Ohm's Law", "Faraday's Law"],
          correctIndex: 0,
        },
      ],
    };

    it("should accept valid quiz payload", () => {
      assert.doesNotThrow(() => validateQuiz(validQuiz));
    });

    it("should reject question with out-of-range correctIndex", () => {
      const invalid = {
        ...validQuiz,
        questions: [{...validQuiz.questions[0], correctIndex: 5}],
      };
      assert.throws(() => validateQuiz(invalid), {code: "invalid-argument"});
    });

    it("should reject quiz with empty questions array", () => {
      assert.throws(
          () => validateQuiz({...validQuiz, questions: []}),
          {code: "invalid-argument"},
      );
    });
  });

  describe("Lesson, Resource, Expert, and Dispatcher Validation", () => {
    it("should accept valid lesson payload", () => {
      const lesson = {
        id: "lesson-bjt-test",
        title: "Bipolar Junction Transistors",
        category: "ELECTRONICS",
        readTime: "15 mins",
        description: "Comprehensive guide to NPN and PNP operation.",
        sections: [
          {heading: "BJT Operation", content: "Active and Saturation"},
        ],
      };
      assert.doesNotThrow(() => validateLesson(lesson));
    });

    it("should accept valid resource payload", () => {
      const resource = {
        id: "res-esp32-pinout",
        title: "ESP32 Pinout Cheat Sheet",
        category: "REFERENCE",
        type: "CHEAT_SHEET",
        format: "PDF",
        description: "Quick reference card for GPIO strapping pins.",
        downloadUrl: "https://example.com/esp32.pdf",
      };
      assert.doesNotThrow(() => validateResource(resource));
    });

    it("should accept valid expert payload", () => {
      const expert = {
        id: "exp-dr-kulkarni",
        name: "Dr. R. Kulkarni",
        role: "Professor & Head of ECE",
        organization: "Government Engineering College",
        specialization: "VLSI and Embedded Systems",
        bio: "25+ years teaching digital design.",
      };
      assert.doesNotThrow(() => validateExpert(expert));
    });

    it("dispatcher should reject unsupported collection", () => {
      assert.throws(
          () => validateContent("maliciousCollection", {id: "test"}),
          {code: "invalid-argument"},
      );
    });
  });
});
