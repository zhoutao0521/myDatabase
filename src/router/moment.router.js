const Router = require('koa-router');

// self
const { verifyAuth } = require('../middleware/auth.middleware');
const { create } = require('../controller/moment.controller');

const router = new Router({ prefix: '/moment' });

// 注册用户
router.post('/', verifyAuth, create);

module.exports = router;
