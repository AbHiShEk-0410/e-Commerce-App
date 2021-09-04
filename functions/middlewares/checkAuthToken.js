/* eslint-disable require-jsdoc */
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env["ACCESS_TOKEN_SECRET"];

function checkAuthToken(request, response, next) {
  const authHeader = request.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    response.status(401).send({success: false, message: "Token not found"});
  }
  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, payload) => {
    // Token may be expired or could be a fake one
    if (error) {
      response
          .status(403)
          .send({success: false, message: "Forbidden Client", error});
    }
    request.payload = payload;
    next();
  });
}
exports.checkAuthToken = checkAuthToken;
