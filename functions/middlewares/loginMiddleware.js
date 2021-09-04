const {findUserInDb} = require("../utilities");
// eslint-disable-next-line require-jsdoc
function loginMiddleware(request, response, next) {
  const {username, email, password} = request.body;

  if ((!!username || !!email) && !!password) {
    // Because either of username or email and password require for login
    const userInfo = findUserInDb(username ? {username} : {email});
    if (!userInfo) {
      response
          .status(404)
          .send({success: false, message: "User does not exist"});
    }
    request.loginUser = userInfo;
    next();
  } else {
    response
        .status(400)
        .send({success: false, message: "Missing Parameters"});
  }
}
exports.loginMiddleware = loginMiddleware;
