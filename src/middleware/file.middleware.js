const path = require('path');

const Multer = require('koa-multer');
const { AVATAR_PATH, PIC_PATH } = require('../constants/pathType');

const avatarStorage = Multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(AVATAR_PATH);
		return cb(null, AVATAR_PATH);
	},
	filename: (req, file, cb) => {
		return cb(null, Date.now() + path.extname(file.originalname));
	},
});
const avatarUpload = Multer({
	storage: avatarStorage,
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
