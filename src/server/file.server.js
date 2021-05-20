const connection = require('../app/database');
class FileServer {
	async addAvatarInfo(id, mimetype, filename, size) {}

	async getAvatarById(id) {
		const statement = `select * from avatar where user_id = ?;`;
		const result = await connection.execute(statement, [id]);
		return result[0][0];
	}

	async addPicInfo(userId, id, mimetype, filename, size) {
		const statement = `insert into pic (user_id,moment_id,mimetype, filename, size) values (?,?,?,?,?);`;
		await connection.execute(statement, [userId, id, mimetype, filename, size]);
	}

	async getPicInfoByFileName(filename) {
		const statement = `select mimetype from pic where filename=?;`;
		const result = await connection.execute(statement, [filename]);
		return result[0][0];
	}
}

module.exports = new FileServer();
