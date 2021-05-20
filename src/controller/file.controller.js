const fileServer = require('../server/file.server');
const userServer = require('../server/users.server');
const { APP_PORT, APP_HOST } = require('../app/config');
class FileController {
	async addAvatarInfo(ctx, next) {
		const { mimetype, filename, size } = ctx.req.file;
		const { id } = ctx.params;
		// 添加头像信息
		await fileServer.addAvatarInfo(id, mimetype, filename, size);
		// 添加avatar字段
		const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
		await userServer.addAvatar(id, avatarUrl);
		ctx.body = '添加头像成功';
		await next();
	}
	async savePicsInfo(ctx, next) {
		const { id: userId } = ctx.user;
		const { momentId: id } = ctx.query;
		const files = ctx.req.files;
		// { mimetype, filename, size }
		// 添加图片到数据
		for (let pic of files) {
			const { mimetype, filename, size } = pic;
			await fileServer.addPicInfo(userId, id, mimetype, filename, size);
		}

		// 添加图片到
		ctx.body = '上传动态图片成功';
		await next();
	}
}
module.exports = new FileController();
