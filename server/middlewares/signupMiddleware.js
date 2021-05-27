const {
    findUserInDb
} = require("../utilities")

function signupParamsCheck(request, response, next) {
    // This middleware is to check if the request contains all the required paramters for signup or not

    const { email, password, name } = request.body;
    if (email !== undefined && password != undefined && name != undefined) {
        request.signupParams = {
            allParameters: true
        }
    }
    else {
        request.signupParams = {
            allParameters: false
        }
    }
    next();
}

function emailValidation(request, response, next) {
    // This middleware is to check whether the user is already there in the database or not
    const { allParameters } = request.signupParams;
    if (allParameters) {
        const { email } = request.body;
        const userInfo = findUserInDb({ email });
        request.isUserUnique = {
            success: true,
            result: userInfo === undefined ? true : false,
        }
    }
    else {
        request.isUserUnique = {
            success: false,
            status: 400,
            message: "Missing Parameters"
        }
    }
    next();
}

exports.signupParamsCheck = signupParamsCheck
exports.emailValidation = emailValidation