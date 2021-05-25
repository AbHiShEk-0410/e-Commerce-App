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
        userInfo === {} ? request.user = {
            success: false,
            status: 404,
            message: "User does not exist"
        } : request.user = {
            success: true,
            userInfo
        }
    } else if (email !== undefined && password !== undefined) {
        const userInfo = findUserInDb({
            email
        })
        userInfo === undefined ? request.user = {
            success: false,
            status: 404,
            message: "User does not exist"
        } : request.user = {
            success: true,
            userInfo: userInfo
        }
    } else {
        request.user = {
            success: false,
            status: 400,
            message: "Missing Parameters"
        }
    }
		next()
}
exports.loginMiddleware = loginMiddleware