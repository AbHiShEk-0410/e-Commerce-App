const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cartRoute = express.Router();
cartRoute.use(jsonParser);
const { authorization, cartMiddleware } = require("../middlewares");
const {
	findUserInDb,
	addToCart,
	removeFromCart,
	deletefromCart,
} = require("../utilities");
cartRoute.post("/", authorization, function (request, response) {
	const payload = request.payload;
	const userInfo = findUserInDb({ id: payload.id });
	response.status(200).send({ success: true, cart: userInfo.cart });
});
cartRoute.post(
	"/add-to-cart",
	authorization,
	cartMiddleware,
	function (request, response) {
		const { userInfo, productId } = request;
		userInfo.cart = addToCart(productId, userInfo.cart);
		response
			.status(200)
			.send({ success: true, message: "Item added successfully!", userInfo });
	}
);
cartRoute.delete(
	"/remove-from-cart",
	authorization,
	cartMiddleware,
	function (request, response) {
		const { userInfo, productId } = request;
		userInfo.cart = removeFromCart(productId, userInfo.cart);
		response
			.status(200)
			.send({ success: true, message: "Item removed successfully!", userInfo });
	}
);
cartRoute.delete(
	"/delete-from-cart",
	authorization,
	cartMiddleware,
	function (request, response) {
		const { userInfo, productId } = request;
		userInfo.cart = deletefromCart(productId, userInfo.cart);
		response
			.status(200)
			.send({ success: true, message: "Item deleted successfully", userInfo });
	}
);
exports.cartRoute = cartRoute;
