const path = require('path');

const Multer = require('koa-multer');
const jimp = require('jimp');
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

// 处理图像大小
// {
//   fieldname: 'pic',
//   originalname: '2.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: './upload/pic',
//   filename: 'af1cca2a4c5297a842aca0fd6367c20f',
//   path: 'upload\\pic\\af1cca2a4c5297a842aca0fd6367c20f',
//   size: 6654
// }
const resizeImgs = async (ctx, next) => {
	const files = ctx.req.files;
	for (let file of files) {
		// console.log(file);
		const { path, destination: dest, filename } = file;
		jimp.read(path).then((img) => {
			img.resize(1080, jimp.AUTO).write(`${dest}/${filename}-larger`);
		});
		jimp.read(path).then((img) => {
			img.resize(640, jimp.AUTO).write(`${dest}/${filename}-middle`);
		});
		jimp.read(path).then((img) => {
			img.resize(320, jimp.AUTO).write(`${dest}/${filename}-small`);
		});
	}

	await next();
};

module.exports = {
	avatarHandler,
	picHandler,
	resizeImgs,
};
