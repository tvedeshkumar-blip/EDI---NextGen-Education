"use strict";

const {admin, db} = require("../../config/firebase");
const {requireAdmin} = require("../../middleware/auth");
const {invalidArgument} = require("../../utils/errors");
const secureLogger = require("../../utils/logger");
const {
  validateContent,
  isValidSlug,
  VALID_COLLECTIONS,
} = require("../../validators/contentValidators");

/**
 * Handles admin saving/updating educational content.
 * Enforces requireAdmin (token.admin === true).
 *
 * @param {object} request - Callable request containing collection & data.
 * @return {Promise<object>} Status result.
 */
async function saveEducationalContent(request) {
  const adminUser = requireAdmin(request);
  const {collectionName, data} = request.data || {};

  if (!collectionName || !data) {
    throw invalidArgument(
        "Both 'collectionName' and 'data' are required parameters.",
    );
  }

  // Validate content according to collection rules
  validateContent(collectionName, data);

  const docRef = db.collection(collectionName).doc(data.id);
  await docRef.set(
      {
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
  );

  secureLogger.info("Educational content updated by administrator", {
    adminUid: adminUser.uid,
    collection: collectionName,
    documentId: data.id,
  });

  return {
    success: true,
    collection: collectionName,
    id: data.id,
  };
}

/**
 * Handles admin deleting educational content.
 * Enforces requireAdmin (token.admin === true).
 *
 * @param {object} request - Callable request containing collection & id.
 * @return {Promise<object>} Status result.
 */
async function deleteEducationalContent(request) {
  const adminUser = requireAdmin(request);
  const {collectionName, id} = request.data || {};

  if (!VALID_COLLECTIONS.has(collectionName)) {
    throw invalidArgument(`Unsupported collection '${collectionName}'.`);
  }

  if (!isValidSlug(id)) {
    throw invalidArgument("Invalid document ID slug.");
  }

  await db.collection(collectionName).doc(id).delete();

  secureLogger.info("Educational content deleted by administrator", {
    adminUid: adminUser.uid,
    collection: collectionName,
    documentId: id,
  });

  return {
    success: true,
    collection: collectionName,
    id,
  };
}

module.exports = {
  saveEducationalContent,
  deleteEducationalContent,
};

