const tagServer = require('../server/tag.server');
class TagController {
	async create(ctx, next) {
		const { name } = ctx.request.body;
		const result = await tagServer.create(name);
		ctx.body = result;
		await next();
	}
	async getTagByName(name) {}
}

module.exports = new TagController();
