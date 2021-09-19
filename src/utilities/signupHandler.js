import { asyncAuthFunctions } from "./asyncAuthFunctions";

function checkSignupParams(userDetails) {
	const emailExpression = new RegExp(
		"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-z]{2,}$"
	);
	const { name, email, password, confirmPassword } = userDetails;
	if (!!name && name.length > 3) {
		if (emailExpression.test(email)) {
			if (!!password && !!confirmPassword && password === confirmPassword) {
				return { success: true };
			} else {
				return {
					success: false,
					message: "Either password field is empty or it does not match",
				};
			}
		} else {
			return {
				success: false,
				message: "Not a valid email address",
			};
		}
	} else {
		return {
			success: false,
			message: "Name field can't be empty or lesser than 3 characters",
		};
	}
}

export async function signupHandler(userDetails) {
	const signupParamStatus = checkSignupParams(userDetails);
	if (!signupParamStatus.success) {
	} else {
		try {
			const authResponse = await asyncAuthFunctions({
				data: {
					email: userDetails.email,
					password: userDetails.password,
				},
				query: "SIGNUP",
			});
			console.log(authResponse);
		} catch (error) {
			console.log(error);
		}
	}
}
