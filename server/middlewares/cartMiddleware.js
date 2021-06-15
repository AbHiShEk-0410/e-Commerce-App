const { findUserInDb } = require("../utilities");
function cartMiddleware(request, response, next) {
	const userId = request.payload.id;
	const userInfo = findUserInDb({ id: userId });
	if (!userInfo) {
		response
			.status(404)
			.send({ success: false, message: "user does not eixts" });
	}
	const productId = request.body.productId;
	if (!productId) {
		response.status(400).send({ success: false, message: "Missing Paramters" });
	}
	request.productId = productId;
	request.userInfo = userInfo;
	next();
}
exports.cartMiddleware = cartMiddleware;
