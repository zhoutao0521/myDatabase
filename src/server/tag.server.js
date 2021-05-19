const connection = require('../app/database');
class TagServer {
	async create(name) {
		const statement = `insert into tags (name) values (?);`;
		const result = await connection.execute(statement, [name]);
		return result[0];
	}
}

module.exports = new TagServer();
