const errorTypes = require('../constants/errorTypes');
const { getUserByName } = require('../server/users.server');
const { md5Password } = require('../utils');
const verifyUsers = async function (ctx, next) {
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
	const user = await getUserByName(username);
	if (user.length) {
		return ctx.app.emit('error', new Error(errorTypes.USER_IS_EXIST), ctx);
	}
	await next();
};

const handlePassword = async function (ctx, next) {
	const { password } = ctx.request.body;
	console.log(md5Password(password));
	ctx.request.body.password = md5Password(password);
	await next();
};

module.exports = {
	verifyUsers,
	handlePassword,
};
