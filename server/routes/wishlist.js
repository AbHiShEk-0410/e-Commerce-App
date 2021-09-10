const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const wishlistRoute = express.Router();
const { User } = require("../models/user.model");

wishlistRoute.use(jsonParser);
const { authorization, requestMiddleware } = require("../middlewares");

wishlistRoute.get("/", authorization, async function (request, response) {
	try {
		const { _id } = request;
		const serverResponse = await User.findById(_id);
		response.status(200).send({ success: true, data: serverResponse.wishlist });
	} catch (error) {
		console.log(error);
		response.status(500);
	}
});
wishlistRoute.post(
	"/add-to-wishlist",
	authorization,
	requestMiddleware,
	async function (request, response) {
		try {
			const { userInfo, product } = request;
			const serverResponse = await User.findOneAndUpdate(
				{ _id: userInfo._id },
				{
					$push: {
						wishlist: { ...product },
					},
				},
				{ returnOriginal: false }
			);
			response.status(200).send({
				success: true,
				message: "Item added successfully!",
				data: serverResponse.wishlist,
			});
		} catch (error) {
			response
				.status(500)
				.send({ success: false, message: "INTERNAL SERVER ERROR" });
		}
	}
);
wishlistRoute.delete(
	"/remove-from-wishlist",
	authorization,
	requestMiddleware,
	async function (request, response) {
		try {
			const { userInfo, product } = request;
			const serverResponse = await User.findOneAndUpdate(
				{ _id: userInfo._id },
				{ $pull: { wishlist: { _id: product._id } } },
				{ returnOriginal: false }
			);
			response.status(200).send({
				success: true,
				message: "Removed successfully",
				data: serverResponse.wishlist,
			});
		} catch (error) {
			response
				.status(500)
				.send({ success: false, message: "INTERNAL SERVER ERROR" });
		}
	}
);
exports.wishlistRoute = wishlistRoute;
