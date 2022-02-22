const Koa = require('koa');
const InitManager = require('./core/init');
const parser = require('koa-bodyparser');
const catchError = require('./middlewares/exception');

require('./app/models/user');

const app = new Koa();
app.use(parser());
app.use(catchError);
InitManager.initCore(app);


app.listen(8888);


// app是应用程序对象, 包含了很多中间件

/**
 * js中包和模块的导入导出方式
 * 1. commonJS require
 * 2. es6 import from
 * 3. AMD
 * nodejs中无法直接使用import from, 这个特性处于试验特性
 */

/**
 * async
 * 1. function包装为promise
 *
 * await
 * 1. 求值
 * 2. 阻塞线程
 */

/**
 * 版本号携带策略
 * 1. 路径
 * 2. 查询参数
 * 3. header
 */