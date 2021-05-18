const Router = require('koa-router');

// self
const { addUser } = require('../controller/users.controller');
const {
	verifyUsers,
	handlePassword,
} = require('../middleware/users.middleware');
const router = new Router({ prefix: '/users' });

// 注册用户
router.post('/', verifyUsers, handlePassword, addUser);

module.exports = router;
