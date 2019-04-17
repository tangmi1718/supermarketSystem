<template>
    <div class="sales-return">
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品退货</span>
            </div>
            <div  class="text item">
                <div class="order">
                    订单号：
                    <el-input
                        placeholder="请输入订单号"
                        v-model="orderNumber"
                        size="small"
                        clearable style="width:220px;">
                    </el-input>
                    <el-button type="primary" @click="findData" size="mini">查询</el-button>
                </div>
            </div>
        </el-card>

    </div>
</template>
<script>
export default {
    data() {
        return {
            orderNumber :'',
        }
    },
    methods: {
        findData() {
            let params = {
                orderNumber : this.orderNumber
            }
        }
    }
}
</script>

<style lang="less">
    @import './SalesReturn.less';
</style>
