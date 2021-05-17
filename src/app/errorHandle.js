// self
const errorTypes = require('../constants/errorTypes');
function errorHandle(err, ctx) {
	let status = 404;
	let message = 'not found';
	console.log(err.message);
	switch (err.message) {
		case errorTypes.USERNAME_AND_PASSWOED_IS_REQUIRED:
			status = 400; // bad request
			message = '用户名和密码不能为空';
			break;
	}
	ctx.status = status;
	ctx.body = message;
}

module.exports = errorHandle;
