const { loginMiddleware } = require("./loginMiddleware");
const { emailValidation, signupParamsCheck } = require("./singupMiddleware");
const { checkAuthToken } = require("./checkAuthToken");
const { cartMiddleware } = require("./cartMiddleware");
module.exports = {
	loginParamCheck: loginMiddleware,
	emailValidation,
	signupParamsCheck,
	authorization: checkAuthToken,
	cartMiddleware,
};
