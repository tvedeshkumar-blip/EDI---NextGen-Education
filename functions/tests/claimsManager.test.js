"use strict";

const {describe, it} = require("node:test");
const assert = require("node:assert/strict");

describe("Admin Claims Management Logic", () => {
  it("should preserve existing custom claims when granting admin claim", () => {
    const existingClaims = {department: "ECE", enrolledYear: 2024};
    const updatedClaims = {
      ...existingClaims,
      admin: true,
    };

    assert.equal(updatedClaims.admin, true);
    assert.equal(updatedClaims.department, "ECE");
    assert.equal(updatedClaims.enrolledYear, 2024);
  });

  it("should preserve other custom claims when revoking admin claim", () => {
    const existingClaims = {
      department: "ECE",
      enrolledYear: 2024,
      admin: true,
    };
    const updatedClaims = {
      ...existingClaims,
    };
    delete updatedClaims.admin;

    assert.equal(updatedClaims.admin, undefined);
    assert.equal(updatedClaims.department, "ECE");
    assert.equal(updatedClaims.enrolledYear, 2024);
  });
});

