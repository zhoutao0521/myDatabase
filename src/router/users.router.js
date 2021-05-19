const Router = require('koa-router');

// self
const { addUser, getAvatarById } = require('../controller/users.controller');
const {
	verifyUsers,
	handlePassword,
} = require('../middleware/users.middleware');
const router = new Router({ prefix: '/users' });

// 注册用户
router.post('/', verifyUsers, handlePassword, addUser);

// 获取用户头像
router.get('/:id/avatar', getAvatarById);
module.exports = router;
