<template>
    <div class="goods-add">
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <div class="text item">
                <!-- 表单 -->
                <el-form :model="goodsAddForm" size="small" status-icon :rules="rules" ref="goodsAddForm" label-width="100px" class="demo-ruleForm">
                    <!-- 所选分类 -->
                    <el-form-item label="所属分类" prop="classify">
                        <el-select v-model="goodsAddForm.classify" placeholder="-----选择分类-----" style="width:135px;">
                            <el-option label="女装" value="女装"></el-option>
                            <el-option label="美妆" value="美妆"></el-option>
                            <el-option label="男装" value="男装"></el-option>
                            <el-option label="包包" value="包包"></el-option>
                            <el-option label="家电" value="家电"></el-option>
                            <el-option label="零食" value="零食"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 商品条形码 -->
                    <el-form-item label="商品条形码" prop="productBarCode" style="width: 450px">
                        <el-row :gutter="20">

                            <!-- 左边input框 -->
                            <el-col :span="14" style="padding:0;">
                                <el-input v-model="goodsAddForm.productBarCode" style="width:100%;"></el-input>
                            </el-col>

                            <!-- 右边按钮 -->
                            <el-col :span="8">
                                <el-button type="primary" size="mini" @click="createBarCode">生成条形码</el-button>
                            </el-col>
                            
                        </el-row>
                    </el-form-item>

                    <!-- 商品名称 -->
                    <el-form-item label="商品名称" prop="productName" style="width: 316px">
                        <el-input type="text" v-model="goodsAddForm.productName" auto-complete="off"></el-input>
                    </el-form-item>

                    <!-- 商品售价 -->
                    <el-form-item label="商品售价" prop="productSalesPrice">
                        <p style="color:#666;width:140px">
                            <el-input type="text" v-model="goodsAddForm.productSalesPrice" auto-complete="off" style="width:80%"></el-input> 元
                        </p>
                    </el-form-item>
                    
                    <!-- 市场价 -->
                    <el-form-item label="市场价" prop="productMarketPrice">
                        <p class="price">
                            <el-input type="text" v-model="goodsAddForm.productMarketPrice" auto-complete="off" style="width:80%"></el-input> 元
                        </p>
                        <p class="hintInfo">默认市场价为售价的1.2倍</p>
                    </el-form-item>

                    <!-- 商品进价 -->
                    <el-form-item label="商品进价" prop="productStockPrice">
                        <p class="price">
                            <el-input type="text" v-model="goodsAddForm.productStockPrice" auto-complete="off" style="width:80%"></el-input> 元
                        </p>
                    </el-form-item>

                    <!-- 入库数量 -->
                    <el-form-item label="入库数量" prop="productNumber">
                            <el-input type="text" v-model="goodsAddForm.productNumber" auto-complete="off" style="width:112px;"></el-input>
                            <p class="hintInfo">计重单位为千克</p>
                    </el-form-item>

                    <!-- 商品重量 -->
                    <el-form-item label="商品重量" prop="productWeight">
                            <el-input type="text" v-model="goodsAddForm.productWeight" auto-complete="off" style="width:112px;"></el-input>
                    </el-form-item>

                    <!-- 商品单位 -->
                    <el-form-item label="商品单位" prop="productUnits">
                            <el-input type="text" v-model="goodsAddForm.productUnits" auto-complete="off" style="width:112px;"></el-input>
                    </el-form-item>

                    <!-- 会员优惠 -->
                    <el-form-item label="会员优惠" prop="memberPrivilege">
                        <el-radio-group v-model="goodsAddForm.memberPrivilege">
                        <el-radio label="享受"></el-radio>
                        <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <!-- 是否促销 -->
                    <el-form-item label="是否促销" prop="salesPromotion">
                        <el-radio-group v-model="goodsAddForm.salesPromotion">
                        <el-radio label="启用" ></el-radio>
                        <el-radio label="禁用" ></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <!-- 商品简介 -->
                    <el-form-item label="商品简介" prop="productIntro">
                        <el-input type="textarea" v-model="goodsAddForm.productIntro"></el-input>
                        <p class="hintInfo" style="color:#999;font-size:12px;height:20px;line-height:20px;">不超过200个汉字</p>
                    </el-form-item>

                    <!-- 添加 -->
                    <el-form-item>
                        <el-button type="primary" @click="goodsAddClick">添加</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-card>

        
    </div>
</template>

<script>
// 引入价格验证正则
import { priceValite,twoDecimals,intNumber } from '@/utils/priceValidate.js';

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
                callback(new Error('请输入数字,可保留两位小数'));
            }else{
                callback();
            }
        };

        // 验证商品进价
        const checkProductStockPrice = (rules,value,callback) => {
            if(value === ''){
                callback(new Error('商品进价不能为空'));
            }else if(!priceValite(value) ){
                callback(new Error('请输入数字,可保留两位小数'));
            }else{
                callback();
            }
        };

        // 验证商品数量
        const checkProductNumber = (rules,value,callback) => {
            if(value === ''){
                callback(new Error('商品数量不能为空'));
            }else if( !intNumber(value) ){
                callback(new Error('商品数量必须是整数'));
            }else{
                callback();
            }
        };


        return {
            // 添加商品数据
            goodsAddForm :{
                classify:'',
                productBarCode:'',
                productName:'',
                productSalesPrice:'',
                productMarketPrice:'',
                productStockPrice:'',
                productNumber:'',
                productWeight:'',
                productUnits:'',
                memberPrivilege:'享受',
                salesPromotion:'禁用',
                productIntro:'',
            },
            // 规则
            rules : {
                // 所属分类验证
                classify : [
                    { required : true, message:'请选择分类', trigger:'change'}
                ],
                // 商品条形码
                productBarCode : [
                    { required : true, validator: checkProductBarCode, trigger:'change'}
                ],
                // 商品名称
                productName : [
                    { required : true, message:'商品名称不能为空', trigger:'blur'}
                ],
                // 售价
                productSalesPrice : [
                    { required : true, validator:checkProductPrice, trigger:'blur'}
                ],
                // 市场价
                productMarketPrice : [
                //    { trigger:'change'}
                ],
                // 进价
                productStockPrice : [
                    { required : true, validator:checkProductStockPrice, trigger:'blur'}
                ],
                // 数量
                productNumber : [
                    { required : true, validator:checkProductNumber, trigger:'blur'}
                ],
                // 商品重量
                productWeight : [
                    
                ],
                //商品单位
                productUnits : [

                ],
                // 会员优惠
                memberPrivilege : [

                ],
                // 促销
                salesPromotion : [

                ],
                // 商品简介
                productIntro : [],
            },
      }
    },
    methods : {
        goodsAddClick () {
            // 市场价默认为售价的1.2倍
            if(this.goodsAddForm.productSalesPrice !== ''){
                this.goodsAddForm.productMarketPrice = (this.goodsAddForm.productSalesPrice*1.2).toFixed(2);
            }

            // 判断所有的验证是否通过
            this.$refs.goodsAddForm.validate((valid) => {
                if (valid) {
                    // 接收数据
                    let params = {
                        classify : this.goodsAddForm.classify,
                        productBarCode : this.goodsAddForm.productBarCode,
                        productName : this.goodsAddForm.productName,
                        productSalesPrice : this.goodsAddForm.productSalesPrice,
                        productNumber: this.goodsAddForm.productNumber,
                    }
                    
                    // 发送axios请求
                    this.request.post('/goods/goodsadd',params)
                    .then((response) => {
                        // 判断响应回来的code是否等于0，等于0则添加成功
                        if(response.code === 0 ){
                            // 成功弹出框
                            this.$message({
                                message: response.reason,
                                type: 'success',
                                duration : 1000,
                                center: true
                            });

                            setTimeout(()=>{
                                return this.$router.push('/home/goodsmanage');
                            },500)
                        }else if(response.code === 1){
                            // 失败弹出框
                            this.$message({
                                message: response.reason,
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
                     this.$message({
                        message: '登录失败，请重新登录',
                        type: 'error',
                        center :true,
                        duration : 1000
                    });
                    return false;
                }
            })
        },
        // 生产条形码
        createBarCode() {
            let code = '';
            let firstCode =  Math.floor(Math.random()*9+1);
            
            for(var i=0;i<11;i++){
                code += Math.floor( Math.random()*10);
            }
            code = firstCode + code;
            this.goodsAddForm.productBarCode = code;
        }
    }
}
</script>


<style lang="less">
    @import './goodsadd.less';
</style>
