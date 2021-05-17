const Router = require('koa-router');

// self
const { addUser } = require('../controller/users.controller');
const { verifyUsers } = require('../middleware/users.middleware');
const router = new Router({ prefix: '/users' });

// 注册用户
router.post('/', verifyUsers, addUser);

module.exports = router;
