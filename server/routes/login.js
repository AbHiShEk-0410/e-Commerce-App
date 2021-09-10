const ACCESS_TOKEN_SECRET = process.env["ACCESS_TOKEN_SECRET"];
const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const { passwordValidation } = require("../utilities");
const { loginParamCheck } = require("../middlewares");

const loginRoute = express.Router();
loginRoute.use(jsonParser);

loginRoute.post("/", loginParamCheck, async function (request, response) {
	try {
		const loginUser = request.loginUser;
		const { password: userEnteredPassword } = request.body;

		const validation = await passwordValidation(
			userEnteredPassword,
			loginUser.password
		);

		if (validation.success && validation.result) {
			const payload = {
				_id: loginUser._id,
			};
			const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET);
			console.log(validation, accessToken);
			response.status(validation.status).send({
				success: true,
				accessToken,
				message: "User successfully logged In!",
			});
		} else if (validation.success && !validation.result) {
			response.status(validation.status).send({
				success: false,
				message: "Password does not match",
			});
		} else {
			response.status(501).send({ validation });
		}
	} catch (error) {
		response.status(500).send({
			success: false,
			message: error.message,
		});
	}
});
exports.loginRoute = loginRoute;
