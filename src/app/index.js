const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// self
const useRouter = require('../router/index');
const errorHandle = require('./errorHandle');
const { APP_PORT } = require('./config');

const app = new Koa();

app.use(bodyParser()); // 解析json及urlencoded数据
useRouter(app); // 注册路由
app.on('error', errorHandle); // 错误处理
app.listen(APP_PORT, () => console.log(`${APP_PORT}端口服务器启动成功`));
