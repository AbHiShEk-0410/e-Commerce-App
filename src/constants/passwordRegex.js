export const password = {
	expression: new RegExp(
		"^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"
	),
	warning:
		"Password must contain at least 8 characters, including upper, lower, number and special character",
};
