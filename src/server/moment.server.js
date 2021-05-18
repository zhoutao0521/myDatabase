const connection = require('../app/database');
class MomentServer {
	async create(userId, content) {
		const statement = `insert into moment (content,user_id) values (?,?);`;
		const result = await connection.execute(statement, [content, userId]);
		return result[0];
	}
	async detail(id) {
		const statement = `select m.id id, m.content content, m.createAt createAt,m.updateAt updateAt,json_object('id',u.id,'username',u.username) user from moment m left join users u on m.user_id = u.id where m.id = ?;`;
		const result = await connection.execute(statement, [id]);
		return result[0];
	}
	async list(page, size) {
		const offset = (page - 1) * size + '';
		const statement = `select m.id id, m.content content, m.createAt createAt,m.updateAt updateAt,json_object('id',u.id,'username',u.username) user from moment m left join users u on m.user_id = u.id limit ? offset ?;`;
		try {
			console.log(offset, size);
			const result = await connection.execute(statement, [size, offset]);
			return result[0];
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new MomentServer();
