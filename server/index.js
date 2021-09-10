const koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const { 
  queryUser,
  queryTodolist,
  addTodoList,
  delTodoList,
  editTodoList,
  finishAllTodoList,
  finishOneTodoList
} = require('./controllers/todolist.js');


const app = new koa();
const koaRouter = new Router();
app.use(koaRouter.routes());
app.use(logger());
app.use(koaBody());

// koaRouter.get('/api/queryUser',queryUser);
koaRouter.get('/api/queryUser',queryUser);
koaRouter.get('/api/todolist/query',queryTodolist);
koaRouter.post('/api/todolist/add',koaBody(),addTodoList);
koaRouter.post('/api/todolist/del',koaBody(),delTodoList);
koaRouter.post('/api/todolist/edit',koaBody(),editTodoList);
koaRouter.post('/api/todolist/finished',koaBody(),finishAllTodoList);
koaRouter.post('/api/todolist/finishedOne',koaBody(),finishOneTodoList);

app.listen('5010');
// console.log(`start at <a href='http://localhost:5010'></a>`);