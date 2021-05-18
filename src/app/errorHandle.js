// self
const errorTypes = require('../constants/errorTypes');
function errorHandle(err, ctx) {
	let status = 404;
	let message = 'not found';
	switch (err.message) {
		case errorTypes.USERNAME_AND_PASSWOED_IS_REQUIRED:
			status = 400; // bad request
			message = '用户名和密码不能为空';
			break;
		case errorTypes.USER_IS_EXIST:
			status = 409; // conflic
			message = '用户名已经存在';
			break;
		case errorTypes.USER_DO_NOT_EXIST:
			status = 400;
			message = '该用户不存在';
			break;
		case errorTypes.PASSWORD_IS_WRONG:
			status = 400;
			message = '密码错误';
	}
	ctx.status = status;
	ctx.body = message;
}

module.exports = errorHandle;
