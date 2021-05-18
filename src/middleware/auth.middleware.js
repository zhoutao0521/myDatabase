const errorTypes = require('../constants/errorTypes');
const { getUserByName } = require('../server/users.server');
const verifyLogin = async function (ctx, next) {
	let { username = '', password = '' } = ctx.request.body;
	// 用户名或者密码为空
	if (!(username && password)) {
		return ctx.app.emit(
			'error',
			new Error(errorTypes.USERNAME_AND_PASSWOED_IS_REQUIRED),
			ctx
		);
	}
	// 用户名是否存在
	const users = await getUserByName(username);
	if (!users.length) {
		return ctx.app.emit('error', new Error(errorTypes.USER_DO_NOT_EXIST), ctx);
	}

	// 存在
	await next();
};