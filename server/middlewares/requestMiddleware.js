const { findUserInDb } = require("../utilities");
function requestMiddleware(request, response, next) {
	const userId = request.payload.id;
	const userInfo = findUserInDb({ id: userId });
	if (!userInfo) {
		response
			.status(404)
			.send({ success: false, message: "user does not eixts" });
	}
	const product = request.body.product;
	if (
		!product.id ||
		!product.name ||
		!product.type ||
		!product.img ||
		!product.amount ||
		!product.price ||
		!product.unit
	) {
		response.status(400).send({ success: false, message: "Missing Paramters" });
	}
	request.product = product;
	request.userInfo = userInfo;
	next();
}
exports.requestMiddleware = requestMiddleware;
