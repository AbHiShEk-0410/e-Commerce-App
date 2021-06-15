const { loginMiddleware } = require("./loginMiddleware");
const { emailValidation, signupParamsCheck } = require("./singupMiddleware");
const { checkAuthToken } = require("./checkAuthToken");
module.exports = {
	loginParamCheck: loginMiddleware,
	emailValidation,
	signupParamsCheck,
	authorization: checkAuthToken,
};
