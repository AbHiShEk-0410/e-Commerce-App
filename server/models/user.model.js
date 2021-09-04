const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	username: String || null,
	email: String,
	password: String,
	cart: Array,
	wishlist: Array,
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
