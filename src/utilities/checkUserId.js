const userIdExpression = new RegExp("^[0-9]+$");
export function checkUserId(userId) {
	return userIdExpression.test(userId);
}
