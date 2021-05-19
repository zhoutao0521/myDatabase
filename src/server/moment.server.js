const connection = require('../app/database');

const sqlFragment = `select m.id id, m.content content, m.createAt createAt,m.updateAt updateAt,json_object('id',u.id,'username',u.username) user from moment m left join users u on m.user_id = u.id`;
class MomentServer {
	async create(userId, content) {
		const statement = `insert into moment (content,user_id) values (?,?);`;
		const result = await connection.execute(statement, [content, userId]);
		return result[0];
	}
	async detail(id) {
		const statement = `
    select 
m.id id,
m.content content,
json_object('id',u.id,'name',u.username) user,
if(count(tm.tag_id),
json_arrayagg(
json_object('id',tm.tag_id,'name',t.name)
),null)
tagsList,
(
select 
if(
count(u.id),json_arrayagg(
json_object('id',c.id,'content',c.content,'user',json_object('id',u.id,'name',u.username))
),null
) comments
from moment m1
left join comment c on c.moment_id = m1.id
left join users u on u.id = c.user_id
where m1.id = m.id
group by m1.id
)  comments
from moment m
left join users u on m.user_id = u.id
left join tags_moment tm on tm.moment_id = m.id
left join tags t on t.id = tm.tag_id
where m.id = ?
group by m.id;
`;
		const result = await connection.execute(statement, [id]);
		return result[0];
	}
	async list(page, size) {
		const offset = (page - 1) * size + '';
		const statement = `select m.id id, m.content content, m.createAt createAt,m.updateAt updateAt,json_object('id',u.id,'username',u.username) user,
    (select count(*) from comment c where c.moment_id = m.id) commentCount,
    (select count(*) from tags_moment tm where m.id = tm.moment_id) tagsCount
    from moment m left join users u on m.user_id = u.id limit ? offset ?;`;
		try {
			const result = await connection.execute(statement, [size, offset]);
			return result[0];
		} catch (err) {
			console.log(err);
		}
	}

	async listDetail(page, size) {
		const offset = (page - 1) * size + '';
		// const statement = `select m.id id, m.content content, m.createAt createAt,m.updateAt updateAt,
		// json_object('id',u.id,'username',u.username) author,
		// json_arrayagg(json_object('id',c.id,'content',c.content,'user',json_object('id',cu.id,'username',cu.username))) commentList
		// from moment m
		// left join users u on m.user_id = u.id
		// left join comment c on m.id = c.moment_id
		// left join users cu on c.user_id = cu.id
		// limit ? offset ?;`;
		const statement = `
    select 
m.id id,
m.content content,
json_object('id',u.id,'name',u.username,'avatarUrl',u.avatar_url) user,
if(count(tm.tag_id),
json_arrayagg(
json_object('id',tm.tag_id,'name',t.name)
),null)
tagsList,
(
select 
if(
count(u.id),json_arrayagg(
json_object('id',c.id,'content',c.content,'user',json_object('id',u.id,'name',u.username,'avatarUrl',u.avatar_url))
),null
) comments
from moment m1
left join comment c on c.moment_id = m1.id
left join users u on u.id = c.user_id
where m1.id = m.id
group by m1.id
)  comments
from moment m
left join users u on m.user_id = u.id
left join tags_moment tm on tm.moment_id = m.id
left join tags t on t.id = tm.tag_id
group by m.id
limit ? offset ?
;`;
		try {
			console.log('here');
			const result = await connection.execute(statement, [size, offset]);
			// console.log(result);
			return result[0];
		} catch (err) {
			console.log(err);
		}
	}

	async updateMomentById(id, content) {
		console.log(id, content);
		const statement = `update moment set content=? where id=?;`;
		const result = await connection.execute(statement, [content, id]);
		return result[0];
	}

	async removeMomentById(id) {
		const statement = `delete from moment where id = ?;`;
		const result = await connection.execute(statement, [id]);
		return result[0];
	}

	async checkMomentExistTag(momentId, tagId) {
		const statement = `select * from tags_moment where moment_id=?&&tag_id=?;`;
		const result = await connection.execute(statement, [momentId, tagId]);
		return !!result[0].length;
	}

	async addTags(momentId, tagId) {
		const statement = `insert into tags_moment (moment_id,tag_id) values (?,?);`;
		const result = await connection.execute(statement, [momentId, tagId]);
		return result;
	}
}

module.exports = new MomentServer();
