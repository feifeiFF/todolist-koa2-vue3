const {
  addTodo,
  delTodo,
  myQuery,
  todolistQuery,
  editTodo,finishAllTodo,finishOneTodo} = require('../sql/index.js');

const addTodoList = async (ctx)=>{
  const data = await addTodo({'content':ctx.request.body.content});
  ctx.response.body = data;
}


const delTodoList = async (ctx)=>{
  const data = await delTodo({index:ctx.request.body.index});
  ctx.response.body = data;
}

const editTodoList = async (ctx)=>{
  const data = await editTodo({content:ctx.request.body.content,id:ctx.request.body.id});
  ctx.response.body = data;
}

const finishAllTodoList = async (ctx)=>{
  const data = await finishAllTodo({isFinished:ctx.request.body.isFinished});
  ctx.response.body = data;
}

const finishOneTodoList = async (ctx)=>{
  const data = await finishOneTodo({isFinished:ctx.request.body.isFinished,id:ctx.request.body.id});
  ctx.response.body = data;
}


const queryTodolist = async(ctx)=>{
  const data = await todolistQuery();
  ctx.response.body = data;  
}

const queryUser = async(ctx)=>{
  const data = await myQuery();
  ctx.response.body = data;  
}

module.exports = {
  queryTodolist,
  addTodoList,
  delTodoList,
  queryUser,
  editTodoList,
  finishAllTodoList,
  finishOneTodoList
}