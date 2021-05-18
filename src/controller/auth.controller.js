class AuthController {
	async login(ctx, next) {
		const { username, password } = ctx.request.body;
		ctx.body = `${username},登录成功`;
		await next();
	}
}

module.exports = new AuthController();
