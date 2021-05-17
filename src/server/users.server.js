const conn = require('../app/database');

class Users {
	async checkUserExist(username) {
		const statement = `select * from users where username = ?;`;
		const [result] = await conn.execute(statement, [username]);
		return !!result.length;
	}
	async addUser(user) {
		const { username: name, password: ps } = user;
		const statement = `insert into users (username,password) values (?,?);`;
		const [result] = await conn.execute(statement, [name, ps]);

		return !!Object.keys(result).length;
	}
}

module.exports = new Users();
