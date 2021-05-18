const Router = require('koa-router');

// self
const { login } = require('../controller/auth.controller');
const { verifyLogin } = require('../middleware/auth.middleware');
const router = new Router();

// 注册用户
router.post('/login', login);

module.exports = router;
