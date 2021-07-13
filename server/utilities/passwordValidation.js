const bcrypt = require("bcrypt");
async function passwordValidation(userEnteredPassword, hashValue) {
	try {
		const isPasswordSame = await bcrypt.compare(userEnteredPassword, hashValue);
		return {
			success: true,
			status: isPasswordSame ? 200 : 401,
			result: isPasswordSame,
		};
	} catch (error) {
		return {
			success: false,
			message: error.message,
			status: 500,
		};
	}
}
exports.passwordValidation = passwordValidation;
