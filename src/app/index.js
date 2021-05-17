const Koa = require('koa');
const { APP_PORT } = require('./config');

const app = new Koa();

app.listen(APP_PORT, () => console.log(`${APP_PORT}端口服务器启动成功`));
