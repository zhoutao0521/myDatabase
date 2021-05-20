const fs = require('fs');
const server = require('../server/moment.server');
const fileServer = require('../server/file.server');
const { PIC_PATH } = require('../constants/pathType');
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
	async addTags(ctx, next) {
		const { id } = ctx.params;
		const tagsList = ctx.tagsList;
		for (let tag of tagsList) {
			console.log(id, tag.id);
			const result = await server.checkMomentExistTag(id, tag.id);
			if (!result) {
				await server.addTags(id, tag.id);
			}
		}
		ctx.body = '添加标签成功';
		await next();
	}

	async getPicByFileName(ctx, next) {
		let { filename } = ctx.params;
		const { size } = ctx.query;
		const { mimetype } = await fileServer.getPicInfoByFileName(filename);
		const sizeArr = ['large', 'middle', 'small'];
		if (sizeArr.includes(size)) {
			filename = filename + '-' + size;
		}
		ctx.type = mimetype;
		ctx.body = fs.createReadStream(`${PIC_PATH}/${filename}`);
		await next();
	}
}

module.exports = new MomentController();
