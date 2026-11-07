import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Authentication Guard logic under test
 * Matches the logic in src/components/auth/ProtectedRoute.jsx
 */
function evaluateProtectedRoute({ currentUser, loading }) {
  if (loading) return { status: "loading" };
  if (!currentUser) return { status: "redirect", target: "/login" };
  return { status: "allow" };
}

function evaluateAdminRoute({ currentUser, userProfile, loading }) {
  if (loading) return { status: "loading" };
  if (!currentUser) return { status: "redirect", target: "/login" };
  if (userProfile?.role !== "admin") return { status: "redirect", target: "/dashboard" };
  return { status: "allow" };
}

describe("Authentication Guards", () => {
  it("should show loading while auth is initializing", () => {
    const state = { currentUser: null, loading: true };
    assert.deepEqual(evaluateProtectedRoute(state), { status: "loading" });
  });

  it("should redirect unauthenticated users to /login on ProtectedRoute", () => {
    const state = { currentUser: null, loading: false };
    assert.deepEqual(evaluateProtectedRoute(state), { status: "redirect", target: "/login" });
  });

  it("should allow authenticated student user on ProtectedRoute", () => {
    const state = {
      currentUser: { uid: "user-123", email: "student@nextgen.edu" },
      loading: false
    };
    assert.deepEqual(evaluateProtectedRoute(state), { status: "allow" });
  });

  it("should redirect non-admin user to /dashboard on AdminRoute", () => {
    const state = {
      currentUser: { uid: "user-123", email: "student@nextgen.edu" },
      userProfile: { role: "student", name: "Alex" },
      loading: false
    };
    assert.deepEqual(evaluateAdminRoute(state), { status: "redirect", target: "/dashboard" });
  });

  it("should allow verified administrator on AdminRoute", () => {
    const state = {
      currentUser: { uid: "admin-root", email: "admin@nextgen.edu" },
      userProfile: { role: "admin", name: "NextGen Administrator" },
      loading: false
    };
    assert.deepEqual(evaluateAdminRoute(state), { status: "allow" });
  });
});
