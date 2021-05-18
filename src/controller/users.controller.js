const { addUser: userAdd } = require('../server/users.server');
class UsersController {
	// 添加用户
	async addUser(ctx, next) {
		const user = ctx.request.body;
		const isSuccess = await userAdd(user);
		if (isSuccess) {
			ctx.body = '注册用户成功';
		} else {
			ctx.body = '注册用户失败';
		}

		await next();
	}
}

module.exports = new UsersController();
