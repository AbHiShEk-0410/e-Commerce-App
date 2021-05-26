const {
    findUserInDb
} = require("../utilities")

function loginMiddleware(request, response, next) {
    let {
        username,
        email,
        password
    } = request.body;
    if (username !== undefined && password !== undefined) {
        const userInfo = findUserInDb({
            username
        })
        userInfo === undefined ? request.loginUser = {
            success: false,
            status: 404,
            message: "User does not exist"
        } : request.loginUser = {
            success: true,
            userInfo
        }
    } else if (email !== undefined && password !== undefined) {
        const userInfo = findUserInDb({
            email
        })
        userInfo === undefined ? request.loginUser = {
            success: false,
            status: 404,
            message: "User does not exist"
        } : request.loginUser = {
            success: true,
            userInfo: userInfo
        }
    } else {
        request.loginUser = {
            success: false,
            status: 400,
            message: "Missing Parameters"
        }
    }
		next()
}
exports.loginMiddleware = loginMiddleware