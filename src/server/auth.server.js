const connection = require('../app/database');
class AuthServer {
	async checkSource(name, userId, id) {
		try {
			const statement = `select * from ${name} where user_id = ? && id = ?;`;
			const result = await connection.execute(statement, [userId, id]);
			return !!result[0].length;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new AuthServer();
