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
	async detail(ctx, next) {
		// 获取id
		const { id } = ctx.params;
		const result = await server.detail(id);
		ctx.body = result;
		await next();
	}
	async list(ctx, next) {
		const { page, size } = ctx.query;
		const result = await server.list(page, size);
		ctx.body = result;
		await next();
	}

	async listDetail(ctx, next) {
		const { page, size } = ctx.query;
		const result = await server.listDetail(page, size);
		ctx.body = result;
		await next();
	}

	async update(ctx, next) {
		const { id } = ctx.params;
		const { content } = ctx.request.body;
		console.log(id, content);
		const result = await server.updateMomentById(id, content);
		ctx.body = result;
		await next();
	}

	async remove(ctx, next) {
		const { id } = ctx.params;
		const result = await server.removeMomentById(id);
		ctx.body = result;

		await next();
	}
}

module.exports = new MomentController();
