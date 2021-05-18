const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');
class AuthController {
	async login(ctx, next) {
		const { id, username } = ctx.user;
		let token;
		try {
			token = jwt.sign({ id, username }, PRIVATE_KEY, {
				expiresIn: 60 * 60 * 24,
				algorithm: 'RS256',
			});
		} catch (err) {
			console.log(err);
		}
		ctx.body = {
			id,
			username,
			token,
		};
		await next();
	}
	async success(ctx, next) {
		console.log(ctx.user);
		ctx.body = '测试成功';
		await next();
	}
}

module.exports = new AuthController();
