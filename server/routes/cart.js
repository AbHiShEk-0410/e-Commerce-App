const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cartRoute = express.Router();
const { User } = require("../models/user.model");
cartRoute.use(jsonParser);
const { authorization, requestMiddleware } = require("../middlewares");

cartRoute.get("/", authorization, async function (request, response) {
	const { _id } = request;
	try {
		const serverResponse = await User.findById(_id);
		response.status(200).send({ success: true, cart: serverResponse.cart });
	} catch (error) {
		response
			.status(500)
			.send({ success: false, message: "Internal Server Error" });
	}
});
cartRoute.post(
	"/add-to-cart",
	authorization,
	requestMiddleware,
	async function (request, response) {
		try {
			const { userInfo, product } = request;

			const serverResponse = await User.findOneAndUpdate(
				{ _id: userInfo._id },
				{
					$push: {
						cart: { ...product, quantity: 1 },
					},
				},
				{ returnOriginal: false }
			);
			response.status(200).send({
				success: true,
				message: "Item added successfully!",
				serverResponse,
			});
		} catch (error) {
			response
				.status(500)
				.send({ success: false, message: "INTERNAL SERVER ERROR" });
		}
	}
);
cartRoute.post(
	"/increase-count",
	authorization,
	requestMiddleware,
	function (request, response) {
		console.log("RUNNING");
		try {
			const { userInfo, product } = request;
			users.forEach((user) => {
				if (userInfo._id === user._id) {
					console.log(userInfo);
					user.cart.forEach((cartItem) => {
						if (cartItem._id === product._id) {
							cartItem.quantity += 1;
						}
					});
				}
			});

			console.log(users);
			response.status(200).send({ success: true, data: users });
		} catch (error) {
			console.log("Error");

			response.status(500).send({ sucess: false, message: "INternalSErver" });
		}
	}
);
cartRoute.delete(
	"/remove-from-cart",
	authorization,
	requestMiddleware,
	async function (request, response) {
		try {
			const { userInfo, product } = request;
			const serverResponse = await User.findOneAndUpdate(
				{ _id: userInfo._id, "cart._id": cart.product._id },
				{ $dec: { "cart.$.quantity": 1 } },
				{ returnOriginal: false }
			);

			response.status(200).send({ success: true, data: serverResponse });
		} catch (error) {
			response.status(500).send({ sucess: false, message: "INternalSErver" });
		}
	}
);
cartRoute.delete(
	"/delete-from-cart",
	authorization,
	requestMiddleware,
	async function (request, response) {
		try {
			const { userInfo, product } = request;
			const serverResponse = await User.findOneAndUpdate(
				{ _id: userInfo._id },
				{ $pull: { cart: { _id: product._id } } },
				{ returnOriginal: false }
			);
			response.status(200).send({
				success: true,
				message: "Removed successfully",
				data: serverResponse.cart,
			});
		} catch (error) {
			response
				.status(500)
				.send({ success: false, message: "INTERNAL SERVER ERROR" });
		}
	}
);

exports.cartRoute = cartRoute;
