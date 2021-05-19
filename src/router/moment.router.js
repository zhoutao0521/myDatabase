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
router.patch('/:id', verifyAuth, verifyPermission('moment'), update);

// 删除动态
router.delete('/:id', verifyAuth, verifyPermission('moment'), remove);
module.exports = router;
