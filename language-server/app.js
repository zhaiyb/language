const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/language';
/**
 * mongoose连接数据库
 */
mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', function() {
  console.log('db connected');
});
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 跨域中间件
const cors = require('koa-cors');
app.use(cors());
// 解析post请求中间件
const koaBody = require('koa-body');
app.use(koaBody());
/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require('./router');

app
  .use(router.routes())
  .use(router.allowedMethods());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');