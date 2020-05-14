const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("../admin.json")),
});

// Access Firestore
const db = admin.firestore();

module.exports = { admin, db };
