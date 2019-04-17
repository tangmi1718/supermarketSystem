<template>
    <div class="stock-total">
        
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>进货数据统计</span>
            </div>
            <div  class="text item">
                <!-- 时间和下拉框 -->
                <div class="salesTop">
                    <el-row>
                        <!-- 时间 -->
                        <el-col :span="6">
                            <el-row>
                                <el-col :span="4">
                                    <p class="date">时间 :</p>
                                </el-col>
                                <el-col :span="20">
                                     <el-date-picker
                                        v-model="value"
                                        type="daterange"
                                        size="small"
                                        range-separator="--"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-col>
                            </el-row>
                           
                        </el-col>

                        <!-- 统计 -->
                        <el-col :span="17">
                            <el-button type="primary" size="mini" style="padding:7px;margin-top:2px;">查询</el-button>
                        </el-col>
                    </el-row>
                </div>

                <!-- 图标内容 -->
                <div id="salesBox" style="height:400px;width:1200px;"></div>
            </div>
        </el-card>

    </div>
</template>
<script>
// 引入时间处理函数moment
import moment from 'moment';
export default {
    data() {
        return {
            date1:'',
            value:'',
            value1:'销售情况统计',
            options: [
                {
                value: '选项1',
                label: '销售情况统计'
                },
                 {
                value: '选项2',
                label: '进货情况统计'
                }
            ],
            value: ''
        }
    },
    // 生命周期钩子函数
    mounted () {

        var res = {
            categoryName: ['2019-04-10', '2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16'],
            value: [2500, 1500, 3000, 2000, 1850, 3660, 5000]
        }
        let { categoryName ,value} = res;
        
        this.drawSalesChart (categoryName,value)
    },
    methods: {
        drawSalesChart (time,value) {
            // 初始化
            let mycharts = this.echarts.init(document.getElementById('salesBox'))
            // 写配置
            let option = {
                xAxis: {
                    type: 'category',
                    data: time
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: value,
                    type: 'line'
                }]
            };

            // 使用配置生成报表
            mycharts.setOption( option );
        }
    }
}
</script>

<style lang="less">
    @import './stocktotal.less';
</style>
