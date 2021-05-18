class AuthController {
	async login(ctx, next) {
		const { username, password } = ctx.request.body;
		console.log(username, password);
		ctx.body = '登录成功';
		await next();
	}
}

module.exports = new AuthController();
