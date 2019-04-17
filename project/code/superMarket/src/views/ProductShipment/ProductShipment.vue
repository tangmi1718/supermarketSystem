<template>
    <div class="product-shipment">
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品销售</span>
            </div>
            <div  class="text item">
                <div class="search">
                    <el-form :rules="rules" :label-position="labelPosition" label-width="100px" ref="shipmentFrom" :model="shipmentFrom" size="small">
                        <el-form-item label="商品条形码" prop="barCode">
                            <el-input v-model="shipmentFrom.barCode"></el-input>
                        </el-form-item>

                        <el-form-item label="数量" prop="number">
                            <el-input v-model="shipmentFrom.number" style="width:100px;"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" @click="addOrder" size="mini">加入订单</el-button>
                    <el-button type="text" @click="reShipment" size="mini">重新出库</el-button>
                </div>
                <hr>
            </div>
            <!-- 列表内容 -->
            <div class="shipmentList">
                <el-table
                    :data="shipmentListData"
                    stripe
                    style="width: 100%">

                        <el-table-column
                        prop="productName"
                        label="名称">
                        </el-table-column>

                        <el-table-column
                        prop="productNum"
                        label="数量">
                        </el-table-column>

                        <el-table-column
                        prop="singlePrice"
                        label="单价(元)">
                        </el-table-column>

                        <el-table-column
                        prop="totalPrice"
                        label="总价(元)">
                        </el-table-column>

                        <el-table-column
                        prop="preferTotalPrice"
                        label="优惠总价(元)">
                        </el-table-column>

                </el-table>
                <p style="font-size:12px; padding:20px 0px 10px;">总计：0元 &emsp;优惠：0元 &emsp; <span style="color:red;">小计：0元</span></p>
                <hr>

                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" size="mini">
                    <el-form-item label="会员卡号">
                        <el-input v-model="formLabelAlign.vipCard" style="width:250px;"></el-input>
                    </el-form-item>
                    <span style="font-size:12px;color:#999;">填写会员卡号</span>
                </el-form>

                <el-button type="primary" @click="submitForm" size="mini" style="margin-top:10px;padding:5px;">确认提交</el-button>
            </div>
        </el-card>

    </div>
</template>
<script>
// 引入数量验证函数
import { intNumber,positiveNumber } from '@/utils/priceValidate';
export default {
    data() {
        const checkNumber =(rules,value,callback) => {
            if(value === ''){
                callback(new Error('数量不能为空'));
            }else if(!intNumber(value)){
                callback(new Error('数量必须是整数'));
            }else{
                callback();
            }
        };

        return {
            // 商品条形码和数量
            shipmentFrom :{
                barCode :'',
                number :''
            },
            labelPosition :'top',
            // 规则
            rules : {
                barCode :[
                    { required :true,message:"商品条形码不能为空",trigger:"blur"},
                    { min: 12,max:12,message:"商品条形码长度 12 位",trigger:'blur'}
                ],
                number :[
                    { required :true,validator:checkNumber,trigger:"blur"},
                ]
            },
            // 列表数据
            shipmentListData: [
                {
                    productName : '卫生纸',
                    productNum : '23',
                    singlePrice : '56',
                    totalPrice : '788',
                    preferTotalPrice : '566',
                },
                {
                    productName : '茅台',
                    productNum : '100',
                    singlePrice : '516',
                    totalPrice : '998',
                    preferTotalPrice : '666',
                },
                {
                    productName : '机械键盘',
                    productNum : '231',
                    singlePrice : '74',
                    totalPrice : '45',
                    preferTotalPrice : '78',
                }

            ],
            // 会员卡号
            formLabelAlign :{
                vipCard :''
            },
            labelPosition :'top'

        }
    },
    methods:{
        addOrder() {  //加入订单按钮

        },
        reShipment() {  //重新入库按钮

        },
        submitForm() {  //确认提交
            let params = {
                vipCard :this.formLabelAlign.vipCard
            }
            console.log(params);
        }
    }
}
</script>

<style lang="less">
    @import './ProductShipment.less';
</style>
