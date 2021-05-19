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

	async addAvatar(id, url) {
		const statement = `update  users set avatar_URL= ? where id = ?;`;
		const result = await conn.execute(statement, [url, id]);
		console.log(result[0]);
		return result[0];
	}
}

module.exports = new UsersServer();
