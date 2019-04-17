<template>
    <div class="stock-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加库存</span>
            </div>

            <div class="text item">
                <!-- 表单 -->
                <el-form :model="stockAddForm" :label-position="labelPosition" 
                    status-icon :rules="rules" ref="stockAddForm" 
                    label-width="100px" class="demo-ruleForm"
                    size="small"
                >
                    <!-- 商品条形码 -->
                    <el-form-item label="商品条形码 :" prop="productCode">
                        <el-input type="text" v-model="stockAddForm.productCode" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="所属分类" prop="classify">
                        <el-select v-model="stockAddForm.classify" placeholder="-----选择分类-----" style="width:135px;">
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
                        <el-input type="text" v-model="stockAddForm.productName" auto-complete="off" ></el-input>
                    </el-form-item>

                    <!-- 商品已售 -->
                    <el-form-item label="已售" prop="productSales">
                        <p style="color:#666;width:140px">
                            <el-input type="text" v-model="stockAddForm.productSales" auto-complete="off" style="width:80%"></el-input> 元
                        </p>
                    </el-form-item>

                    <!-- 入库 -->
                    <el-form-item label="入库 :" prop="productInStorage">
                        <el-input type="text" v-model="stockAddForm.productInStorage" auto-complete="off" style="width:112px;"></el-input>
                    </el-form-item>

                    <!-- 商品进价 -->
                    <el-form-item label="商品进价" prop="productStockPrice">
                        <p class="price">
                            <el-input type="text" v-model="stockAddForm.productStockPrice" auto-complete="off" style="width:80%"></el-input> 元
                        </p>
                    </el-form-item>
                    <!-- 库存 -->
                    <el-form-item label="库存 :" prop="productNumber">
                        <el-input type="text" v-model="stockAddForm.productNumber" auto-complete="off" style="width:112px;"></el-input>
                        <p class="hintInfo">计重单位为件数</p>
                    </el-form-item>
                    <!-- 入库 -->
                    <el-form-item>
                        <el-button type="primary" size="small" @click="stockAddEvent">入库</el-button>
                    </el-form-item>
                </el-form>
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

        return {
            stockAddForm :{
                productCode : '',        //条形码
                productName : '',        //商品名称
                productSales :'',       //已售
                productInStorage :'',   //入库
                productNumber : '',     //数量 /库存
                productStockPrice : '',  //进价
                classify :''
            },
            rules :{
                 //条形码
                productCode: [
                    {required :true, message:'请输入商品条形码', trigger:'blur'},
                    {min: 12,max :12, message :'商品条形码长度12位', trigger:'blur'}
                ],
                //数量
                productNumber: [
                    {required :true, validator:checkProductNumber, trigger:'blur'}
                ],
                //进价
                productStockPrice: [
                    {required :true, validator:checkProductStockPrice, trigger:'blur'}
                ],
                // 名称
                productName : [
                    {required :true, message:'商品名称不能为空', trigger:'blur'},
                    {min: 3,max :6, message :'商品名称长度 3~6位 ', trigger:'blur'}
                ],
                // 已售
                productSales : [
                     {required :true, validator:checkProductSales, trigger:'blur'}
                ],
                // 入库
                productInStorage :[
                    {required :true, validator:checkProductInStorage, trigger:'blur'}
                ],
                classify : [
                    {required :true ,message:'商品类别不能为空',trigger:'change'}
                ]
            },
            labelPosition : 'right'
        }
    },
    methods : {
        stockAddEvent() {
            this.$refs.stockAddForm.validate((valid) => {
                if (valid) {
                    // 接收用户填入的数据
                    let params = {
                        productCode : this.stockAddForm.productCode,  //条形码
                        productName : this.stockAddForm.productName,   //名称
                        productSales : this.stockAddForm.productSales,  //已售
                        productInStorage : this.stockAddForm.productInStorage,  //入库
                        productNumber : this.stockAddForm.productNumber,        //库存
                        productStockPrice : this.stockAddForm.productStockPrice,  //进价
                        classify : this.stockAddForm.classify  //类
                    }
                    
                    // 发送请求
                    this.request.post('/stock/stockadd',params)
                    .then( (res) => {
                        
                        // 接收参数
                        let { code ,reason } = res;
                        if(code === 0 ){
                            // 成功弹出框
                            this.$message({
                                message: reason,
                                type: 'success',
                                duration : 1000,
                                center: true
                            });

                            setTimeout(()=>{
                                return this.$router.push('/home/stockmanage');
                            },500)
                        }else if(code === 1){
                            // 失败弹出框
                            this.$message({
                                message: reason,
                                type: 'error',
                                duration : 800,
                                center: true
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    
                } 
                // 验证不通过
                else {
                    // 失败弹出框
                    this.$message({
                        message: '添加失败',
                        type: 'error',
                        duration : 600,
                        center: true
                    });
                    return false;
                }
            });
        }
    }
}
</script>


<style lang="less">
     @import './stockadd.less';
</style>
