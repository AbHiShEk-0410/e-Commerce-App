export function checkSignupParams(userDetails) {
	const emailExpression = new RegExp(
		"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-z]{2,}$"
	);
	const { name, email, password, confirmPassword, question, answer } =
		userDetails;
	if (!!name && name.length > 3) {
		if (emailExpression.test(email)) {
			if (!!password && !!confirmPassword && password === confirmPassword) {
				if (!!question) {
					if (!!answer) {
						return {
							success: true,
						};
					} else {
						return {
							success: false,
							message: "Please enter security answer",
						};
					}
				} else {
					return {
						success: false,
						message: "Please select a security question",
					};
				}
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
