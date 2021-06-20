const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cartRoute = express.Router();
cartRoute.use(jsonParser);
const { authorization, requestMiddleware } = require("../middlewares");
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
	requestMiddleware,
	function (request, response) {
		const { userInfo, product } = request;
		userInfo.cart = addToCart(product, userInfo.cart);
		response
			.status(200)
			.send({ success: true, message: "Item added successfully!", userInfo });
	}
);
cartRoute.delete(
	"/remove-from-cart",
	authorization,
	requestMiddleware,
	function (request, response) {
		const { userInfo, product } = request;
		userInfo.cart = removeFromCart(product, userInfo.cart);
		response
			.status(200)
			.send({ success: true, message: "Item removed successfully!", userInfo });
	}
);
cartRoute.delete(
	"/delete-from-cart",
	authorization,
	requestMiddleware,
	function (request, response) {
		const { userInfo, product } = request;
		userInfo.cart = deletefromCart(product, userInfo.cart);
		response
			.status(200)
			.send({ success: true, message: "Item deleted successfully", userInfo });
	}
);
cartRoute.post(
	"/item-in-cart",
	authorization,
	requestMiddleware,
	function (request, response) {
		const { userInfo, product } = request;
		for (const item in userInfo.cart) {
			if (item.id === product.id) {
				response.status(200).send({ success: true, message: "Item found" });
			}
		}
		response.status(200).send({ success: false, message: "Item not found" });
	}
);
exports.cartRoute = cartRoute;
