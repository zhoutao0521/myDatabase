const connection = require('../app/database');
class TagServer {
	async create(name) {
		const statement = `insert into tags (name) values (?);`;
		const result = await connection.execute(statement, [name]);
		return result[0];
	}

	async getTagByName(name) {
		const statement = `select * from tags where name =?;`;
		const result = await connection.execute(statement, [name]);
		return result[0];
	}
}

module.exports = new TagServer();
