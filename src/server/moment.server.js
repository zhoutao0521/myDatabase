const connection = require('../app/database');
class MomentServer {
	async create(userId, content) {
		const statement = `insert into moment (content,user_id) values (?,?);`;
		const result = await connection.execute(statement, [content, userId]);
		return result[0];
	}
}

module.exports = new MomentServer();