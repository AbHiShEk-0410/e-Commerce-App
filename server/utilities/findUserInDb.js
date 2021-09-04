const { User } = require("../models/user.model");
async function findUserInDb(condition) {
	const query = Object.keys(condition)[0];

	try {
		const response = await User.findOne({ [query]: condition[query] });
		return response;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}
exports.findUserInDb = findUserInDb;
