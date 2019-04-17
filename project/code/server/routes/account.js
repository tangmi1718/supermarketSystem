var express = require('express');
var router = express.Router();

// 引入数据库连接模板
const connection = require('./js/conn')

// 写一个路由 统一设置响应头，来解决跨域的问题
router.all('*', (req,res,next) => {
    // 设置响应头
    res.setHeader("Access-Control-Allow-Origin","*") //默认会拦截下面的步骤
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, authorization"); // 允许通过头部信息authorization 携带token

    // 允许执行下面的
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



// 账号添加接收参数,响应数据给前端
router.post('/accountadd',(req,res) => {
    // 接收参数
    let { account,password,region } = req.body;

    let imgUrl = '/upload/default.jpg'; // 默认头像

    //把参数存入数据库
    // 写sql   验证账号和密码
    const sqlStr = (`insert into account(account,password,user_group,img_url) values('${account}','${password}','${region}','${imgUrl}')`);
    
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if (err) throw err;
        
        // 判断data对象中affectedRows改变的函数是否大于1
        if(data.affectedRows > 0){
            res.send({code: 0,reason:'添加账号成功！'})
        }else{
            res.send({code: 1,reason:'添加账号失败！'})
        }
    })
})

/* 请求账号列表路由 */
router.get('/accountlist', (req, res) => {
	// // 写sql
	const sqlStr = `select * from account order by create_date desc`; // 查询所有账号数据 按照时间降序

	// // 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data);
	})
})

// 删除账号
router.get('/deleteaccount',( req, res) => {
    
    // 接收id
    let { id } = req.query;
    // 构造sql
    const sqlStr = `delete from account where id=${id} `;
    console.log(sqlStr);
    
    // 执行sql
    connection.query(sqlStr,(err, data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({ code : 0,reason : "删除账号成功！"})
        }else{
            res.send({ code : 1,reason : "删除账号失败！"})
        }
    })
})

// 回填账号
router.get('/editaccount',( req, res ) => {
    // 接收id 查询对应的数据给前端
    let { id } = req.query;
    // 写sql
    const sqlStr = `select * from account where id = ${ id }`

    // 执行sql
    connection.query(sqlStr,( err,data) => {
        if( err ) throw err;
        res.send(data)
    })

})

// 修改数据 保存新数据
router.get('/saveedit', (req, res) => {
    let { account,userGroup,accountId} = req.query;
    // 根据id 修改原来的数据
    const sqlStr =`update account set account='${account}',user_group='${userGroup}' where id=${accountId} `;
    
    connection.query(sqlStr, (err,data) => {
        if(err) throw err;
        // 判断影响的行数
        if(data.affectedRows > 0){
            res.send({ code:0, reason: '修改数据成功!'})
        }else{
            res.send({ code:1, reason: '修改数据失败!'})
        }
    })
    
})

// 批量删除
router.get('/batchdel', (req,res) => {
    
    // 接收id
    let { batchDelId } = req.query;
    const sqlStr = `delete from account where id in (${ batchDelId })`
    
    connection.query(sqlStr,(err,data) => {
        if (err) throw err;
        // 判断影响的行数
        if(data.affectedRows > 0){
            res.send({ code:0, reason: '批量删除成功!'})
        }else{
            res.send({ code:1, reason: '批量删除失败!'})
        }
    })
})

/* 分页路由 */ 
router.get('/accountlistbypage', (req, res) => {
	// 接收参数
	let {currentPage, pageSize} = req.query;

	// 构造sql
	let sqlStr = `select * from account order by create_date desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 计算数据总条数
		let total = data.length;

		// 计算跳过多少条
		let n = (currentPage - 1) * pageSize;
		// 拼接分页sql
		sqlStr += ` limit ${n}, ${pageSize}`;

		// 执行sql
		connection.query(sqlStr, (err, data) => {
			if (err) throw err;
            // 把数据总条数和每个页码对应的数据发送给前端
            console.log(data);
            
			res.send({total, data})
		})
	})
})

// 验证旧密码是否正确
router.post('/checkoldpassword',(req,res) => {
    let { oldPassword} =req.body;
    
    // 当前账号密码
    let { password } = req.user;

    if(oldPassword !== password) {
        res.send({code:0, reason :'原密码输入错误！'})
    }else{
        res.send({code:1, reason :'原密码输入正确！'})
    }
    
})

// 修改密码
router.post('/passwordmodify',(req,res) => {
    // 接收新密码和旧密码
    let {newPassword} = req.body;
    let { id } = req.user;  //当前用户的id
    // 写sql
    const sqlStr = `update account set password ='${newPassword}' where id=${ id }`
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0) {
            res.send({code :0, reason:'修改密码成功！请重新登录！'})
        }else{
            res.send({code :1, reason:'修改密码失败！'})
        }
    })

})

// 检查用户名是否存在
router.get('/checkaccount',(req,res) => {
    let { account } = req.query;
    let { id } = req.user;
    const sqlStr = `select * from account where account='${account}'`;
    connection.query(sqlStr,(err,data)=> {
        if(err) throw err;
        if(!data.length){
            res.send({code :0,reason :'用户名可以使用'})
        }else{
            res.send({code :1,reason :'用户名已存在！'})
        }
    })
    
})

// 个人中心数据
router.get('/accountinfo' ,(req,res) => {
    let { id } = req.user;

    const sqlStr = `select * from account where id = ${id}`;
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        res.send(data);
        console.log(data);
        
    })
})

// 上传后端配置 
// 引入multer
const multer = require('multer');
// 配置上传到服务器放置图片的目录 和 重命名
const storage = multer.diskStorage ({
    // 图片上传到服务器的目录
    destination : 'public/upload',
    // 图片重命名
    filename (req,file,callback) {
        var fileFormat = (file.originalname).split('.')  //avarat.jpg  ['avarat','jpg]
        // 获取时间戳
        var filename = new Date().getTime();
        callback(null,filename + '.' + fileFormat[fileFormat.length-1]);
    }
})
// 上传对象
const upload = multer({
    storage
});

// 头像上传请求
router.post('/uploadavatar',upload.single('file') ,(req,res) => {
    // 获取文件明
    let filename = req.file.filename;
    //拼接路径
    let path = `/upload/${filename}`;
    // 构造sql
    const sqlStr = `update account set img_url='${path}' where id=${req.user.id}`;
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if (err) throw err;
        if(data.affectedRows > 0) {
            res.send({ code:0, reason:'头像上传成功！',path })
        }else{
            res.send({ code:1, reason:'头像上传失败！' })
        }
    })
})

module.exports = router;
