// Imports
const functions = require("firebase-functions");
const {
  getAllScreams,
  postAScream,
  getScream,
  deleteScream,
  commentScream,
  likeScream,
  unlikeScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticUser,
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/users");
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");
const app = require("express")();

// Screams Routes
//
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postAScream);
app.get("/scream/:screamId", getScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.delete("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.post("/scream/:screamId/comment", FBAuth, commentScream);
// TODO: Combine like and unlike functions into the same one with only one button

// Users Routes
//
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

// API
exports.api = functions.region("asia-east2").https.onRequest(app);

// Notifications
// Like
exports.createNotificationLike = functions
  .region("asia-east2")
  .firestore.document(`/likes/{id}`)
  .onCreate((snapshot) => {
    // Snapshot -> Like Document. Doc -> Scream Document
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            created: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

// Unlike
exports.deleteNotificationUnlike = functions
  .region("asia-east2")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// Comment
exports.createNotificationComment = functions
  .region("asia-east2")
  .firestore.document(`comments/{id}`)
  .onCreate((snapshot) => {
    return db
      .collection("screams")
      .doc(`${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.collection("notifications").doc(`${snapshot.id}`).set({
            created: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

//exports.userImageChange = functions.region("asia-east2").firestore.document()
