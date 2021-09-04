const express = require("express");
const bodyParser = require("body-parser");
const { users } = require("../database/usersDB");
const { signupParamsCheck, emailValidation } = require("../middlewares");
const { encrypt } = require("../utilities");
const { User } = require("../models/user.model");

const jsonParser = bodyParser.json();
const signupRoute = express.Router();
signupRoute.use(jsonParser);
signupRoute.post(
	"/",
	signupParamsCheck,
	emailValidation,
	async function (request, response) {
		const isUserUnique = request.isUserUnique;
		if (isUserUnique.success && isUserUnique.result) {
			const { name, email, password, question, answer } = request.body;
			const encryptedPassword = await encrypt(password);
			const encryptedAnswer = await encrypt(answer);

			if (encryptedPassword.success && encryptedAnswer.success) {
				const user = {
					name,
					username: null,
					email,
					password: encryptedPassword.hash,
					question,
					answer: encryptedAnswer.hash,
					wishlist: [],
					cart: [],
				};
				console.log(user);

				try {
					const NewUser = new User(user);
					await NewUser.save();
					response.status(201).send({
						success: true,
						message: "User has been registered to our database",
					});
				} catch (error) {
					response.status(500).send({ success: false, message: error });
				}
			} else if (!encryptedPassword.success) {
				response
					.status(500)
					.send({ success: false, message: encryptedPassword.message });
			} else {
				response
					.status(500)
					.send({ success: false, message: encryptedAnswer.message });
			}
		} else if (isUserUnique.success && !isUserUnique.result) {
			response
				.status(409)
				.send({ success: false, message: "User already exists" });
		} else {
			const { status, message } = isUserUnique;
			response.status(status).send({ success: false, message });
		}
	}
);
exports.signupRoute = signupRoute;
