"use strict";

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK safely (singleton pattern)
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  auth,
  storage,
};

