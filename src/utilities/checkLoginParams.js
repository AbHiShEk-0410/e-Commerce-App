const emailExpression = new RegExp(
	"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-z]{2,}$"
);
const usernameExpression = new RegExp(
	"[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$"
);

export function checkLoginParams({ user, password }) {
	if (
		!!user &&
		emailExpression.test(user) &&
		!!password &&
		password.length >= 8
	) {
		return {
			success: true,
			type: "email",
		};
	} else if (
		!!user &&
		usernameExpression.test(user) &&
		!!password &&
		password.length >= 8
	) {
		return {
			success: true,
			type: "username",
		};
	} else {
		return { success: false };
	}
}
