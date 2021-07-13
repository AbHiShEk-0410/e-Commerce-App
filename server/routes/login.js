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
				name: loginUser.name,
				email: loginUser.email,
			};
			const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET);

			response.status(validation.status).send({
				success: true,
				token: accessToken,
				message: "User successfully logged In!",
			});
		} else if (validation.success && !validation.result) {
			response.status(validation.status).send({
				success: false,
				message: "Password does not match",
			});
		} else {
			//If there is any error occured while comparing both hash values, the control will come here
			//i.e. it will handle errors occured after calling "passwordValidation"
			response.status(500).send({ validation }); //Internal Server Error
		}
	} catch (error) {
		//If there is any error occured while calling the function "passwordValidation", the control will come here
		//i.e. it will handle errors occured before/while calling "passwordValidation"
		response.status(500).send({ 
			success: false,
			message: error.message,
		});//Internal Server Error
	}
});
exports.loginRoute = loginRoute;
