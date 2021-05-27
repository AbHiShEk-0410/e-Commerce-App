const express = require('express');
const bodyParser = require("body-parser");
const { users } = require("../database/usersDB")
const { signupParamsCheck, emailValidation } = require("../middlewares")
const { encryptPassword } = require("../utilities")

const jsonParser = bodyParser.json()
const signupRoute = express.Router();
signupRoute.use(jsonParser)
signupRoute.post("/", signupParamsCheck, emailValidation, function (request, response) {
    const isUserUnique = request.isUserUnique

    if (isUserUnique.success && isUserUnique.result) {
        const { name, email, password } = request.body;
        encryptPassword(password).then((encryptedPassword) => {
            if (encryptedPassword.success) {
                users.push({
                    id: users.length,
                    name,
                    username: undefined,
                    email,
                    password: encryptedPassword.hash,
                    wishlist: [],
                    cart: []
                })
                response.status(201).send({ success: true, message: "User has been registered to our database" })
            }
            else {
                response.status(500).send({ success: false, message: encryptedPassword.message })
            }
        })
    }
    else if (isUserUnique.success && !isUserUnique.request) {
        response.status(409).send({ success: false, message: "User already exists" })
    }
    else {
        const { status, message } = isUserUnique
        response.status(status).send({ success: false, message })
    }
})
exports.signupRoute = signupRoute