// 封装后台接口方法
import { get, post } from './http.js';

// 用户列表
export const query_USER_LIST = () => get(`queryUser`);

// TodoList
export const TODO_LIST_QUERY = () => get('todolist/query')

// 添加TODO
export const TODO_LIST_ADD = (params) => post('todolist/add',{content:params});

// 删除
export const TODO_LIST_DEL = (params) => post('todolist/del',{'index':params});

// 编辑
export const TODO_LIST_EDIT = (params) => post('todolist/edit',params);

// 所有任务完成
export const TODO_LIST_ALL_FINISHED = (params) => post('todolist/finished',params);

// 完成某一任务
export const TODO_LIST_ONE_FINISHED = (params) => post('todolist/finishedOne',params);