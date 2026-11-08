"use strict";

const {admin, auth, db} = require("../../config/firebase");
const secureLogger = require("../../utils/logger");

/**
 * Assigns admin privileges to a user via Firebase Custom Claims.
 * Preserves all existing custom claims on the user.
 *
 * @param {string} identifier - User UID or email address.
 * @param {boolean} isAdmin - Admin privilege flag (default true).
 * @return {Promise<object>} Updated user profile and custom claims.
 */
async function setAdminClaim(identifier, isAdmin = true) {
  let userRecord;
  if (identifier.includes("@")) {
    userRecord = await auth.getUserByEmail(identifier);
  } else {
    userRecord = await auth.getUser(identifier);
  }

  const currentClaims = userRecord.customClaims || {};
  const updatedClaims = {
    ...currentClaims,
    admin: Boolean(isAdmin),
  };

  if (!isAdmin) {
    delete updatedClaims.admin;
  }

  await auth.setCustomUserClaims(userRecord.uid, updatedClaims);

  // Synchronize Firestore admins registry document
  const adminDocRef = db.collection("admins").doc(userRecord.uid);
  if (isAdmin) {
    await adminDocRef.set({
      uid: userRecord.uid,
      email: userRecord.email,
      admin: true,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, {merge: true});
  } else {
    try {
      await adminDocRef.delete();
    } catch (err) {
      // Ignore if document didn't exist
    }
  }

  secureLogger.info("Admin custom claim assigned successfully", {
    uid: userRecord.uid,
    admin: Boolean(isAdmin),
  });

  return {
    uid: userRecord.uid,
    email: userRecord.email,
    customClaims: updatedClaims,
  };
}

module.exports = {
  setAdminClaim,
};
