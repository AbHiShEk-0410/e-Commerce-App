const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const wishlistRoute = express.Router();
const { findUserInDb } = require("../utilities");
wishlistRoute.use(jsonParser);
const { authorization, requestMiddleware } = require("../middlewares");
wishlistRoute.get("/", authorization, function (request, response) {
	const payload = request.payload;
	const userInfo = findUserInDb({ id: payload.id });
	response.status(200).send({ success: true, wishlist: userInfo.wishlist });
});
wishlistRoute.post(
	"/add-or-remove",
	authorization,
	requestMiddleware,
	function (request, response) {
		const { userInfo, product } = request;
		const inWishlist = userInfo.wishlist.find((item) => item.id === product.id);
		if (!inWishlist) {
			userInfo.wishlist.push(product);
		} else {
			userInfo.wishlist = userInfo.wishlist.filter(
				(item) => item.id !== product.id
			);
		}
		response.status(200).send({ success: true, wishlist: userInfo.wishlist });
	}
);
exports.wishlistRoute = wishlistRoute;