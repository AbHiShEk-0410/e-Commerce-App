const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { users } = require("../database/usersDB");
const { findUserInDb } = require("../utilities");

const userRoute = express.Router();
userRoute.use(jsonParser);
userRoute.get("/", function (request, response) {
	setTimeout(() => {
		response.status(200).send({
			data: users,
		});
	}, 2000);
});
userRoute.get("/validate", function (request, response) {
	const data = request.body;
	const userData = findUserInDb(data);
	if (!userData) {
		response
			.status(404)
			.send({ success: false, message: "User does not exist!" });
	}
	response
		.status(200)
		.send({
			success: true,
			data: { id: userData.id, question: userData.question },
		});
});
exports.userRoute = userRoute;
