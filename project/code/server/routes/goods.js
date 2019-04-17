var express = require('express');
var router = express.Router();

// 引入连接数据库对象
const connection = require('./js/conn');

// 设置响应头，解决跨域问题
router.all('*',(req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
    next();  // 放行
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


// 商品添加
router.post('/goodsadd',(req,res) => {
    // 接收前端参数
    let {classify,productBarCode,productName,productSalesPrice,productNumber} = req.body;

    // 写sql
    const sqlStr = `insert into goods(goods_classify,goods_code,goods_name,goods_sales_price,goods_number) values('${classify}','${productBarCode}','${productName}','${productSalesPrice}','${productNumber}')`;
    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 判断data中affectedRows是否大于0 ，大于0则添加成功
		if(data.affectedRows >0 ){
            res.send({code: 0, reason :'添加商品成功'})
        }else{
            res.send({code: 1, reason :'添加商品失败'})
        }
	})
    
})

// 通过分页 获取商品添加列表
router.get('/goodsListData',( req, res ) => {
    // 接收当前页码和每页总条数
    let {currentPage,pageSize,classify,keyWord} = req.query;
    // 写sql
    let sqlStr = `select * from goods where 1=1`;

    if(classify !== '' && classify !== '全部'){
        sqlStr += ` and goods_classify = '${classify}'`
    }

    if(keyWord !== ''){
        sqlStr += ` and (goods_code like '%${keyWord}%' or goods_name like '%${keyWord}%')`
    }

    // 拼接排序
	sqlStr += ` order by create_date desc`;

    // 执行sql
    connection.query(sqlStr,(err, data) => {
        // 从数据库中查询所有的商品列表，响应给前端
        if(err) throw err;
        // 计算商品总条数
        let total = data.length;

        // 计算跳过的页数
        let n = (currentPage-1) * pageSize;
        // 写sql
        sqlStr += ` limit ${n},${pageSize}`
        connection.query(sqlStr,(err,data) => {
            if(err) throw err;
            res.send({ data , total });
        })
    })
})

// 删除商品
router.get('/delgoods', (req,res) => {
    // 接收参数
    let { id } = req.query;
    // 写sql
    const sqlStr = `delete from goods where id=${ id }`;
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0, reason:'删除成功'});
        }else{
            res.send({code:1, reason:'删除失败'});
        }
    })
})

// 数据回填
router.get('/editGoods',(req,res) => {
    let { id } = req.query;

    const sqlStr = `select * from goods where id=${ id }`
    connection.query(sqlStr,(err,data) => {
        if(err) throw er;
        res.send(data);
    })
})

// 保存修改数据，并响应给前端
router.post('/savegoods',(req,res) => {
    
    // 接收参数
    let { goodsCode,goodsName,goodsClassify,goodsSalesPrice,goodsNumber,id } = req.body;
    const sqlStr = `update goods set goods_code='${goodsCode}',goods_classify='${goodsClassify}',goods_name='${goodsName}',goods_sales_price='${goodsSalesPrice}',goods_number='${goodsNumber}' where id=${id}`;
    // console.log(sqlStr);
    connection.query(sqlStr,(err, data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0, reason:'修改商品成功'});
        }else{
            res.send({code:1, reason:'修改商品失败'});
        }
    })
})

// 查询数据
router.get('/search',(req,res) => {
    
    // 接收参数
    let { classify, keyWord } = req.query;
    
    let sqlStr = `select * from goods where 1=1`;

    if(classify !== '' && classify !== '全部'){
        sqlStr += ` and goods_classify = '${classify}'`
    }

    if(keyWord !== ''){
        sqlStr += ` and (goods_code like '%${keyWord}%' or goods_name like '%${keyWord}%')`
    }

    connection.query(sqlStr,(err,data)=> {
        if(err) throw err;
        res.send(data);
    })
})

// 批量删除
router.get('/batchdel', (req,res) => {
    
    // 接收id
    let { batchDelId } = req.query;
    const sqlStr = `delete from goods where id in (${ batchDelId })`
    
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
module.exports = router;
