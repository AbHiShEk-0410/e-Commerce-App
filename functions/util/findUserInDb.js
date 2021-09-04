/* eslint-disable require-jsdoc */
const admin = require("firebase-admin");
async function findUserInDb(condition) {
  const query = Object.keys(condition)[0];
  let usersData = [];
  const snapshot = admin.firestore().collection("users").get();
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    

    if (data[query] === condition[query]) {
      return {success: true, data: {id, ...data}};
    } else {
      return {success: false};
    }
  });
  console.log("checkerResponse", checkerResponse);
  return checkerResponse;
}
exports.findUserInDb = findUserInDb;
