<template>
    <div class="top">
        <el-row :gutter="20">
            <!-- 左侧标题 -->
            <el-col :span="20">
                <h3 class="title">
                    <i class="el-icon-menu"></i>
                    华联超市管理系统
                </h3>
            </el-col>
            <!-- 右侧头像 -->
            <el-col :span="4">
                <!-- 嵌套左右布局 -->
                <el-row>
                    <el-col :span="8">
                        <!-- 头像 -->
                        <div class="avatar">
                            <img width="100%" height="100%" :src="imgUrl" alt="">
                        </div>
                    </el-col>
                    <el-col :span="16"> 
                        <!-- 登录账号名 -->
                        <el-dropdown placement="bottom" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ account }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 引入local
import local from '@/utils/local';
export default {
    data () {
        return {
            account :'',
            imgUrl :'',
        }
    },
    methods:{
        // 点击下拉条 个人中心 退出登录
        handleCommand(command) {
            if(command === 'person'){
                this.$router.push('/home/personalinfo');
            }else if(command==='logout'){
                // 退出系统
                local.remove('yiyayiyayo')
                this.$message({
                    type:'success',
                    message :'退出成功，欢迎回来哟！么么哒~',
                    center :true
                })

                setTimeout(()=> {
                    this.$router.push('/login');
                },600)
            }
            
        },
        // 显示当前登录的账号
        getUserInfo() {
            this.request.get('/account/accountinfo')
            .then(res => {
                
                let {account, img_url} = res[0];
                // 赋值给对应的变量
                this.account = account;
                this.imgUrl = `http://172.16.11.209:666/${img_url}`;
            })
            .catch((err) => {
                console.log(err);
            })
        }
    },
    created() {
        this.getUserInfo();
    }
}
</script>


<style lang="less">
    @import './top.less';
</style>

