const mysql = require('mysql2');
const { createPool } = require('mysql2/promise');
const {
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_NAME,
} = require('./config');

const connections = mysql.createPool({
	host: DATABASE_HOST,
	port: DATABASE_PORT,
	user: DATABASE_USER,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
});

connections.getConnection((err, conn) => {
	conn.connect((err) => {
		if (err) return console.log(err);
		console.log('连接数据库成功');
	});
});

module.exports = connections.promise();
