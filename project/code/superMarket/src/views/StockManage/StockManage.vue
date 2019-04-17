
<template>
    <div class="stock-manage">
        <!-- 面板内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库存管理</span>
            </div>

            <!-- 内容 -->
            <div class="text item">
                <div class="searchHeader">
                    <el-form :model="stockManageForm" status-icon :rules="rules" ref="stockManageForm" label-width="100px" class="demo-ruleForm" size="small">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <!-- 选择分类 -->
                                <el-form-item  prop="classify">
                                    <el-select v-model="stockManageForm.selectClassify" placeholder="-----选择分类-----" style="width:135px;">
                                        <el-option label="全部" value="全部"></el-option>
                                        <el-option label="女装" value="女装"></el-option>
                                        <el-option label="美妆" value="美妆"></el-option>
                                        <el-option label="男装" value="男装"></el-option>
                                        <el-option label="包包" value="包包"></el-option>
                                        <el-option label="家电" value="家电"></el-option>
                                        <el-option label="零食" value="零食"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- 关键字 -->
                            <el-col :span="16">
                                <el-form-item label="关键字:" prop="keyWord">
                                    <el-row>
                                        <el-col :span="10">
                                            <el-input type="text" v-model="stockManageForm.keyWord" auto-complete="off"></el-input>
                                        </el-col>
                                        <el-col :span="5">
                                            <p class="goodsCode"> &nbsp;(商品名称条形码) </p>
                                        </el-col>
                                        <el-col :span="4">
                                            <!-- 查询 -->
                                            <el-button type="success" size="mini" @click="search">查询</el-button>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <hr>
                </div>

                <!-- 面板 -->
                <div class="goodsManageCard">
                    <!-- 表格数据 -->
                    <el-table
                        ref="goodsManageDate"
                        :data="stockManageData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                    >
                    <!-- 数据 -->
                        <el-table-column prop="product_code" label="商品条形码"></el-table-column>

                        <el-table-column prop="product_name" label="商品名称" ></el-table-column>

                        <el-table-column prop="product_classify" label="商品分类" ></el-table-column>

                        <el-table-column prop="product_stock_price" label="进价" ></el-table-column>

                        <el-table-column prop="product_instorages" label="入库" ></el-table-column>

                        <el-table-column prop="product_sales" label="已售" ></el-table-column>

                        <el-table-column prop="product_number" label="库存" ></el-table-column>

                        <el-table-column prop="goodsManage" label="管理" show-overflow-tooltip> 
                            <template slot-scope="scope">
                                <span class="el-icon-edit iconstyle" @click="handleEdit(scope.row.id)"></span>
                                <span class="el-icon-delete iconstyle" @click="handleDelete(scope.row.id)"></span>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </div>

            <!-- 修改提示模态框 -->
            <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
                <el-form :model="stockForm" :rules="dialogRules" ref="stockForm" :label-position="labelPosition" label-width="130px">
                    <!-- 商品条形码 -->
                    <el-form-item label="商品条形码 :" prop="productCode">
                        <el-input type="text" v-model="stockForm.productCode" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="所属分类" prop="classify">
                        <el-select v-model="stockForm.classify" placeholder="---选择分类---" style="width:135px;">
                            <el-option label="女装" value="女装"></el-option>
                            <el-option label="美妆" value="美妆"></el-option>
                            <el-option label="男装" value="男装"></el-option>
                            <el-option label="包包" value="包包"></el-option>
                            <el-option label="家电" value="家电"></el-option>
                            <el-option label="零食" value="零食"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <!-- 商品名称 -->
                    <el-form-item label="商品名称" prop="productName" style="width: 250px">
                        <el-input type="text" v-model="stockForm.productName" auto-complete="off" ></el-input>
                    </el-form-item>

                    <!-- 商品已售 -->
                    <el-form-item label="已售" prop="productSales">
                        <el-input type="text" v-model="stockForm.productSales" auto-complete="off"></el-input> 
                    </el-form-item>

                    <!-- 入库 -->
                    <el-form-item label="入库 :" prop="productInStorage">
                        <el-input type="text" v-model="stockForm.productInStorage" auto-complete="off"></el-input>
                    </el-form-item>

                    <!-- 商品进价 -->
                    <el-form-item label="商品进价" prop="productStockPrice">
                        <p class="price">
                            <el-input type="text" v-model="stockForm.productStockPrice" auto-complete="off"></el-input>
                        </p>
                    </el-form-item>
                    <!-- 库存 -->
                    <el-form-item label="库存 :" prop="productNumber">
                        <el-input type="text" v-model="stockForm.productNumber" auto-complete="off" ></el-input>
                    </el-form-item>
                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveGoodsData">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 分页 -->
            <div class="goodsManagePages">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1,3, 5, 10, 20,30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>

        </el-card>
    </div>
</template>

<script>
  // 引入验证数字的工具函数
    import { priceValite,twoDecimals,intNumber,positiveNumber } from '@/utils/priceValidate';
export default {
    data() {
        // 验证数量
        const checkProductNumber = (rules,value,callback)=>{
            if(value === ''){
                callback(new Error('库存不能为空'));
            }else if(!intNumber(value)){
                callback(new Error('库存必须为整数'));
            }else{
                callback()
            }
        }
        // 验证进价
        const checkProductStockPrice = (rules,value,callback)=>{
             if(value === '' || value==='0.00'){
                callback(new Error('进价不能为空或为零'));
            }else if(!priceValite(value)){
                callback(new Error('请输入数字,可保留两位小数'));
            }else{
                callback()
            }
        }

        // 已售
        const checkProductSales = (rules,value,callback) => {
            if(value === ''){
                callback(new Error('已售数量不能为空'));
            }else if(!intNumber(value)){
                callback(new Error('已售数量必须为数字'));
            }else{
                callback()
            }
        }

        // 入库
        const checkProductInStorage = (rules,value,callback) => {
            if(value === ''|| value==='0'){
                callback(new Error('入库数量不能为空或为零'));
            }else if(!intNumber(value)){
                callback(new Error('入库数量必须为数字'));
            }else{
                callback()
            }
        }

        return{
            rules: {},
            stockManageForm :{           // 搜索数据
                selectClassify : '',
                keyWord :''
            },
            dialogRules :{                // 规则
                 //条形码
                productCode: [
                    {required :true, message:'请输入商品条形码', trigger:'change'},
                    {min: 12,max :12, message :'商品条形码长度12位', trigger:'change'}
                ],
                //数量
                productNumber: [
                    {required :true, validator:checkProductNumber, trigger:'change'}
                ],
                //进价
                productStockPrice: [
                    {required :true, validator:checkProductStockPrice, trigger:'change'}
                ],
                // 名称
                productName : [
                    {required :true, message:'商品名称不能为空', trigger:'change'},
                    {min: 3,max :6, message :'商品名称长度 3~6位 ', trigger:'change'}
                ],
                // 已售
                productSales : [
                     {required :true, validator:checkProductSales, trigger:'change'}
                ],
                // 入库
                productInStorage :[
                    {required :true, validator:checkProductInStorage, trigger:'change'}
                ],
                classify :[
                    {required :true,message:'商品类别不能为空', trigger:'change'}
                ]
            },
            stockManageData: [],   // 表格列表数据
            currentPage :1,
            pageSize :3,
            total :0,
            stockForm : {
                productCode : '',        //条形码
                productName : '',        //商品名称
                productSales :'',       //已售
                productInStorage :'',   //入库
                productNumber : '',     //数量 /库存
                productStockPrice : '',  //进价
                classify :'',
            },
            dialogFormVisible : false,
            editId :'',
            labelPosition : 'right'
        }
    },
    methods: {
        // 表格数据改变点击事件
        handleSelectionChange(){

        },
        // 根据分页获取页面所有的列表数据
        getStockListById() {
            // 发送一个get请求，传入当前的页码和每页的总条数获取所有的商品列表
            let params ={
                currentPage : this.currentPage,
                pageSize : this.pageSize,
                selectClassify : this.stockManageForm.selectClassify,
                keyWord : this.stockManageForm.keyWord,
            }
            this.request.get('/stock/stockListByPage',params)
            .then(( res ) => {
                // 接收参数
                let {data,total} = res;
                // 设置总条数
                this.total = total;
                // 渲染数据到页面
                this.stockManageData = data;
                
                // 如果这一页已经没有数据了
                if (!data.length && this.currentPage !== 1) {
                    // 回到上一页
                    this.currentPage -= 1;
                    // 调用自己
                    this.getStockListById();
                }
            })
            .catch(( err ) => {
                console.log(err);
            })
        },
        // 删除
        handleDelete(id) {
            // 用户体验
            this.$confirm('你确定要删除吗？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.request.get('/stock/stockDel',{ id })
                .then((res) => {
                    // 接收参数
                    let {code,reason} = res;
                    if(code === 0){
                        this.$message({
                            type : 'success',
                            message : reason,
                            duration : 1000,
                            center: true
                        })
                        // 刷查页面
                        this.getStockListById();

                    }else if(code === 1){
                        // 接收后台数据失败
                        this.$message({
                            type : 'error',
                            message : reason,
                            duration : 800,
                            center: true
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    center: true
                });          
            });
        },
        // 修改
        handleEdit(id){
            // 修改模态框显示
            this.dialogFormVisible = true;
            // 将id保存起来
            this.editId = id;
            //发送请求
            this.request.get('/stock/editstock',{ id })
            .then((res) => {
                this.stockForm.productCode = res[0].product_code;
                this.stockForm.productName = res[0].product_name;
                this.stockForm.productSales = res[0].product_sales;
                this.stockForm.productInStorage = res[0].product_instorages;
                this.stockForm.productNumber = res[0].product_number;
                this.stockForm.productStockPrice = res[0].product_stock_price;
                this.stockForm.classify = res[0].product_classify;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        // 保存修改
        saveGoodsData() {
            // 是否通过模态框所有验证
            this.$refs.stockForm.validate((valid) => {
                if (valid) {
                    // 点击确定 模态框消失 把新数据和id传入
                    this.dialogFormVisible = false;
                    let params = {
                        productCode : this.stockForm.productCode,    
                        productName : this.stockForm.productName,         
                        productSales : this.stockForm.productSales,     
                        productInStorage :this.stockForm.productInStorage,    
                        productNumber : this.stockForm.productNumber,        
                        productStockPrice :this.stockForm.productStockPrice,     
                        classify :this.stockForm.classify,     
                        id : this.editId
                    }
                    // 发送请求
                    this.request.post('/stock/savestock',params)
                    .then((res) => {
                        
                        let { code,reason } = res;
                        if(code === 0){
                            this.$message({
                                type : 'success',
                                message : reason,
                                duration : 1000,
                                center: true
                            })
                            // 刷查页面
                            this.getStockListById();
                        }else if(code === 1){
                            // 接收后台数据失败
                            this.$message({
                                type : 'error',
                                message : reason,
                                duration : 1000,
                                center: true
                            })
                        }
                        
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log('验证不通过');
                    return false;
                }
            });
        },
        // 每页总条数
        handleSizeChange (val) {
            this.pageSize = val;
            this.getStockListById();
        },
        // 当前页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getStockListById();
        },
        // 查询
        search () {

            this.getStockListById();
            // let params ={
            //     selectClassify : this.stockManageForm.selectClassify,
            //     keyWord : this.stockManageForm.keyWord,
            // }
            // // 发送请求
            // this.request.get('/stock/stocksearch',params)
            // .then(res => {
            //     this.stockManageData = res;
            // })
            // .catch(err => {
            //     console.log(err);
            // })
        },
    },
    created() {
        this.getStockListById();
    }
}

</script>

<style lang="less">
    @import './stockmanage.less';
</style>

