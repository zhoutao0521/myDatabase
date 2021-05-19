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
}

module.exports = new CommentServer();
