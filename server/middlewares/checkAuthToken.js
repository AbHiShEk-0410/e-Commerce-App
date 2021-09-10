const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env["ACCESS_TOKEN_SECRET"];
function checkAuthToken(request, response, next) {
	//This function is to check whether access token was sent by user or not, and if yes then is it generated from our server or not

	const authHeader = request.headers["authorization"];
	const accessToken = authHeader && authHeader.split(" ")[1];

	if (!accessToken) {
		response.status(401).send({ success: false, message: "Token not found" });
	}
	jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, payload) => {
		//Token could be expired or might be fake
		if (error) {
			response
				.status(403)
				.send({ success: false, message: "Forbidden Client", error });
		}
		request.payload = payload;
		next();
	});
}
exports.checkAuthToken = checkAuthToken;
