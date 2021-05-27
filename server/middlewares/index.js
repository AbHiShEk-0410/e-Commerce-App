const { loginMiddleware } = require("./loginMiddleware")
const { emailValidation, signupParamsCheck } = require("./singupMiddleware")
module.exports = {
	loginParamCheck: loginMiddleware,
	emailValidation,
	signupParamsCheck
}