"use strict";

const {describe, it, beforeEach} = require("node:test");
const assert = require("node:assert/strict");

const {admin, db, auth, storage} = require("../src/config/firebase");
const {
  unauthenticated,
  permissionDenied,
  notFound,
  invalidArgument,
  rateLimited,
  internal,
} = require("../src/utils/errors");
const secureLogger = require("../src/utils/logger");
const {
  requireAuth,
  requireAdmin,
  extractUser,
} = require("../src/middleware/auth");
const {
  checkRateLimit,
  resetRateLimits,
} = require("../src/middleware/rateLimiter");

describe("Phase 1: Backend Foundation Tests", () => {
  describe("Firebase Admin Initialization", () => {
    it("should initialize Firebase Admin singleton without error", () => {
      assert.ok(admin);
      assert.ok(admin.apps.length > 0);
    });

    it("should provide instances of firestore, auth, and storage", () => {
      assert.ok(db);
      assert.ok(auth);
      assert.ok(storage);
    });
  });

  describe("Standardized Error Factories", () => {
    it("should create unauthenticated HttpsError with correct code", () => {
      const err = unauthenticated("Sign in required");
      assert.equal(err.code, "unauthenticated");
      assert.equal(err.message, "Sign in required");
    });

    it("should create permission-denied HttpsError with correct code", () => {
      const err = permissionDenied("Admins only");
      assert.equal(err.code, "permission-denied");
      assert.equal(err.message, "Admins only");
    });

    it("should create not-found HttpsError", () => {
      const err = notFound("Component not found");
      assert.equal(err.code, "not-found");
    });

    it("should create invalid-argument HttpsError with details", () => {
      const err = invalidArgument("Bad field", {field: "email"});
      assert.equal(err.code, "invalid-argument");
      assert.deepEqual(err.details, {field: "email"});
    });

    it("should create resource-exhausted HttpsError for rate limits", () => {
      const err = rateLimited();
      assert.equal(err.code, "resource-exhausted");
    });

    it("should create internal HttpsError", () => {
      const err = internal();
      assert.equal(err.code, "internal");
    });
  });

  describe("Secure Logger Sanitization", () => {
    it("should redact sensitive fields recursively", () => {
      const raw = {
        username: "student1",
        password: "SuperSecretPassword123!",
        meta: {
          token: "eyJhbGciOi...",
          apiKey: "AIzaSy...",
          normalData: 42,
        },
      };

      const cleaned = secureLogger.sanitize(raw);

      assert.equal(cleaned.username, "student1");
      assert.equal(cleaned.password, "[REDACTED]");
      assert.equal(cleaned.meta.token, "[REDACTED]");
      assert.equal(cleaned.meta.apiKey, "[REDACTED]");
      assert.equal(cleaned.meta.normalData, 42);
    });

    it("should handle null and primitive inputs cleanly", () => {
      assert.equal(secureLogger.sanitize(null), null);
      assert.equal(secureLogger.sanitize("string"), "string");
      assert.equal(secureLogger.sanitize(123), 123);
    });
  });

  describe("Authentication Middleware", () => {
    it("should accept valid authenticated student caller", () => {
      const mockReq = {
        auth: {
          uid: "student-123",
          token: {email: "student@nextgen.edu", role: "student"},
        },
      };

      const user = requireAuth(mockReq);
      assert.equal(user.uid, "student-123");
    });

    it("should reject unauthenticated request", () => {
      const mockReq = {auth: null};
      assert.throws(() => requireAuth(mockReq), {
        code: "unauthenticated",
      });
    });

    it("should reject student callers from admin-only operations", () => {
      const mockReq = {
        auth: {
          uid: "student-456",
          token: {email: "alex@nextgen.edu", role: "student"},
        },
      };

      assert.throws(() => requireAdmin(mockReq), {
        code: "permission-denied",
      });
    });

    it("should allow verified admin with admin custom claim", () => {
      const mockReq = {
        auth: {
          uid: "admin-789",
          token: {email: "prof.sharma@nextgen.edu", admin: true},
        },
      };

      const adminUser = requireAdmin(mockReq);
      assert.equal(adminUser.uid, "admin-789");
    });

    it("should allow verified admin with admin email", () => {
      const mockReq = {
        auth: {
          uid: "admin-001",
          token: {email: "admin@nextgen.edu"},
        },
      };

      const adminUser = requireAdmin(mockReq);
      assert.equal(adminUser.uid, "admin-001");
    });

    it("extractUser should return null for unauthenticated requests", () => {
      assert.equal(extractUser({auth: null}), null);
    });
  });

  describe("Rate Limiting Middleware", () => {
    beforeEach(() => {
      resetRateLimits();
    });

    it("should allow requests within threshold", () => {
      assert.doesNotThrow(() => {
        checkRateLimit("test-user-1", 5, 1000);
        checkRateLimit("test-user-1", 5, 1000);
        checkRateLimit("test-user-1", 5, 1000);
      });
    });

    it("should reject requests exceeding threshold", () => {
      checkRateLimit("test-user-2", 2, 1000);
      checkRateLimit("test-user-2", 2, 1000);

      assert.throws(() => checkRateLimit("test-user-2", 2, 1000), {
        code: "resource-exhausted",
      });
    });

    it("resetRateLimits should clear window records", () => {
      checkRateLimit("test-user-3", 1, 1000);
      assert.throws(() => checkRateLimit("test-user-3", 1, 1000));

      resetRateLimits();
      assert.doesNotThrow(() => checkRateLimit("test-user-3", 1, 1000));
    });
  });
});
