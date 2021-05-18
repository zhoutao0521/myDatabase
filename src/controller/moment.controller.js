const server = require('../server/moment.server');
class MomentController {
	async create(ctx, next) {
		// 获取userId
		const { id: userId } = ctx.user;
		// 获取moment内容
		const { content } = ctx.request.body;
		const result = await server.create(userId, content);
		ctx.body = result;
		await next();
	}
}

module.exports = new MomentController();
