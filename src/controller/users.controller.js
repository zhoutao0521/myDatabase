class Users {
	// 添加用户
	async addUser(ctx, next) {
		console.log('添加用户');
		ctx.body = '添加用户成功';
		await next();
	}
}

module.exports = new Users();
