const express = require('express');
const {products} = require("../database/productsDB")
const productRoute = express.Router();

productRoute.get("/", function(request, response){
	setTimeout((() => {
response.status(200).send({data : products})
}), 2000)
	})
exports.productRoute = productRoute