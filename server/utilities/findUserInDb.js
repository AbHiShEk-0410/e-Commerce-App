const {
    users
} = require("../database/usersDB")
function findUserInDb(condition){
	const query = Object.keys(condition)[0]
	return users.find(user => user[query] === condition[query])
}
exports.findUserInDb = findUserInDb