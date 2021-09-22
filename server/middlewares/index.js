const { loginMiddleware } = require("./loginMiddleware");
const { emailValidation, signupParamsCheck } = require("./signupMiddleware");
const { checkAuthToken } = require("./checkAuthToken");
const { requestMiddleware } = require("./requestMiddleware");
module.exports = {
	loginParamCheck: loginMiddleware,
	emailValidation,
	signupParamsCheck,
	authorization: checkAuthToken,
	requestMiddleware,
};
