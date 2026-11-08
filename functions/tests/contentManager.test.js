"use strict";

const {describe, it} = require("node:test");
const assert = require("node:assert/strict");

const {
  saveEducationalContent,
  deleteEducationalContent,
} = require("../src/modules/content/contentManager");

describe("Phase 3: Educational Content Authorization Boundaries", () => {
  const studentCaller = {
    auth: {
      uid: "student-alex",
      token: {email: "student.alex@nextgen.edu"},
    },
    data: {
      collectionName: "components",
      data: {id: "resistor", name: "Tampered"},
    },
  };

  const unauthenticatedCaller = {
    auth: null,
    data: {
      collectionName: "components",
      data: {id: "resistor", name: "Tampered"},
    },
  };

  it("should reject unauthenticated caller from saving content", async () => {
    await assert.rejects(
        () => saveEducationalContent(unauthenticatedCaller),
        {code: "unauthenticated"},
    );
  });

  it("should reject student caller from saving content", async () => {
    await assert.rejects(
        () => saveEducationalContent(studentCaller),
        {code: "permission-denied"},
    );
  });

  it("should reject unauthenticated caller from deleting content", async () => {
    await assert.rejects(
        () => deleteEducationalContent(unauthenticatedCaller),
        {code: "unauthenticated"},
    );
  });

  it("should reject student caller from deleting content", async () => {
    await assert.rejects(
        () => deleteEducationalContent(studentCaller),
        {code: "permission-denied"},
    );
  });

  it("should reject save request missing collectionName or data", async () => {
    const adminCallerMissingData = {
      auth: {
        uid: "admin-master",
        token: {admin: true},
      },
      data: {collectionName: "components"},
    };

    await assert.rejects(
        () => saveEducationalContent(adminCallerMissingData),
        {code: "invalid-argument"},
    );
  });

  it("should reject deletion for invalid slug ID", async () => {
    const adminCallerInvalidSlug = {
      auth: {
        uid: "admin-master",
        token: {admin: true},
      },
      data: {collectionName: "components", id: "BAD ID WITH SPACES!"},
    };

    await assert.rejects(
        () => deleteEducationalContent(adminCallerInvalidSlug),
        {code: "invalid-argument"},
    );
  });
});

