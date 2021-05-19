const fs = require('fs');
const { AVATAR_PATH } = require('../constants/pathType');
const { addUser: userAdd } = require('../server/users.server');
const fileServer = require('../server/file.server');
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

	async getAvatarById(ctx, next) {
		const { id } = ctx.params;
		const { mimetype, filename } = await fileServer.getAvatarById(id);
		ctx.type = mimetype;
		ctx.body = fs.createReadStream(`${AVATAR_PATH}/${filename}`);
		await next();
	}
}

module.exports = new UsersController();
