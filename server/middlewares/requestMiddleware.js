const { findUserInDb } = require("../utilities");
async function requestMiddleware(request, response, next) {
	// This middleware is to check whether the required params were sent by user or not

	const userId = request.payload.id;
	try {
		const userInfo = await findUserInDb({ id: userId });
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
			response
				.status(400)
				.send({ success: false, message: "Missing Paramters" });
		}
		request.product = product;
		request.userInfo = userInfo;
		next();
	} catch (error) {
		response
			.status(500)
			.send({ success: false, message: "Internal Server Error" });
	}
}
exports.requestMiddleware = requestMiddleware;
