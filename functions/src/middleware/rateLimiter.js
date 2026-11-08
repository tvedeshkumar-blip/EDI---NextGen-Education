"use strict";

const {rateLimited} = require("../utils/errors");

// In-memory sliding window store: Map<key, Array<timestamp>>
const rateLimitStore = new Map();

// Periodic cleanup every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of rateLimitStore.entries()) {
    const valid = timestamps.filter((t) => now - t < 300000);
    if (valid.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, valid);
    }
  }
}, 300000).unref();

/**
 * Enforces per-user / per-client rate limits for backend operations.
 * @param {string} key - Unique rate limit identifier (e.g. UID or IP).
 * @param {number} maxRequests - Max operations permitted within the window.
 * @param {number} windowMs - Window duration in milliseconds.
 */
function checkRateLimit(key, maxRequests = 30, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  const timestamps = rateLimitStore.get(key) || [];
  const validTimestamps = timestamps.filter((ts) => ts > windowStart);

  if (validTimestamps.length >= maxRequests) {
    throw rateLimited(
        `Rate limit exceeded (${maxRequests} req/${windowMs / 1000}s). ` +
        "Please wait before trying again.",
    );
  }

  validTimestamps.push(now);
  rateLimitStore.set(key, validTimestamps);
}

/**
 * Resets rate limit records (primarily for testing).
 */
function resetRateLimits() {
  rateLimitStore.clear();
}

module.exports = {
  checkRateLimit,
  resetRateLimits,
};

