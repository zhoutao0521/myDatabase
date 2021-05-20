const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const {
	addAvatarInfo,
	savePicsInfo,
} = require('../controller/file.controller');
const { avatarHandler, picHandler } = require('../middleware/file.middleware');
const router = new Router({ prefix: '/upload' });

// 上传头像
router.post('/:id/avatar', verifyAuth, avatarHandler, addAvatarInfo);

// 上传图片
router.post('/pic', verifyAuth, picHandler, savePicsInfo);
module.exports = router;
