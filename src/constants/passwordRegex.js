export const password = {
	expression: new RegExp(
		"(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
	),
	warning:
		"Password must contain at least 8 characters, including upper, lower, number and special character",
};
