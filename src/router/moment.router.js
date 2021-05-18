const Router = require('koa-router');

// self
const { verifyAuth } = require('../middleware/auth.middleware');
const { create, detail } = require('../controller/moment.controller');

const router = new Router({ prefix: '/moment' });

// 创建动态
router.post('/', verifyAuth, create);

// 获取单个动态
router.get('/:id', detail);

module.exports = router;
