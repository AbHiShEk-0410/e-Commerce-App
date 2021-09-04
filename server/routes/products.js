const express = require("express");
const productRoute = express.Router();
const { Product } = require("../models/product.model");

productRoute.get("/", async function (request, response) {
	try {
		const serverResponse = await Product.find({});
		response.send({ data: serverResponse });
	} catch (error) {
		response.status(500).send({ success: false, message: error });
	}
});
exports.productRoute = productRoute;
