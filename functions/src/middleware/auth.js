"use strict";

const {unauthenticated, permissionDenied} = require("../utils/errors");

/**
 * Validates that an incoming callable request has a verified Firebase session.
 * @param {object} request - Firebase Functions v2 CallableRequest.
 * @return {object} Authenticated user info.
 */
function requireAuth(request) {
  if (!request.auth || !request.auth.uid) {
    throw unauthenticated("Authentication required to perform this action.");
  }

  return {
    uid: request.auth.uid,
    token: request.auth.token || {},
  };
}

/**
 * Validates that the caller is a verified administrator.
 * Enforces server-side role check; students cannot self-assign this role.
 * @param {object} request - Firebase Functions v2 CallableRequest.
 * @return {object} Verified admin user info.
 */
function requireAdmin(request) {
  const user = requireAuth(request);
  const token = user.token;

  const isExplicitAdminClaim = token.admin === true || token.role === "admin";
  const isDesignatedAdminEmail = token.email === "admin@nextgen.edu";

  if (!isExplicitAdminClaim && !isDesignatedAdminEmail) {
    throw permissionDenied("Administrative privileges required.");
  }

  return user;
}

/**
 * Safe optional user extractor. Does not throw if unauthenticated.
 * @param {object} request - Firebase Functions v2 CallableRequest.
 * @return {object|null}
 */
function extractUser(request) {
  if (request && request.auth && request.auth.uid) {
    return {
      uid: request.auth.uid,
      token: request.auth.token || {},
    };
  }
  return null;
}

module.exports = {
  requireAuth,
  requireAdmin,
  extractUser,
};

