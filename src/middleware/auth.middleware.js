const jwt = require('jsonwebtoken');
// self
const errorTypes = require('../constants/errorTypes');
const { getUserByName } = require('../server/users.server');
const { md5Password } = require('../utils');
const { PUBLIC_KEY } = require('../app/config');
const momentServer = require('../server/auth.server');

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
	// console.log(users);
	const user = users[0];
	if (!users.length) {
		return ctx.app.emit('error', new Error(errorTypes.USER_DO_NOT_EXIST), ctx);
	}

	// 存在,判断密码是否正确
	if (md5Password(password) !== user.password) {
		return ctx.app.emit('error', new Error(errorTypes.PASSWORD_IS_WRONG), ctx);
	}

	ctx.user = user;
	await next();
};

const verifyAuth = async function (ctx, next) {
	let authorization = ctx.headers.authorization || '';
	const token = authorization.replace('Bearer ', '');
	try {
		const result = jwt.verify(token, PUBLIC_KEY, {
			algorithms: ['RS256'],
		});
		ctx.user = result;
		await next();
	} catch (err) {
		ctx.app.emit('error', new Error(errorTypes.UNAUTHORIZATION), ctx);
	}
};

const verifyPermission = async function (ctx, next) {
	const { momentId } = ctx.params;
	const { id } = ctx.user;
	const isPermission = await momentServer.checkMoment(id, momentId);
	if (!isPermission) {
		return ctx.app.emit('error', new Error(errorTypes.NOPERMISSION), ctx);
	}
	await next();
};

module.exports = {
	verifyLogin,
	verifyAuth,
	verifyPermission,
};
