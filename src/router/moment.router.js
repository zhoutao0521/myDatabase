const Router = require('koa-router');

// self
const {
	verifyAuth,
	verifyPermission,
} = require('../middleware/auth.middleware');
const {
	create,
	detail,
	list,
	listDetail,
	update,
	remove,
	addTags,
	getPicByFileName,
} = require('../controller/moment.controller');
const { checkAndAdd } = require('../middleware/tag.middleware');

const router = new Router({ prefix: '/moment' });

// 创建动态
router.post('/', verifyAuth, create);

// 获取单个动态
router.get('/:id', detail);

// 获取多条动态
router.get('/', list);

// 获取多条动态
router.get('/detail', listDetail);

// 修改动态
router.patch('/:id', verifyAuth, verifyPermission('moment'), update);

// 删除动态
router.delete('/:id', verifyAuth, verifyPermission('moment'), remove);

// 为某动态创建标签
router.post('/:id/tags', verifyAuth, checkAndAdd, addTags);

// 获取动态图片
router.get('/pics/:filename', getPicByFileName);
module.exports = router;
