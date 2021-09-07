const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cartRoute = express.Router();
const { User } = require("../models/user.model");
cartRoute.use(jsonParser);
const { authorization, requestMiddleware } = require("../middlewares");
const {
	findUserInDb,
	addToCart,
	removeFromCart,
	deletefromCart,
} = require("../utilities");
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
			response
				.status(200)
				.send({
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
function updatingCart(type, cart, product) {
	console.log("CART", cart);
	if (type === "inc") {
		const temp = cart.map((item) => {
			if (item._id === product._id)
				return { ...item, quantity: item.quantity + 1 };
			else return item;
		});
		return temp;
	} else {
		const temp = cart.map((item) => {
			if (item._id === product._id)
				return { ...item, quantity: item.quantity - 1 };
			else return item;
		});
		return temp;
	}
}
cartRoute.post(
	"/increase-count",
	authorization,
	requestMiddleware,
	async function (request, response) {
		try {
			const { userInfo, product } = request;

			const temp = await User.findOne({ _id: userInfo._id });
			const updatedCart = updatingCart("inc", temp.cart, product);
			const serverResponse = await User.findOneAndUpdate(
				{ _id: userInfo._id },
				{ cart: updatedCart },
				{ returnOriginal: false }
			);
			console.log("Updated Db looks like ", serverResponse);
			response.status(200).send({ success: true, data: serverResponse });
		} catch (error) {
			console.log(error);

			response.status(500).send({ sucess: false, message: "INternalSErver" });
		}
	}
);
cartRoute.post(
	"/decrease-count",
	authorization,
	requestMiddleware,
	async function (request, response) {
		try {
			const { userInfo, product } = request;

			const temp = await User.findOne({ _id: userInfo._id });
			const updatedCart = updatingCart("dec", temp.cart, product);
			const serverResponse = await User.findOneAndUpdate(
				{ _id: userInfo._id },
				{ cart: updatedCart },
				{ returnOriginal: false }
			);
			console.log("Updated Db looks like ", serverResponse);
			response.status(200).send({ success: true, data: serverResponse });
		} catch (error) {
			console.log(error);

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
			response
				.status(200)
				.send({
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
