const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { findUserInDb, passwordValidation } = require("../utilities");
const { encryption } = require("../utilities/encryption");
const { authorization } = require("../middlewares");
const { User } = require("../models/user.model");
const userRoute = express.Router();
userRoute.use(jsonParser);

//Security-question : Check if username or mail exist or not
userRoute.post("/validate", async function (request, response) {
	const data = request.body;
	console.log("FFFFFF", data);
	if (!data.email && !data.username) {
		response
			.status(400)
			.send({ success: false, message: "Missing Parameters" });
	}
	try {
		const userData = await findUserInDb(data);
		if (!userData) {
			response
				.status(404)
				.send({ success: false, message: "User does not exist!" });
		}
		response.status(200).send({ success: true, data: { _id: userData._id } });
	} catch (error) {
		response
			.status(500)
			.send({ success: false, message: "Internal server Error" });
	}
});

//Security-question : If exists, send security question
userRoute.get("/security-question/:id", async function (request, response) {
	const _id = request.params.id;
	try {
		const userData = await findUserInDb({ _id });
		if (!userData) {
			response
				.status(404)
				.send({ success: false, message: "User does not exist!" });
		}
		response.status(200).send({
			success: true,
			data: {
				_id: userData._id,
				name: userData.name,
				question: userData.question,
			},
		});
	} catch (error) {
		response
			.status(500)
			.send({ success: false, message: "Internal server Error" });
	}
});

//Security-question : Check answer of security question
userRoute.post(
	"/security-answer-validation",
	async function (request, response) {
		const data = request.body;
		if (!data.answer || !data._id) {
			response
				.status(400)
				.send({ success: false, message: "Missing Parameters" });
		} else {
			const _id = data._id;
			try {
				const userData = await findUserInDb({ _id });
				if (!userData) {
					response
						.status(404)
						.send({ success: false, message: "User does not exist!" });
				} else {
					const isPasswordSame = await passwordValidation(
						data.answer,
						userData.answer
					);
					if (isPasswordSame.success) {
						response.status(isPasswordSame.result ? 200 : 401).send({
							success: isPasswordSame.success,
							result: isPasswordSame.result,
						});
					} else {
						response.status(isPasswordSame.status).send({
							success: isPasswordSame.success,
							message: isPasswordSame.message,
						});
					}
				}
			} catch (error) {
				response.status(500).send({ success: false, message: "ISE" });
			}
		}
	}
);

//Security-question : If true then reset
userRoute.post("/reset-password", async function (request, response) {
	const data = request.body;
	try {
		if (!data.password || !data._id) {
			response
				.status(400)
				.send({ success: false, message: "Missing Parameters" });
		} else {
			const _id = data._id;
			const userData = await findUserInDb({ _id });
			if (!userData) {
				response
					.status(404)
					.send({ success: false, message: "User does not exist!" });
			} else {
				const password = data.password;
				const encryptedPassword = await encryption(password);

				if (encryptedPassword.success) {
					console.log(encryptedPassword);

					const temp = await User.findByIdAndUpdate(_id, {
						password: encryptedPassword.hash,
					});
					console.log(temp);
					response
						.status(200)
						.send({ success: true, message: "Password Updated Successfully" });
				} else {
					response
						.status(500)
						.send({ ...encryptedPassword, message: encryptedPassword.error });
				}
			}
		}
	} catch (error) {
		response.status(500).send({ success: false, message: error });
	}
});

//This is going to be useful for later part
//As of now we are not putting token in cookies, once we done that then there is a point of checking token
userRoute.get("/check-token", authorization, function (request, response) {
	const { payload } = request;
	response.status(200).send({ success: true, payload });
});

exports.userRoute = userRoute;
