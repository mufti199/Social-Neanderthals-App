// Imports
const functions = require("firebase-functions");
const {
  getAllScreams,
  postAScream,
  getScream,
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
} = require("./handlers/users");
const FBAuth = require("./util/fbAuth");
const app = require("express")();

// Screams Routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postAScream);
app.get("/scream/:screamId", getScream);
app.post("/scream/:screamId/like", FBAuth, likeScream);
app.post("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.post("/scream/:screamId/comment", FBAuth, commentScream);
// TODO delete scream

// Users Routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticUser);

exports.api = functions.region("asia-east2").https.onRequest(app);
