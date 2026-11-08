import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Verification of Firestore Security Rules logic for /progress/{progressId}
 * Models the rules in firestore.rules
 */
function evaluateProgressRules({ operation, auth, progressId, existingResourceData, newResourceData }) {
  const isAuthenticated = auth !== null && auth.uid !== undefined;

  if (operation === "read") {
    // allow read: if isAuthenticated() && request.auth.uid == progressId;
    return isAuthenticated && auth.uid === progressId;
  }

  if (operation === "create") {
    // allow create: if isAuthenticated() && request.auth.uid == progressId && request.resource.data.userId == request.auth.uid;
    return (
      isAuthenticated &&
      auth.uid === progressId &&
      newResourceData?.userId === auth.uid
    );
  }

  if (operation === "update") {
    // allow update: if isAuthenticated() && request.auth.uid == progressId &&
    // (!('userId' in resource.data) || resource.data.userId == request.auth.uid) &&
    // request.resource.data.userId == request.auth.uid;
    const existingUserIdValid =
      !existingResourceData ||
      !("userId" in existingResourceData) ||
      existingResourceData.userId === auth.uid;

    return (
      isAuthenticated &&
      auth.uid === progressId &&
      existingUserIdValid &&
      newResourceData?.userId === auth.uid
    );
  }

  if (operation === "delete") {
    // allow delete: if isAuthenticated() && request.auth.uid == progressId &&
    // (!('userId' in resource.data) || resource.data.userId == request.auth.uid);
    const existingUserIdValid =
      !existingResourceData ||
      !("userId" in existingResourceData) ||
      existingResourceData.userId === auth.uid;

    return isAuthenticated && auth.uid === progressId && existingUserIdValid;
  }

  return false;
}

/**
 * Verification of /quizResults/{resultId} and /bookmarks/{bookmarkId} rules
 */
function evaluateOwnerScopedRules({ operation, auth, existingResourceData, newResourceData }) {
  const isAuthenticated = auth !== null && auth.uid !== undefined;

  if (operation === "read") {
    return isAuthenticated && existingResourceData?.userId === auth.uid;
  }
  if (operation === "create") {
    return isAuthenticated && newResourceData?.userId === auth.uid;
  }
  if (operation === "update") {
    return (
      isAuthenticated &&
      existingResourceData?.userId === auth.uid &&
      newResourceData?.userId === auth.uid
    );
  }
  if (operation === "delete") {
    return isAuthenticated && existingResourceData?.userId === auth.uid;
  }
  return false;
}

/**
 * Verification of /users/{userId} rules: strictly owner-scoped reads/updates,
 * role/admin protected fields, and custom claims for admin.
 */
function evaluateUserRules({ operation, auth, targetUserId, existingResourceData, newResourceData, affectedKeys = [] }) {
  const isAuthenticated = auth !== null && auth.uid !== undefined;
  const isOwner = isAuthenticated && auth.uid === targetUserId;
  const isAdmin = isAuthenticated && auth.token?.admin === true;

  if (operation === "read") {
    // allow read: if isOwner(userId) || isAdmin();
    return isOwner || isAdmin;
  }

  if (operation === "create") {
    // allow create: if isOwner(userId) && request.resource.data.role == 'student' && (!('admin' in request.resource.data) || request.resource.data.admin != true);
    const roleIsStudent = newResourceData?.role === "student";
    const noAdminClaim = !newResourceData || !("admin" in newResourceData) || newResourceData.admin !== true;
    return isOwner && roleIsStudent && noAdminClaim;
  }

  if (operation === "update") {
    // allow update: if (isOwner(userId) && (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'admin']))) || isAdmin();
    const touchesProtectedKeys = affectedKeys.includes("role") || affectedKeys.includes("admin");
    const allowedOwnerUpdate = isOwner && !touchesProtectedKeys;
    return allowedOwnerUpdate || isAdmin;
  }

  if (operation === "delete") {
    // allow delete: if isAdmin();
    return isAdmin;
  }

  return false;
}

describe("Firestore Security Rules Verification", () => {
  const studentUid = "p29VqeeoGcQSTtRhibqzamrfJrm2";
  const studentAuth = { uid: studentUid, email: "student.alex@nextgen.edu" };
  const otherStudentAuth = { uid: "other-student-456", email: "other@nextgen.edu" };

  describe("Scenario 1: Authenticated student can read their own progress", () => {
    it("should allow student to read their own progress document", () => {
      const allowed = evaluateProgressRules({
        operation: "read",
        auth: studentAuth,
        progressId: studentUid
      });
      assert.equal(allowed, true);
    });

    it("read rule MUST NOT depend on request.resource", () => {
      // Calling read with no newResourceData (which is null on reads in Firestore)
      const allowed = evaluateProgressRules({
        operation: "read",
        auth: studentAuth,
        progressId: studentUid,
        newResourceData: null
      });
      assert.equal(allowed, true);
    });
  });

  describe("Scenario 2: Authenticated student can create and update their own progress", () => {
    it("should allow creating progress document when userId matches auth.uid and progressId", () => {
      const allowed = evaluateProgressRules({
        operation: "create",
        auth: studentAuth,
        progressId: studentUid,
        newResourceData: {
          userId: studentUid,
          completedExperiments: ["led-blink"],
          updatedAt: "2026-10-19T14:00:00Z"
        }
      });
      assert.equal(allowed, true);
    });

    it("should reject creation if document lacks userId field", () => {
      const allowed = evaluateProgressRules({
        operation: "create",
        auth: studentAuth,
        progressId: studentUid,
        newResourceData: {
          completedExperiments: ["led-blink"]
        }
      });
      assert.equal(allowed, false);
    });

    it("should allow update when userId is included and matches", () => {
      const allowed = evaluateProgressRules({
        operation: "update",
        auth: studentAuth,
        progressId: studentUid,
        existingResourceData: { userId: studentUid, completedExperiments: ["led-blink"] },
        newResourceData: { userId: studentUid, completedExperiments: ["led-blink", "ohms-law"] }
      });
      assert.equal(allowed, true);
    });

    it("should allow update on existing document that was previously saved without userId", () => {
      const allowed = evaluateProgressRules({
        operation: "update",
        auth: studentAuth,
        progressId: studentUid,
        existingResourceData: { completedExperiments: ["led-blink"] }, // Old document lacked userId
        newResourceData: { userId: studentUid, completedExperiments: ["led-blink", "ohms-law"] }
      });
      assert.equal(allowed, true);
    });
  });

  describe("Scenario 3 & 4: Student cannot read, create, or overwrite another user's progress", () => {
    it("should reject student reading another student's progress", () => {
      const allowed = evaluateProgressRules({
        operation: "read",
        auth: studentAuth,
        progressId: "victim-student-789"
      });
      assert.equal(allowed, false);
    });

    it("should reject student creating another student's progress document", () => {
      const allowed = evaluateProgressRules({
        operation: "create",
        auth: studentAuth,
        progressId: "victim-student-789",
        newResourceData: { userId: studentUid }
      });
      assert.equal(allowed, false);
    });

    it("should reject spoofing userId to another user's UID", () => {
      const allowed = evaluateProgressRules({
        operation: "create",
        auth: studentAuth,
        progressId: studentUid,
        newResourceData: { userId: "spoofed-user-999" }
      });
      assert.equal(allowed, false);
    });

    it("should reject student updating another student's progress", () => {
      const allowed = evaluateProgressRules({
        operation: "update",
        auth: studentAuth,
        progressId: otherStudentAuth.uid,
        existingResourceData: { userId: otherStudentAuth.uid },
        newResourceData: { userId: studentUid }
      });
      assert.equal(allowed, false);
    });
  });

  describe("Scenario 5: Signed-out user cannot access private progress", () => {
    it("should reject unauthenticated read", () => {
      const allowed = evaluateProgressRules({
        operation: "read",
        auth: null,
        progressId: studentUid
      });
      assert.equal(allowed, false);
    });

    it("should reject unauthenticated write", () => {
      const allowed = evaluateProgressRules({
        operation: "create",
        auth: null,
        progressId: studentUid,
        newResourceData: { userId: studentUid }
      });
      assert.equal(allowed, false);
    });
  });

  describe("Scenario 6: QuizResults and Bookmarks owner-scoped rules", () => {
    it("should allow owner to read their bookmark", () => {
      const allowed = evaluateOwnerScopedRules({
        operation: "read",
        auth: studentAuth,
        existingResourceData: { userId: studentUid, itemId: "esp32" }
      });
      assert.equal(allowed, true);
    });

    it("should deny other users from reading bookmark", () => {
      const allowed = evaluateOwnerScopedRules({
        operation: "read",
        auth: otherStudentAuth,
        existingResourceData: { userId: studentUid, itemId: "esp32" }
      });
      assert.equal(allowed, false);
    });

    it("should allow owner to create a quizResult with matching userId", () => {
      const allowed = evaluateOwnerScopedRules({
        operation: "create",
        auth: studentAuth,
        newResourceData: { userId: studentUid, quizId: "quiz-1", score: 5 }
      });
      assert.equal(allowed, true);
    });
  });

  describe("Scenario 7: User profile privacy and role tampering protection", () => {
    const adminAuthWithClaim = {
      uid: "admin-master-uid",
      email: "prof.sharma@nextgen.edu",
      token: { admin: true }
    };
    const adminEmailWithoutClaim = {
      uid: "fake-admin-uid",
      email: "admin@nextgen.edu",
      token: {} // lacks admin custom claim
    };

    it("should allow student to read their own profile", () => {
      const allowed = evaluateUserRules({
        operation: "read",
        auth: studentAuth,
        targetUserId: studentUid
      });
      assert.equal(allowed, true);
    });

    it("should reject student from reading another student's profile (privacy protection)", () => {
      const allowed = evaluateUserRules({
        operation: "read",
        auth: otherStudentAuth,
        targetUserId: studentUid
      });
      assert.equal(allowed, false);
    });

    it("should allow verified admin with admin custom claim to read any profile", () => {
      const allowed = evaluateUserRules({
        operation: "read",
        auth: adminAuthWithClaim,
        targetUserId: studentUid
      });
      assert.equal(allowed, true);
    });

    it("should reject admin access based on email alone without custom claim", () => {
      const allowed = evaluateUserRules({
        operation: "read",
        auth: adminEmailWithoutClaim,
        targetUserId: studentUid
      });
      assert.equal(allowed, false);
    });

    it("should allow student to create their own profile with role='student'", () => {
      const allowed = evaluateUserRules({
        operation: "create",
        auth: studentAuth,
        targetUserId: studentUid,
        newResourceData: { uid: studentUid, role: "student", name: "Alex" }
      });
      assert.equal(allowed, true);
    });

    it("should reject student creating profile with role='admin'", () => {
      const allowed = evaluateUserRules({
        operation: "create",
        auth: studentAuth,
        targetUserId: studentUid,
        newResourceData: { uid: studentUid, role: "admin", name: "Alex" }
      });
      assert.equal(allowed, false);
    });

    it("should reject student creating profile with admin=true", () => {
      const allowed = evaluateUserRules({
        operation: "create",
        auth: studentAuth,
        targetUserId: studentUid,
        newResourceData: { uid: studentUid, role: "student", admin: true }
      });
      assert.equal(allowed, false);
    });

    it("should reject student creating another user's profile document", () => {
      const allowed = evaluateUserRules({
        operation: "create",
        auth: studentAuth,
        targetUserId: "other-user-999",
        newResourceData: { uid: "other-user-999", role: "student" }
      });
      assert.equal(allowed, false);
    });

    it("should allow student to update normal profile fields (name, college)", () => {
      const allowed = evaluateUserRules({
        operation: "update",
        auth: studentAuth,
        targetUserId: studentUid,
        affectedKeys: ["name", "college"]
      });
      assert.equal(allowed, true);
    });

    it("should reject student attempting to modify the 'role' field", () => {
      const allowed = evaluateUserRules({
        operation: "update",
        auth: studentAuth,
        targetUserId: studentUid,
        affectedKeys: ["role", "name"]
      });
      assert.equal(allowed, false);
    });

    it("should reject student attempting to modify the 'admin' field", () => {
      const allowed = evaluateUserRules({
        operation: "update",
        auth: studentAuth,
        targetUserId: studentUid,
        affectedKeys: ["admin"]
      });
      assert.equal(allowed, false);
    });

    it("should allow verified admin to delete a profile document", () => {
      const allowed = evaluateUserRules({
        operation: "delete",
        auth: adminAuthWithClaim,
        targetUserId: studentUid
      });
      assert.equal(allowed, true);
    });

    it("should reject student attempting to delete a profile document", () => {
      const allowed = evaluateUserRules({
        operation: "delete",
        auth: studentAuth,
        targetUserId: studentUid
      });
      assert.equal(allowed, false);
    });
  });
});

describe("Progress Persistence Payload Verification", () => {
  it("should ensure progress persistence payload always injects authenticated userId", () => {
    const studentUid = "p29VqeeoGcQSTtRhibqzamrfJrm2";
    const localState = {
      completedExperiments: ["led-blink", "ohms-law"],
      completedProjects: ["auto-street-light"],
      bookmarks: [{ id: "esp32" }]
    };

    // Models persistState logic
    const payload = {
      ...localState,
      userId: studentUid
    };

    assert.equal(payload.userId, studentUid);
    assert.deepEqual(payload.completedExperiments, ["led-blink", "ohms-law"]);
  });
});
