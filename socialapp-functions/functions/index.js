const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
app.use(cors());

// Handlers
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

// Utility
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

// Screams Routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postAScream);
app.get("/scream/:screamId", getScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.delete("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.post("/scream/:screamId/comment", FBAuth, commentScream);

// Users Routes
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

// Updates the image everywhere for the user when image is changed
exports.userImageChange = functions
  .region("asia-east2")
  .firestore.document(`/users/{userId}`)
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data() !== change.after.data()) {
      let batch = db.batch();
      return db
        .collection("screams")
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const scream = db.doc(`/screams/${doc.id}`);
            batch.update(scream, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else {
      return true;
    }
  });

exports.screamDelete = functions
  .region("asia-east2")
  .firestore.document(`/screams/{screamId}`)
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("screamId", "==", screamId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("screamId", "==", screamId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("screamId", "==", screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
      });
  });
