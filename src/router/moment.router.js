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
	update,
	remove,
} = require('../controller/moment.controller');

const router = new Router({ prefix: '/moment' });

// 创建动态
router.post('/', verifyAuth, create);

// 获取单个动态
router.get('/:id', detail);

// 获取多条动态
router.get('/', list);

// 修改动态
router.patch('/:momentId', verifyAuth, verifyPermission, update);

// 删除动态
router.delete('/:momentId', verifyAuth, verifyPermission, remove);
module.exports = router;
