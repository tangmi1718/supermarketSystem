<template>
    <div class="sales-total">
        
        <!-- 面板 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售数据统计</span>
            </div>
            <div  class="text item">
                <!-- 时间和下拉框 -->
                <div class="salesTop">
                    <el-row>
                        <!-- 时间 -->
                        <el-col :span="7">
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
                            <el-row>
                                <el-col :span="4">
                                    <el-select v-model="value1" size="small">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="18">
                                     <el-button type="primary" size="small">提交</el-button>
                                </el-col>
                             </el-row>
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
        let res = {
            ctime : ['2019-04-01','2019-04-02','2019-04-03','2019-04-04','2019-04-05','2019-04-06','2019-04-07'],
            price : [1800,3800,3400,1900,2700,3000,4200]
        }
        let { ctime,price } = res;
        this.drawSalesTotal(ctime,price);
    },
    methods: {
        drawSalesTotal(time,value) {
            // 初始化
            let mycharts = this.echarts.init(document.getElementById('salesBox'));
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
            // 根据配置生成报表
            mycharts.setOption( option );
        }
    }
}
</script>

<style lang="less">
    @import './salestotal.less';
</style>
