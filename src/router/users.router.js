const Router = require('koa-router');

// self
const { addUser } = require('../controller/users.controller');
const router = new Router({ prefix: '/users' });

// 注册用户
router.post('/', addUser);

module.exports = router;
