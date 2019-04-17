<template>
    <div class="system-info">
        <!-- 面板 -->
       <el-card class="box-card">
           <!-- 标题 -->
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <!-- 提示信息 -->
            <div class="hintMessage">
                <el-alert
                    title="商品总数：200，已经销售的总金额：2050，库存商品总价：15200"
                    type="info"
                    show-icon>
                </el-alert>
                <el-alert
                    title="导入数据"
                    type="info"
                    :closable="false"
                    show-icon>
                </el-alert>
            </div>

            <!-- 内容 -->
            <div class="syatemContent">    
                <!-- 布局组件 -->
                <el-row>
                    <el-col :span="12">
                        <!-- 左边面板 -->
                        <el-card class="box-card">

                            <!-- 标题 -->
                            <div slot="header" class="clearfix">
                                <span>销售排行</span>
                            </div>

                            <!-- 表格数据 -->
                            <div class="text item">
                                <el-table
                                    :data="salesRankDate"
                                    stripe
                                    style="width: 100%"
                                >

                                    <el-table-column
                                    prop="productName"
                                    label="商品名称">
                                    </el-table-column>

                                    <el-table-column
                                    prop="salesVolume"
                                    label="销量">
                                    </el-table-column>

                                </el-table>
                            </div>
                        </el-card>

                    </el-col>
                    <el-col :span="12">
                        <!-- 右边面板 -->
                        <el-card class="box-card"  style="margin-left:20px;">

                            <!-- 标题 -->
                            <div slot="header" class="clearfix">
                                <span>缺货的商品</span>
                            </div>

                            <!-- 表格数据 -->
                            <div class="text item">
                                <el-table
                                    :data="stockOutGoodsDate"
                                    stripe
                                    style="width: 100%"
                                >

                                    <el-table-column
                                    prop="productName"
                                    label="商品名称">
                                    </el-table-column>

                                    <el-table-column
                                    prop="inventory"
                                    label="库存">
                                    </el-table-column>

                                    <el-table-column
                                    prop="handle"
                                    label="操作">
                                        <button class="importBtn" @click="importProductHandle"> 入库 </button>
                                    </el-table-column>

                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>

        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 销售排行数据
            salesRankDate: [
                {
                    productName: '海飞丝洗发水',
                    salesVolume: '10',
                }, 
                {
                    productName: '茅台酒',
                    salesVolume: '5',
                }, 
                {
                    productName: '卫生纸',
                    salesVolume: '30',
                }
            ],
            // 缺货商品数据
            stockOutGoodsDate: [
                {
                    productName: '优乐美',
                    inventory: '0'
                },
                 {
                    productName: '菜籽油',
                    inventory: '1'
                },
            ]
        }
    },
    methods: {
        // 引入点击函数
        importProductHandle() {
            console.log("入库函数");
        }
    }
}
</script>

<style lang="less">
    @import './systeminfo.less';
</style>
