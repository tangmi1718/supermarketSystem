var express = require('express');
var router = express.Router();

// 引入数据库连接
const connection = require('./js/conn')

// 引入jsonwebtoken
const jwt = require('jsonwebtoken');

// 设置响应头，解决跨域
router.all('*',(req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
    next();
})


/* --------------------  验证token合法性开始  ---------------- */ 
// 准备一个签名（秘钥）
const secretKey = 'itsource';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt ({
            secret: secretKey
}).unless({
    path: ['/login/checkLogin']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法...');
    }
})

/* --------------------  验证token合法性结束  ---------------- */ 



// 登录验证用户
router.post('/checkLogin',( req,res) => {
    // 接收参数
    let {account,password} = req.body;
    // 构造sql
    const sqlStr = `select * from account where account='${account}' and password='${password}'`;
    // console.log(sqlStr);
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.length){
            // 生成token
            const token = jwt.sign(Object.assign({}, data[0]),  secretKey, { expiresIn:  60*60 } )
            
            res.send({code :0,reason:'欢迎您，登录成功！',token })
        }else{
            res.send({code :1,reason:'登录失败，请检查账号和密码！'})
        }
    })
})

// 显示当前的登录账号
router.get('/getcurrentaccount',(req,res) => {
    res.send(req.user.account);
})


module.exports = router;
