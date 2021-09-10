import {createStore} from 'vuex';
import index from './modules/index';
// const getModules = (group, result) => {
//   group.forEach((item) => {
//     const key = item.replace(/(^\.\/)|(\.js)/g, '');
//     result[key] = file(item).default || file(item);
//   });
//   return result;
// };
// const file = require.context('./modules', false, /\.js$/);
// const modules = getModules(file.keys());

export default createStore({
  // ...
  state:()=>{
    return {}
  },
  getters:{},
  modules:{
    index
  }
});
