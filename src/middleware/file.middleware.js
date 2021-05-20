const Multer = require('koa-multer');

const { AVATAR_PATH, PIC_PATH } = require('../constants/pathType');

const avatarUpload = Multer({
	dest: AVATAR_PATH,
});
const picUpload = Multer({
	dest: PIC_PATH,
});

const avatarHandler = avatarUpload.single('avatar');
const picHandler = picUpload.array('pic');

module.exports = {
	avatarHandler,
	picHandler,
};
