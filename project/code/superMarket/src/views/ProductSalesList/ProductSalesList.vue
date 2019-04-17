<template>
    <div class="product-sales-list">
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售明细</span>
            </div>
            <div  class="text item">
                <!-- 选择日期 -->
                <div class="selectDate">
                    <!-- 第一行 -->
                    <el-row>
                        <el-col :span="8">
                            <span>开始时间：</span>
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                size="small"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="8">
                            <span>结束时间：</span>
                            <el-date-picker
                                v-model="value2"
                                type="date"
                                size="small"
                                placeholder="选择日期">
                            </el-date-picker>

                        </el-col>
                        <el-col :span="8" style="font-size:12px;color:#666;line-height:50px;">
                            (格式：2012-01-01)
                        </el-col>
                    </el-row>
                    
                    <!-- 第二行 -->
                    <el-row>
                        <el-col :span="8">  
                            <span> 关 键 字 ：</span>
                            <el-input
                                placeholder="请输入内容"
                                v-model="input"
                                size="small"
                                clearable style="width:220px;">
                            </el-input>
                        </el-col>
                        <el-col :span="8" style="width:230px;"> <span> 商品名称，订单号，客户名字，会员卡号 </span></el-col>
                        <el-col :span="6">
                            <el-button type="success" size="mini">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <hr>
                <!-- 列表 -->
                <div class="saleslist">
                    <el-table
                    :data="salesListData"
                    stripe
                    style="width: 100%">
                        <el-table-column
                            prop="orderNumber"
                            label="订单号">
                        </el-table-column>

                        <el-table-column
                            prop="goodsName"
                            label="名称">
                        </el-table-column>

                        <el-table-column
                            prop="salesNum"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="salesPrice"
                            label="实际售价">
                        </el-table-column>
                        <el-table-column
                            prop="privilege"
                            label="优惠/会员">
                        </el-table-column>
                        <el-table-column
                            prop="returnPrice"
                            label="退款">
                        </el-table-column>
                        <el-table-column
                            prop="salesTime"
                            label="销售时间">
                        </el-table-column>

                    </el-table>
                </div>

                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1,3,5,10,20,30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="27">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            value2: '',
            input :'',
            salesListData : [
                {
                    orderNumber :'34445666776',
                    goodsName :'王小虎',
                    salesNum :'233',
                    salesPrice :'66',
                    privilege :'上海市普陀区金沙江路',
                    returnPrice :'12',
                    salesTime : '2016-05-04',
                },
                {
                    orderNumber :'34445666776',
                    goodsName :'王小虎',
                    salesNum :'233',
                    salesPrice :'66',
                    privilege :'上海市普陀区金沙江路',
                    returnPrice :'12',
                    salesTime : '2016-05-04',
                },
                {
                    orderNumber :'34445666776',
                    goodsName :'王小虎',
                    salesNum :'233',
                    salesPrice :'66',
                    privilege :'上海市普陀区金沙江路',
                    returnPrice :'12',
                    salesTime : '2016-05-04',
                },
                {
                    orderNumber :'34445666776',
                    goodsName :'王小虎',
                    salesNum :'233',
                    salesPrice :'66',
                    privilege :'上海市普陀区金沙江路',
                    returnPrice :'12',
                    salesTime : '2016-05-04',
                },
            ],
            currentPage :1,
            pageSize :3,
            total :0,
        }
    },
    methods: {
        // 每页总长度
        handleSizeChange(){},
        // 当前页码
        handleCurrentChange(){}
    }
}
</script>

<style lang="less">
@import './ProductSalesList.less';
</style>

