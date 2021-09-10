// 一、配置axios
import axios from 'axios';

let baseUrl = `${window.location.origin}/api`;
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true;

// 请求拦截器
// axios.interceptors.request.use(config => {
//   if (localStorage && localStorage.getItem('token')) {
//     const token = localStorage.getItem('token')
//     token && (config.headers.Authorization = token)
//   }
//   return config
// }, error => {
//   return Promise.error(error)
// })

// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
})

/*封装请求方式
* @param url 接口地址
*        data 携带参数
*
*
 */
export function get (url, data) {
  return axios.get(url, data)
}
// post请求
export function post (url, data) {
  return axios.post(url, data)
}
// put请求
export function put (url, data) {
  return axios.put(url, data)
}
// delete 请求
export function del (url, data) {
  return axios.delete(url, data)
}