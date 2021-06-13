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
		if (loginUser.success) {
			let { password: userEnteredPassword } = request.body;
			const validation = await passwordValidation(
				userEnteredPassword,
				loginUser.userInfo.password
			);

			if (validation.success && validation.result) {
				const payload = {
					name: loginUser.userInfo.name,
					email: loginUser.userInfo.email,
				};
				const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET);

				response.status(validation.status).send({
					success: true,
                    result :true,
					token: accessToken,
					message: "User successfully logged In!",
				});
			} else if (validation.success && !validation.result) {
				response.status(validation.status).send({
					success: true,
					result: validation.result,
					message: "Password does not match",
				});
			} else {
				response.status(validation.status).send({
					success: false,
					message: validation.message,
				});
			}
		} else {
			throw new Error(JSON.stringify(loginUser));
		}
	} catch (error) {
		const { status, message } = JSON.parse(error.message);
		response.status(status).send({
			success: false,
			message: message,
		});
	}
});
exports.loginRoute = loginRoute;
