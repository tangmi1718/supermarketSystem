<template>
    <div class="goods-manage">
        <!-- 面板内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品管理</span>
            </div>

            <!-- 内容 -->
            <div class="text item">
                <div class="searchHeader">
                    <el-form :model="goodsManageForm" status-icon :rules="rules" ref="goodsManageForm" label-width="100px" class="demo-ruleForm" size="small">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <!-- 选择分类 -->
                                <el-form-item  prop="classify">
                                    <el-select v-model="goodsManageForm.classify" placeholder="-----选择分类-----" style="width:135px;">
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
                                            <el-input type="text" v-model="goodsManageForm.keyWord" auto-complete="off"></el-input>
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
                        :data="goodsTableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                    >
                    <!-- 数据 -->
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="商品条形码" prop="goods_code"></el-table-column>

                        <el-table-column prop="goods_name" label="商品名称" ></el-table-column>

                        <el-table-column prop="goods_classify" label="商品分类" ></el-table-column>

                        <el-table-column prop="goods_sales_price" label="售价" ></el-table-column>

                        <el-table-column prop="goods_number" label="库存" ></el-table-column>

                        <el-table-column label="日期">
                            <template slot-scope="scope">{{ scope.row.create_date | filterDate }}</template>
                        </el-table-column>

                        <el-table-column prop="goodsManage" label="管理" show-overflow-tooltip> 
                            <template slot-scope="scope">
                                <!-- 修改 -->
                                <span class="el-icon-edit iconstyle" @click="handleEdit(scope.row.id)"></span>
                                <!-- 删除 -->
                                <span class="el-icon-delete iconstyle" @click="handleDelete(scope.row.id)"></span>
                            </template>
                        </el-table-column>

                    </el-table>

                    <!-- 批量删除和取消选择 -->
                    <div style="margin:30px auto;">
                        <el-button type="danger" plain @click="batchDel" size="small">批量删除</el-button>
                        <el-button type="info" plain @click="cancelSelect" size="small">取消选择</el-button>
                    </div>

                </div>
            </div>

            <!-- 修改提示模态框 -->
            <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
                <el-form :model="goodsForm" :rules="dialogRules" ref="goodsForm">

                    <el-form-item label="商品条形码" :label-width="formLabelWidth" prop="goodsCode">
                        <el-input v-model="goodsForm.goodsCode" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsName">
                        <el-input v-model="goodsForm.goodsName" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="商品分类" :label-width="formLabelWidth" prop="goodsClassify">
                        <el-select v-model="goodsForm.goodsClassify" placeholder="请选择商品分类">
                            <el-option label="女装" value="女装"></el-option>
                            <el-option label="美妆" value="美妆"></el-option>
                            <el-option label="包包" value="包包"></el-option>
                            <el-option label="零食" value="零食"></el-option>
                            <el-option label="男装" value="男装"></el-option>
                            <el-option label="水果" value="水果"></el-option>
                            <el-option label="家电" value="家电"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="售价" :label-width="formLabelWidth" prop="goodsSalesPrice">
                        <el-input v-model="goodsForm.goodsSalesPrice" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="库存" :label-width="formLabelWidth" prop="goodsNumber">
                        <el-input v-model="goodsForm.goodsNumber" auto-complete="off"></el-input>
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

// 引入价格验证正则
import { priceValite,twoDecimals,intNumber } from '@/utils/priceValidate.js';
// 引入时间处理函数moment
import moment from 'moment';
export default {
    data() {

        // 验证商品条形码
        const checkProductBarCode = (rules,value,callback) => {
            if(value === ''){
                callback(new Error('条形码不能为空'));
            }else if(value.length !== 12){
                callback(new Error('条形码长度12位 '));
            }else{
                callback();
            }
        };

        // 验证商品售价
        const checkProductPrice = (rules,value,callback) => {
            if(value === ''){
                callback(new Error('商品售价不能为空'));
            }else if( !priceValite(value) ){
                callback(new Error('商品售价必须是数字'));
            }else{
                callback();
            }
        };

        // 验证商品数量
        const checkProductNumber = (rules,value,callback) => {
            if(value === ''){
                callback(new Error('商品数量不能为空'));
            }else if( !intNumber(value) ){
                callback(new Error('商品数量必须是数字'));
            }else{
                callback();
            }
        };
        return{
            goodsManageForm :{             // 面板头搜索数据
                classify : '',
                keyWord :''
            },
            rules :{                    //面板头的搜索规则
            },
            goodsTableData: [],         // 表格数据
            currentPage :1,             //当前页码
            pageSize :3,                 //每页的总页数
            total : 0,                  //商品所有的条数
            dialogFormVisible : false,  //模态框默认隐藏
            formLabelWidth :'100px',    //模态框的标题框宽度
            dialogRules :{              //模态框的规则
                
                // 商品条形码
                goodsCode : [
                    { required : true, validator: checkProductBarCode, trigger:'change'}
                ],
                // 商品名称
                goodsName : [
                    { required : true, message:'商品名称不能为空', trigger:'change'}
                ],
                // 售价
                goodsSalesPrice : [
                    { required : true, validator:checkProductPrice, trigger:'change'}
                ],
                // 数量
                goodsNumber : [
                    { required : true, validator:checkProductNumber, trigger:'change'}
                ],
            },
            goodsForm : {               //模态框数据
                goodsCode : '',
                goodsName : '',
                goodsClassify :'',
                goodsSalesPrice :'',
                goodsNumber :''
            },
            editId : '',                //点击修改的当前商品id
            batchDelId :''
        }
    },
    methods: {
        
        // 通过分页获取商品列表函数
        getGoodsListByPage() {
            // 发送一个get请求，传入当前的页码和每页的总条数获取所有的商品列表
            let params ={
                currentPage : this.currentPage,
                pageSize : this.pageSize,
                classify : this.goodsManageForm.classify,
                keyWord : this.goodsManageForm.keyWord,
            }
            this.request.get('/goods/goodsListData',params)
            .then(( res ) => {
                // 接收参数
                let {data,total} = res;
                // 设置总条数
                this.total = total;
                // 渲染数据到页面
                this.goodsTableData = data;
                // 如果这一页已经没有数据了
                if (!data.length && this.currentPage !== 1) {
                    // 回到上一页
                    this.currentPage -= 1;
                    // 调用自己
                    this.getGoodsListByPage();
                }
            })
            .catch(( err ) => {
                console.log(err);
            })
        },
        // 修改 数据回填
        handleEdit(id) {
            // 修改模态框显示
            this.dialogFormVisible = true;
            // 将id保存起来
            this.editId = id;
            //发送请求
            this.request.get('/goods/editGoods',{ id })
            .then((res) => {
                this.goodsForm.goodsCode = res[0].goods_code;
                this.goodsForm.goodsClassify = res[0].goods_classify;
                this.goodsForm.goodsName = res[0].goods_name;
                this.goodsForm.goodsSalesPrice = res[0].goods_sales_price;
                this.goodsForm.goodsNumber = res[0].goods_number;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        // 修改保存数据
        saveGoodsData() {
            // 是否通过模态框所有验证
            this.$refs.goodsForm.validate((valid) => {
                if (valid) {
                    // 点击确定 模态框消失 把新数据和id传入
                    this.dialogFormVisible = false;
                    let params = {
                        goodsCode : this.goodsForm.goodsCode,
                        goodsName : this.goodsForm.goodsName,
                        goodsClassify : this.goodsForm.goodsClassify,
                        goodsSalesPrice : this.goodsForm.goodsSalesPrice,
                        goodsNumber : this.goodsForm.goodsNumber,
                        id : this.editId
                    }
                    // 发送请求
                    this.request.post('/goods/savegoods',params)
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
                            this.getGoodsListByPage();
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
        // 删除
        handleDelete(id) {
            // 用户体验
            this.$confirm('你确定要删除吗？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送请求 传入id
                this.request.get('/goods/delgoods', { id })
                .then(( res) => {
                    
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
                        this.getGoodsListByPage();

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
                .catch( (err ) => {
                    console.log(err);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    center: true
                });          
            });
        },
        // 每页总条数
        handleSizeChange (val) {
            this.pageSize = val;
            this.getGoodsListByPage();
        },
        // 当前页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getGoodsListByPage();
        },
        // 关键字查询
        search() {
            this.getGoodsListByPage();
            // let params = {
            //     classify : this.goodsManageForm.classify,
            //     keyWord : this.goodsManageForm.keyWord,
            // }
            // // 发送请求
            // this.request.get('/goods/search',params)
            // .then(res => {
            //     this.goodsTableData = res;
            // })
            // .catch(err => {
            //     console.log(err);
            // })
        },
        // 批量删除
        batchDel () {
            // 如果选择的id不等于空，才发送批量删除请求
            if(!this.batchDelId.length){
                // 弹错误提示
                this.$message.error('请选择以后再操作!');
                return false
            }

            // 增加用户体验
            this.$confirm('你确定要删除吗？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            // 点击确认
            .then(() => {
                // 发送请求，传入选择批量删除的id
                let params = {
                    batchDelId : this.batchDelId
                }
                // 只有当选择了删除的才能发送批量删除请求
                this.request.get('/goods/batchdel',params)
                .then(( res ) => {
                    
                // 接收响应数据
                let { code,reason} = res;

                if(code === 0){
                    // 弹成功提示
                    this.$message({
                        type : 'success',
                        message : reason,
                        duration : 1000,
                        center: true
                    })

                    // 刷新页面
                    this.getGoodsListByPage();

                    }else if(code === 1){
                        // 弹失败提示
                        this.$message.error(reason);
                    }
                })
                .catch(( err ) => {
                    console.log(err);
                })
            })
            // 点击弹出框取消
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    center: true
                });          
            });
        },
        // 取消选择
        cancelSelect() {
            this.$refs.goodsManageDate.clearSelection();
        },
        // 表格数据改变点击事件
        handleSelectionChange(val){
            // 保存选择的id 用于批量删除
            this.batchDelId = val.map(v=> v.id);
        },

    },
    // 钩子函数 自动触发
    created() {
        // 调用获取商品列表函数
        this.getGoodsListByPage();
    },
    // 过滤器
    filters : {
        filterDate (time) {
            return moment(time).format('YYYY-MM-DD hh:mm:ss'); 
        }
    }
}

</script>

<style lang="less">
    @import './goodsmanage.less';
</style>

