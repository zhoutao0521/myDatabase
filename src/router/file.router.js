const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { addAvatarInfo } = require('../controller/file.controller');
const { avatarHandler } = require('../middleware/file.middleware');
const router = new Router({ prefix: '/upload' });

// 上传头像
router.post('/:id/avatar', verifyAuth, avatarHandler, addAvatarInfo);

module.exports = router;
