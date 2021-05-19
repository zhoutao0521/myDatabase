const tagServer = require('../server/tag.server');
const checkAndAdd = async function (ctx, next) {
	const { tags } = ctx.request.body;
	const tagsList = [];
	for (let name of tags) {
		let result = await tagServer.getTagByName(name);
		if (!result.length) {
			const tagResult = await tagServer.create(name);
			result = await tagServer.getTagByName(name);
		}
		tagsList.push(result[0]);
	}
	ctx.tagsList = tagsList;
	await next();
};

module.exports = {
	checkAndAdd,
};
