# todolist-koa2-vue3
koa2+mysql+vue3+vuex 

#### 学习 KOA

##### 相关入门级别的学习资料

KOA

> https://www.itying.com/koa/guide-database.html 
> http://www.ruanyifeng.com/blog/2017/08/koa.html
>
> https://www.koajs.com.cn/

安装My SQL 和 Navcat Permium

> https://www.w3school.com.cn/sql/sql_insert.asp
>
> https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.26-macos11-x86_64.dmg

问题
Mysql中createConnection 和 creatPool 的区别？

**createConnection**

1 createConnection 方法创建连接对象，即创建一个表示与 mysql 数据库服务器之间连接的 connection 对象

2 用connection 的 connect 方法建立连接

3 用connection.query("sql查询语句",(err, row,fields)=>{}) 查询数据

4 用connection.end() 关闭连接

**createPool**

1 使用createPool创建连接池

2 从连接池中取出连接

```javascript
pool.getConnection(function(err,connection))
```

3 当连接不再使用时候，用connection对象的release方法将其归还

```javascript
connection.query("sql",(err, row,fields)=>{}) 查询数据
connection.release()
```

4 当连接不再需要使用且需要从连接池中移除时,用connection对象的destory 方法,连接移除后，连接的数量减一

```javascript
connection.destroy();
```

5 当一个连接池不再使用，用连接池的 end 方法关闭连接池

```javascript
pool.end();
```

##### *连接数据库的时候遇到的问题*

##### *报错信息如下：*

```shell
  code: 'ER_NOT_SUPPORTED_AUTH_MODE',
  errno: 1251,
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
  sqlState: '08004',
  fatal: true
```

##### *原因：*

mysql8.0以上加密方式，Node目前还不支持。

##### *解决方案：*

```javascript
//1 替换为mysql连接密码
ALTER USER ‘root’@‘localhost’ IDENTIFIED BY ‘password’ PASSWORD EXPIRE NEVER;

//2 修改root密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '自己的新的root用户的密码';

//3 刷新权限
FLUSH PRIVILEGES; 

//4 用新密码重新连接数据库 

//5 重启 Node 发现问题已解决。
```

#### [koa-router](https://www.npmjs.com/package/koa-router)

```
const Router = require('koa-router');

const koaRouter = new Router();
app.use(koaRouter.routes());

async function queryUser(ctx){
 //......
}

koaRouter.get('/api/queryUser',queryUser);
```

#### [koa-body](https://www.npmjs.com/package/koa-body)
**[koa-logger](https://www.npmjs.com/package/koa-logger)**

koa2+vite+vue3+vuex

-  创建项目

  ```
  # npm 6.x
  npm init vite@latest my-vue-app --template vue
  
  # npm 7+, 需要额外的双横线：
  npm init vite@latest my-vue-app -- --template vue
  
  # yarn
  yarn create vite my-vue-app --template vue
  ```

- 安装项目必要的包

  ```json
  {
    "name": "koa-demo-todolist",
    "version": "0.0.0",
    "scripts": {
      "run:koa": "node server/index.js",
      "dev": "vite",
      "build": "vite build",
      "serve": "vite preview"
    },
    "dependencies": {
      "axios": "^0.21.4",
      "koa": "^2.13.1",
      "koa-body": "^4.2.0",
      "koa-bodyparser": "^4.3.0",
      "koa-logger": "^3.2.1",
      "koa-router": "^10.1.1",
      "mysql": "^2.18.1",
      "node": "^16.6.1",
      "sass": "^1.39.0",
      "vue": "^3.2.6",
      "vuex": "^4.0.2"
    },
    "devDependencies": {
      "@rollup/plugin-alias": "^3.1.5",
      "@vitejs/plugin-vue": "^1.6.1",
      "@vue/compiler-sfc": "^3.2.6",
      "vite": "^2.5.2"
    }
  }
  
  ```

  

- 写出页面基本功能和结构,利用 vuex和本地存储完成页面功能

  ![image-20210910150744570](https://tva1.sinaimg.cn/large/008i3skNgy1gubjrpcogvj61ph0u041i02.jpg)

- 连接数据库

  <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gubjhj47fcj60xr0u0q4d02.jpg" alt="image-20210910145754305" style="zoom: 25%;" />

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gubjjjh0gqj61io0ec75x02.jpg" alt="image-20210910145943356" style="zoom:50%;" />

- 将已完成的页面改造并请求真实的数据库数据
  <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gubjv6yly8j60em0psgn002.jpg" alt="image-20210910151051726" style="zoom:50%;" />


