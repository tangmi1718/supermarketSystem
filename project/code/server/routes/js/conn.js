// 连接mysql数据库

// 引入数据库
const mysql = require('mysql')

// 创建连接对象
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'supermarket'
});

// 执行连接方法
connection.connect();

console.log("数据连接成功");

// 暴露连接模块
module.exports = connection;















