const Router = require('koa-router');

// self
const { login, success } = require('../controller/auth.controller');
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware');
const router = new Router();

// 注册用户
router.post('/login', verifyLogin, login);

// 权限测试
router.get('/test', verifyAuth, success);

module.exports = router;
