const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()
const {
    users
} = require("../database/usersDB")

const userRoute = express.Router();
userRoute.use(jsonParser);
userRoute.get("/", function(request, response) {
    setTimeout((() => {
        response.status(200).send({
            data: users
        })
    }), 2000)
})
userRoute.post("/:id", function(request, response) {
    response.send(request.params.id)
})
exports.userRoute = userRoute