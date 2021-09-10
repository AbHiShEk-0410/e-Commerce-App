const { findUserInDb } = require("../utilities");
async function loginMiddleware(request, response, next) {
	//It is to check whether the required login params are being send or not

	let { username, email, password } = request.body;
	if ((!!username || !!email) && !!password) {
		//Because either of username or email and password require for login
		try {
			const userInfo = await findUserInDb(
				!!username ? { username } : { email }
			);
			if (!userInfo) {
				response
					.status(404)
					.send({ success: false, message: "User does not exist" });
			}
			request.loginUser = userInfo;
			next();
		} catch (error) {
			console.log(error);
			response.status(500).send({ success: false, message: error });
		}
	} else {
		response
			.status(400)
			.send({ success: false, message: "Missing Parameters" });
	}
}
exports.loginMiddleware = loginMiddleware;
