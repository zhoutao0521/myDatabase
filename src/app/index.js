const Koa = require('koa');

// self
const useRouter = require('../router/index');
const { APP_PORT } = require('./config');

const app = new Koa();

// 使用路由
useRouter(app);
app.listen(APP_PORT, () => console.log(`${APP_PORT}端口服务器启动成功`));
