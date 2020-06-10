// This is a reference documnet for te datastructures used.
// Database -> Object of Arrays -> Array of Objects
let db = {
  screams: [
    {
      userHandle: "user",
      body: "scream content",
      created: "2020-05-11T22:32:02.893Z",
      likeCount: 4,
      commentCount: 2,
    },
  ],

  users: [
    {
      created: "2020-05-11T22:32:02.893Z",
      email: "user@email.com",
      userHandle: "user",
      userId: "UID - auto-generated",
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFilename}?alt=media`,
      bio: "Blob",
      website: "http://website.com",
      location: "Melbourne",
    },
  ],

  comments: [
    {
      userHandle: "user",
      screamId: "GFBKAsMSUbP3zinj3bDl",
      body: "body",
      created: "2020-05-11T22:32:02.893Z",
    },
  ],

  notifications: [
    {
      recipient: "user",
      sender: "organizer1",
      read: "true | false",
      created: "2020-05-16T22:32:02.893Z",
      screamId: "GFBKAsMSUbP3zinj3bDl",
      type: "like | comment",
    },
  ],
};

// IMPORTANT TIP: Firebase charges on the number of reads thus, minimze it.

const userDetails = {
  // Redux Data
  credentials: {
    userId,
    email,
    userHandle,
    created,
    imageUrl,
    bio,
    website,
    location,
  },
  likes: [
    {
      userHandle: "user",
      screamId,
    },
    {
      userHandle: "user1",
      screamId,
    },
  ],
};
