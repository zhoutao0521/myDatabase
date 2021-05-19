const connection = require('../app/database');
class FileServer {
	async addAvatarInfo(id, mimetype, filename, size) {
		const statement = `insert into avatar (user_id,mimetype, filename, size) values (?,?,?,?);`;
		const result = await connection.execute(statement, [
			id,
			mimetype,
			filename,
			size,
		]);
		console.log(result[0]);
		return result;
	}

	async getAvatarById(id) {
		const statement = `select * from avatar where user_id = ?;`;
		const result = await connection.execute(statement, [id]);
		return result[0][0];
	}
}

module.exports = new FileServer();
