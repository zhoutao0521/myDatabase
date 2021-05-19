const commentServer = require('../server/comment.server');
class CommentController {
	async create(ctx, next) {
		const { id: userId } = ctx.user;
		const { momentId, content } = ctx.request.body;
		const result = await commentServer.create(userId, momentId, content);
		ctx.body = result;
		await next();
	}

	async reply(ctx, next) {
		const { id: userId } = ctx.user;
		const { momentId, content } = ctx.request.body;
		const { commentId } = ctx.params;

		const result = await commentServer.reply(
			userId,
			momentId,
			commentId,
			content
		);
		ctx.body = result;
		await next();
	}
}
module.exports = new CommentController();
