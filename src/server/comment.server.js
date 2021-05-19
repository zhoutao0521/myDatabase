const connection = require('../app/database');
class CommentServer {
	async create(userId, momentId, content) {
		try {
			const statement = `insert into comment (user_id,moment_id,content) values (?,?,?);`;
			const result = await connection.execute(statement, [
				userId,
				momentId,
				content,
			]);
			return result[0];
		} catch (error) {
			console.log(error);
		}
	}

	async reply(userId, momentId, commentId, content) {
		try {
			const statement = `insert into comment (user_id,moment_id,comment_id,content) values (?,?,?,?);`;
			const result = await connection.execute(statement, [
				userId,
				momentId,
				commentId,
				content,
			]);

			return result[0];
		} catch (err) {
			console.log(err);
		}
	}

	async update(id, content) {
		try {
			console.log(id, content);
			const statement = `update comment set content=? where id=?;`;
			const result = await connection.execute(statement, [content, id]);
			console.log(result[0]);
			return result[0];
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new CommentServer();
