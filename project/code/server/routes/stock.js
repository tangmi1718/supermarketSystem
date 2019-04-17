var express = require('express');
var router = express.Router();

// 引入数据库连接模板
const connection = require('./js/conn')

// 写一个路由 统一设置响应头，来解决跨域的问题
router.all('*', (req,res,next) => {
    // 设置响应头
    res.setHeader("Access-Control-Allow-Origin","*") //默认会拦截下面的步骤
    res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token

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



// 添加商品
router.post('/stockadd',(req,res) => {
    // 接收数据
    let {productCode,productName,productSales,productInStorage,productNumber,productStockPrice,classify} = req.body;

    // 写sql
    const sqlStr = `insert into stock(product_code,product_name,product_sales,product_instorages,product_number,product_stock_price,product_classify) values('${productCode}','${productName}','${productSales}','${productInStorage}','${productNumber}','${productStockPrice}','${classify}')`;
    console.log(sqlStr);
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code: 0,reason :'入库成功！'})
        }else{
            res.send({code: 1,reason :'入库失败！'})
        }
    })

})

// 响应出货所有列表数据给前端
router.get('/stockListByPage',(req,res) => {
    // 接收当前页码和每页总条数
    let {currentPage,pageSize,selectClassify,keyWord} = req.query;
    // 写sql
    let sqlStr = `select * from stock where 1=1`;

    if(selectClassify !== '' && selectClassify !=='全部'){
        sqlStr += ` and product_classify='${selectClassify}'`
    }

    if(keyWord !== ''){
        sqlStr += ` and (product_code like '%${keyWord}%' or product_name like '%${keyWord}%')`
    }

    sqlStr += ` order by create_date desc`

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

// 删除数据
router.get('/stockDel',(req,res) => {
    
    let {id} = req.query;

    const sqlStr = `delete from stock where id=${id}`;
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        console.log(data);
        
        if(data.affectedRows > 0){
            res.send({code: 0,reason :'删除成功！'})
        }else{
            res.send({code: 1,reason :'删除失败！'})
        }
    })
})

// 数据回填
router.get('/editstock',(req,res) => {
    let { id } = req.query;

    const sqlStr = `select * from stock where id=${ id }`
    connection.query(sqlStr,(err,data) => {
        if(err) throw er;
        res.send(data);
    })
})


// 保存修改数据，并响应给前端
router.post('/savestock',(req,res) => {
    
    // 接收参数
    let {productCode,productName,productSales,productInStorage,productNumber,productStockPrice,classify,id} = req.body;
    const sqlStr = `update stock set product_code='${productCode}',product_classify='${classify}',product_name='${productName}',product_sales='${productSales}',product_instorages='${productInStorage}',product_number='${productNumber}',product_stock_price='${productStockPrice}' where id=${id}`;
    // console.log(sqlStr);
    connection.query(sqlStr,(err, data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0, reason:'修改成功'});
        }else{
            res.send({code:1, reason:'修改失败'});
        }
    })
})

// 查询
router.get('/stocksearch',(req,res) => {
    
    let {selectClassify,keyWord} = req.query;

    let sqlStr = `select * from stock where 1=1`;

    if(selectClassify !== '' && selectClassify !=='全部'){
        sqlStr += ` and product_classify='${selectClassify}'`
    }

    if(keyWord !== ''){
        sqlStr += ` and (product_code like '%${keyWord}%' or product_name like '%${keyWord}%')`
    }

    sqlStr += ` order by create_date desc`

    connection.query(sqlStr,(err,data) => {
        if (err) throw err;
        res.send(data);
    })
})

module.exports = router;
