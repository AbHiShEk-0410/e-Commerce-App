const admin = require("firebase-admin");
const express = require("express");
// eslint-disable-next-line new-cap
const productRoute = express.Router();
productRoute.get("/", async (request, response) => {
	try {
		const snapshot = await admin.firestore().collection("products").get();
		let productsData = {};
		snapshot.forEach((eachProduct) => {
			productsData[`${eachProduct.id}`] = eachProduct.data();
		});

		response.status(200).send({
			success: true,
			message: "Data fetch was successful",
			data: productsData,
		});
	} catch (error) {
		response.status(500).send({
			success: false,
			message: "Internal Server Error! Please try again",
		});
	}
});
exports.productRoute = productRoute;
