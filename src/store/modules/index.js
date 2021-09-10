
import { 
   TODO_LIST_QUERY,
   TODO_LIST_DEL,
   TODO_LIST_EDIT,
   TODO_LIST_ADD,
   TODO_LIST_ALL_FINISHED,
   TODO_LIST_ONE_FINISHED
   } 
from '../../http/api';

export default{
  namespaced: true,
  state:()=>{
   return {
    todoList:[]
   }
  },
  getters:{},
  mutations:{
    query(state,content){
      state.todoList = content;
    },
    add(state,content){
        state.todoList.push({
          content,
          isFinished: false,
          id: Date.now(),
        });
    },
    remove(state,i){
       state.todoList.splice(i,1);
    },
    finsh(state,{i,fin = false}){
       state.todoList[i].isFinished =!fin;
    },
    allFinsh(state,data){
       state.todoList.forEach(v=>v.isFinished = !!data);
    },
    edit(i,content){
      state.todoList[i]['content'] = content;
    },
    clear(state,i){
      state.todoList = [];
    }
  },
  actions:{
   async query({commit},data){
      let res = await TODO_LIST_QUERY();
      if (res.status === 200) {
        commit('query',res.data)
      } else {
        return [];
      }
    },
    
    async del({commit},i){
      let res = await TODO_LIST_DEL(i);
      console.log(res);
      if (res.status === 200) {
        // commit('query',res.data)
      } else {
        return [];
      }
    },

   async add({commit},data){
     console.log(data,"data++>");
     let res = await TODO_LIST_ADD(data);
     if (res.status === 200) {
      commit('add',data)
      } else {
        return '';
      }
    },

    async finsh({commit},data){
      console.log(data,"data");
      let res = await TODO_LIST_ONE_FINISHED(data);
      if (res.status === 200) {
        // commit('allFinsh',data)
      } else {
        return [];
      }
     
    },

    async allFinsh({commit},data){
      let res =  await TODO_LIST_ALL_FINISHED(data);
      if (res.status === 200) {
        // commit('allFinsh',data)
      } else {
        return [];
      }
    },

    async edit({commit},data){
      let res = await TODO_LIST_EDIT(data);
      if (res.status === 200) {
       commit('edit',data)
      } else {
        return [];
      }
    },
    clear({commit}){
      commit('clear');
    }
  }
}
