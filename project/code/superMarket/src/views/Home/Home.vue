<template>
    <div class="home">
        
        <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <!-- 使用导航组件 -->
                <!-- <h1>华联超市管理系统</h1>
                <p>您好,admin</p> -->
                <p>
                    <router-link to="/home">管理首页</router-link> | 
                    <router-link to="/login">退出登录</router-link>
                </p>
                <Navigation></Navigation>
            </el-aside>

            <!-- 右侧 -->
            <el-container>

                <!-- 头 -->
                <el-header>
                    <!-- 头组件 -->
                    <Top ref="top"></Top>
                </el-header>

                <!-- 中间 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view @father="topMothod"></router-view>
                </el-main>
                
                <!-- 尾 -->
                <el-footer>
                    <!-- 尾部组件 -->
                    <Bottom></Bottom>
                </el-footer>

            </el-container>
        </el-container>
                    
    </div>
</template>

<script>
// 引入组件
import Navigation from '@/components/Navigation/Navigation.vue';
import Top from '@/components/Top/Top.vue'
import Bottom from '@/components/Bottom/Bottom.vue'

export default {
    // 注册组件
    components : {
        Navigation,
        Top,
        Bottom
    },
    methods : {
        topMothod () {
            this.$refs.top.getUserInfo();
        }
    }
    
}
</script>

<style lang="less">
    @import './home.less';
</style>

