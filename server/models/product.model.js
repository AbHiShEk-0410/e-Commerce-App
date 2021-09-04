const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: String,
	type: String,
	img: String,
	price: String,
	amount: Number,
	unit: String,
	delivery: Number || null,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
