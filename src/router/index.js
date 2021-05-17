const { resolve } = require('path');
const { readdir } = require('fs');

function useRouter(app) {
	readdir(resolve(__dirname, '../router'), (err, files) => {
		if (err) return console.log(err);
		files.forEach((filename) => {
			if (filename != 'index.js') {
				const router = require(resolve(__dirname, filename));
				app.use(router.routes());
				app.use(router.allowedMethods());
			}
		});
	});
}
// useRouter();

module.exports = useRouter;
