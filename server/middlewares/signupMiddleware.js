const { findUserInDb } = require("../utilities");

function signupParamsCheck(request, response, next) {
	// This middleware is to check if the request contains all the required paramters for signup or not
	const { email, password, name, question, answer } = request.body;
	if (!!email && !!password && !!name && !!question && !!answer) {
		request.signupParams = {
			allParametersPresent: true,
		};
	} else {
		request.signupParams = {
			allParametersPresent: false,
		};
	}
	next();
}

async function emailValidation(request, response, next) {
	// This middleware is to check whether the user is already there in the database or not

	const { allParametersPresent } = request.signupParams;
	if (allParametersPresent) {
		try {
			const { email } = request.body;
			const userInfo = await findUserInDb({ email });
			console.log("#####", userInfo);
			request.isUserUnique = {
				success: true,
				result: userInfo === null ? true : false,
			};
		} catch (error) {
			console.log("ERRRRRRR", error);
			response.status(500).send({ success: false, message: "ISE" });
		}
	} else {
		request.isUserUnique = {
			success: false,
			status: 400,
			message: "Missing Parameters",
		};
	}
	next();
}

exports.signupParamsCheck = signupParamsCheck;
exports.emailValidation = emailValidation;
