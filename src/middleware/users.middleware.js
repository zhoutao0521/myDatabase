const errorTypes = require('../constants/errorTypes');
async function verifyUsers(ctx, next) {
	const { username = '', password = '' } = ctx.request.body;
	// 1.用户名或者密码不能为空
	if (!(username && password)) {
		return ctx.app.emit(
			'error',
			new Error(errorTypes.USERNAME_AND_PASSWOED_IS_REQUIRED),
			ctx
		);
	}
	// 2.用户名已经存在
	await next();
}

module.exports = {
	verifyUsers,
};
