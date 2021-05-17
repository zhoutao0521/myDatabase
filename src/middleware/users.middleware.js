const errorTypes = require('../constants/errorTypes');
const { checkUserExist } = require('../server/users.server');
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
	const isExist = await checkUserExist(username);
	if (isExist) {
		return ctx.app.emit('error', new Error(errorTypes.USER_IS_EXIST), ctx);
	}
	await next();
}

module.exports = {
	verifyUsers,
};
