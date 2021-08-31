const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
admin.initializeApp();
const {productRoute} = require("./routes");
const app = express();
app.use(cors({origin: true}));


exports.product = functions.https.onRequest(productRoute);
exports.app = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  console.log("Working");
  response.send("Hello from Firebase!");
});
