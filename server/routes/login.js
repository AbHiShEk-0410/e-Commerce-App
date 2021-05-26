const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()
const {
    passwordValidation
} = require("../utilities")
const {
		loginParamCheck
} = require("../middlewares")

const loginRoute = express.Router();
loginRoute.use(jsonParser);
loginRoute.post("/", loginParamCheck, function(request, response) {
    try {
        const loginUser = request.loginUser
        if (loginUser.success) {
            let {
                password: userEnteredPassword
            } = request.body
            passwordValidation(userEnteredPassword, loginUser.userInfo.password).
            then((validation) => {
                if (validation.success) {
                    response.status(validation.status).send({
                        success: true,
                        result: validation.result
                    })
                } else {
                    response.status(validation.status).send({
                        success: false,
                        message: validation.message
                    })
                }
            })
        } else {
            throw new Error(JSON.stringify(loginUser))
        }
    } catch (error) {
        const {
            status,
            message
        } = JSON.parse(error.message)
        response.status(status).send({
            success: false,
            message: message
        })
    }
})
exports.loginRoute = loginRoute