const connection = require('../app/database');
class AuthServer {
	async checkSource(name, userId, id) {
		try {
			console.log(name, userId, id);
			const statement = `select * from ${name} where user_id = ? && id = ?;`;
			const result = await connection.execute(statement, [userId, id]);
			console.log(result[0]);
			return !!result[0].length;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new AuthServer();
