const conn = require('../app/database');

class UsersServer {
	async getUserByName(username) {
		const statement = `select * from users where username = ?;`;
		const [result] = await conn.execute(statement, [username]);
		return result;
	}
	async addUser(user) {
		const { username: name, password: ps } = user;
		console.log(name, ps);
		const statement = `insert into users (username,password) values (?,?);`;
		const [result] = await conn.execute(statement, [name, ps]);
		return !!Object.keys(result).length;
	}
}

module.exports = new UsersServer();
