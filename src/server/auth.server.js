const connection = require('../app/database');
class AuthServer {
	async checkMoment(userId, id) {
		const statement = `select * from moment where user_id = ? && id = ?;`;
		const result = await connection.execute(statement, [userId, id]);
		return !!result[0].length;
	}
}

module.exports = new AuthServer();
