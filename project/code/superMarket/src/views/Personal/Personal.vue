<template>
    <div class="personal-info">
        <!-- 面板内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>个人中心</span>
            </div>
            <div class="text item">
                <!-- 头像上传 -->
                <el-upload
                    class="avatar-uploader"
                    action="xixiixi"
                    :http-request = "upLoad"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload">

                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>

                </el-upload>

                <!-- 个人信息 -->
                <div class="info">
                    <p>ID： {{ accountInfo.id}} </p>
                    <p>账号： {{ accountInfo.account}} </p>
                    <p>用户组： {{ accountInfo.user_group}} </p>
                    <p>创建时间： {{ accountInfo.create_date | filterDate}} </p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
// 引入moment和qxios
import moment from 'moment';
import axios from 'axios';
export default {
    data() {
      return {
        imageUrl: '',           //图片路径
        accountInfo : {         //个人信息
            account:'',
            id:'',
            user_group:'',
            create_date:'',
        }
      };
    },
    methods: {
        // 获取信息的函数
        getAccountInfo() {
            this.request.get('/account/accountinfo')
            .then(res => {
                this.accountInfo = res[0]
            })
             .catch(err => {
                console.log(err);
            })
        },
        // 自定义上传函数
        upLoad(file) {
            // 创建一个formDate对象
            let formDate = new FormData();
            // 把文件数据放入 fromDate
            formDate.append('file', file.file)

            // 发送请求，把文件传给后端
            axios.post('/account/uploadavatar',formDate,{
                headers:{'Content-Type':'multipart/form-data'}
            })
            .then(response => {
                // 接收数据
                let {code, reason, path } = response.data;
                if(code === 0){
                    this.$message({
                        type :'success',
                        message :reason,
                        center :true
                    })
                    // 回填头像
                    this.imageUrl = `http://172.16.11.209:666${path}`
                    // 触发父组件方法
                    this.$emit('father');

                }else if(code === 1) {
                    this.$message({
                        type :'error',
                        message :reason,
                        center :true
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    filters : {
        filterDate (val) {
            return moment(val).format("YYYY/MM/DD hh:mm:ss");
        }
    },
    created() {
        this.getAccountInfo();
    }

}
</script>


<style lang="less">
    @import './Personal.less';
</style>
