const Router = require('koa-router');

// self
const {
	verifyAuth,
	verifyPermission,
} = require('../middleware/auth.middleware');

const { create } = require('../controller/tag.controller');
const router = new Router({ prefix: '/tag' });

// 创建评论(动态)
router.post('/', verifyAuth, create);

module.exports = router;
