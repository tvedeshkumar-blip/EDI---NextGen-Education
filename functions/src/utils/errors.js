"use strict";

const {HttpsError} = require("firebase-functions/v2/https");

/**
 * Creates an unauthenticated error.
 * @param {string} message - Error description.
 * @return {HttpsError}
 */
function unauthenticated(message = "Authentication required.") {
  return new HttpsError("unauthenticated", message);
}

/**
 * Creates a permission denied error.
 * @param {string} message - Error description.
 * @return {HttpsError}
 */
function permissionDenied(message = "Insufficient permissions.") {
  return new HttpsError("permission-denied", message);
}

/**
 * Creates a not found error.
 * @param {string} message - Error description.
 * @return {HttpsError}
 */
function notFound(message = "Resource not found.") {
  return new HttpsError("not-found", message);
}

/**
 * Creates an invalid argument error.
 * @param {string} message - Error description.
 * @param {*} details - Optional structured error details.
 * @return {HttpsError}
 */
function invalidArgument(message = "Invalid input data.", details = null) {
  return new HttpsError("invalid-argument", message, details);
}

/**
 * Creates a resource exhausted (rate limited) error.
 * @param {string} message - Error description.
 * @return {HttpsError}
 */
function rateLimited(message = "Too many requests. Please try again later.") {
  return new HttpsError("resource-exhausted", message);
}

/**
 * Creates an internal server error.
 * @param {string} message - Error description.
 * @return {HttpsError}
 */
function internal(message = "An unexpected server error occurred.") {
  return new HttpsError("internal", message);
}

module.exports = {
  HttpsError,
  unauthenticated,
  permissionDenied,
  notFound,
  invalidArgument,
  rateLimited,
  internal,
};
