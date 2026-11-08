"use strict";

const logger = require("firebase-functions/logger");

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "apiKey",
  "api_key",
  "secret",
  "authorization",
  "creditCard",
]);

/**
 * Recursively redacts sensitive keys from log payloads.
 * @param {*} data - Payload to sanitize.
 * @return {*} Sanitized payload.
 */
function sanitize(data) {
  if (!data || typeof data !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_KEYS.has(key)) {
      cleaned[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      cleaned[key] = sanitize(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

const secureLogger = {
  info: (message, context = {}) => {
    logger.info(message, sanitize(context));
  },
  warn: (message, context = {}) => {
    logger.warn(message, sanitize(context));
  },
  error: (message, error = {}) => {
    const context = error instanceof Error ?
      {message: error.message, stack: error.stack} :
      error;
    logger.error(message, sanitize(context));
  },
  sanitize,
};

module.exports = secureLogger;

