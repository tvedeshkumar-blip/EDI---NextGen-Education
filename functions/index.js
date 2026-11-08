"use strict";

const {setGlobalOptions} = require("firebase-functions");
const {onCall} = require("firebase-functions/v2/https");
const {admin} = require("./src/config/firebase");
const secureLogger = require("./src/utils/logger");
const {checkRateLimit} = require("./src/middleware/rateLimiter");
const authMiddleware = require("./src/middleware/auth");
const errorUtils = require("./src/utils/errors");

// Limit the maximum number of function instances to prevent excessive scale.
setGlobalOptions({maxInstances: 10});

/**
 * Foundation Health Check Callable Function.
 * Verifies backend connectivity, Admin SDK status, and security utilities.
 */
exports.healthCheck = onCall(async (request) => {
  const callerId = request.auth ? request.auth.uid : "unauthenticated";
  checkRateLimit(callerId, 60, 60000);

  secureLogger.info("Backend foundation health check executed", {
    callerId,
  });

  return {
    status: "healthy",
    service: "NextGen Education Backend Foundation",
    timestamp: new Date().toISOString(),
    adminInitialized: Boolean(admin.apps.length > 0),
  };
});

// Export foundational modules for internal testing and downstream phases
exports.foundation = {
  authMiddleware,
  errorUtils,
  secureLogger,
};
