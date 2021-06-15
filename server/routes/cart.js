const express = require("express");
const cartRoute = express.Router();
const { authorization } = require("../middlewares");
const { findUserInDb } = require("../utilities");

cartRoute.get("/", authorization, function (request, response) {
	const payload = request.payload;

	const userInfo = findUserInDb({ email: payload.email });
	response.status(200).send({ success: true, cart: userInfo.cart });
});
exports.cartRoute = cartRoute;
