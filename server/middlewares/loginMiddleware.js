const { findUserInDb } = require("../utilities");
function loginMiddleware(request, response, next) {
	let { username, email, password } = request.body;

	if ((!!username || !!email) && !!password) {
		//Because either of username or email and password require for login
		const userInfo = findUserInDb(!!username ? { username } : { email });
		if (!userInfo) {
			response
				.status(404)
				.send({ success: false, message: "User does not exist" });
		}
		request.loginUser = userInfo;
		next();
	} else {
		response
			.status(400)
			.send({ success: false, message: "Missing Parameters" });
	}
}
exports.loginMiddleware = loginMiddleware;
