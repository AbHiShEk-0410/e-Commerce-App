const bcrypt = require("bcrypt")
async function encryptPassword(password, saltRounds = 10){
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword =  await bcrypt.hash(password, salt);
				return {success : true, hash : encryptedPassword}
    } catch (error) {
        return {success : false, error}
		}
};
exports.encryptPassword = encryptPassword