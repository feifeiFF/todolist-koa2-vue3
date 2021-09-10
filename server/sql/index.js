const mysql = require('mysql');
const {database} = require('../config/index.js');

const pool = mysql.createPool(database);

class Mysql{
  constructor(){

  }
  query(sql){
    return new Promise((resolve,reject)=>{
      pool.getConnection(function(err,connection){
        if(err){
          reject(err);
        }else{
          connection.query(sql,(err,rows,fileds)=>{
             if(err){
               reject(err);
             }else{
               resolve(rows);
             }
             connection.release();
          })
        }
      })
    });
  }
}

const MySql = new Mysql();

const todoList =
  `create table if not exists todoList(
        id INT NOT NULL AUTO_INCREMENT,
        content VARCHAR(100) NOT NULL,
        isFinished BOOLEAN NOT NULL,
        PRIMARY KEY ( id )
  );`

let createTable = function (sql) {
  return MySql.query(sql)
}

// Create todolist table
createTable(todoList);

const myQuery = ()=>{
  const _sql = "SELECT * FROM `demo0`.`user` LIMIT 0,1000";
  return MySql.query(_sql);
}

// Insert todo
const addTodo =  (data)=>{
  const addTodoSql = `INSERT INTO todoList (content) VALUES ('${data.content}')` ; 
  return  MySql.query(addTodoSql);
}

// Delete todo
const delTodo = (data)=>{
  const _sql = `DELETE FROM demo0.todoList WHERE id=${data.index}`; 
  return  MySql.query(_sql);
}

// Update todo
const editTodo = (data)=>{
 const _sql = `UPDATE demo0.todoList SET content="${data.content}" WHERE id=${data.id}`;
 return  MySql.query(_sql);
}

// Query todolist
const todolistQuery = ()=>{
  const _sql = "SELECT * FROM `demo0`.`todoList` LIMIT 0,1000"; 
  return MySql.query(_sql);
}

// Complete all tasks
const finishAllTodo = (data) => {
  const _sql = `UPDATE demo0.todoList SET isFinished=${data.isFinished}`;
  return MySql.query(_sql);
}

// Complete one tasks
const finishOneTodo = (data) => {
  const _sql = `UPDATE demo0.todoList SET isFinished=${data.isFinished} WHERE id=${data.id}`;
  return MySql.query(_sql);
}


module.exports = {
  myQuery,
  MySql,
  addTodo,
  delTodo,
  editTodo,
  todolistQuery,
  finishAllTodo,
  finishOneTodo
}