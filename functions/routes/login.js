const admin = require("firebase-admin");
const {findUserInDb} = require("../util/findUserInDb");
const express = require("express");
const cors = require("cors");

// eslint-disable-next-line new-cap
const loginRoute = express.Router();
loginRoute.use(cors({origin: true}));

loginRoute.post("/", async (request, response) => {
  const user = request.body;
  await admin.firestore().collection("users").add(user);
  response.status(200).send({success: true, message: "logged in successful"});
});

loginRoute.get("/", async (request, response) => {
  console.log("##############################################################");
  const condition = request.body;
  console.log("condition", condition);

  const database = await admin.firestore().collection("users").get();
  try {
    const checkerResponse = await findUserInDb(condition, database);
    console.log("checker response", checkerResponse);
    response.status(200).send({success: true, data: checkerResponse});
  } catch (error) {
    response.status(404).send({success: false, message: error});
  }
});
exports.loginRoute = loginRoute;
