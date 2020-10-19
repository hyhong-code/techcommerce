const admin = require("firebase-admin");

const serviceAccount = require("../config/firebaseServiceAccKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://commerce-a7802.firebaseio.com",
});

module.exports = admin;
