<template>
    <div class="login">
        <div class="login-wrap">
            <!-- 标题 -->
            <p class="title"><span class="el-icon-loading"></span>华联超市管理系统</p>
            <!-- 表单 -->
            <div class="myform">
                <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginForm" label-width="100px" class="demo-ruleForm">
                    <!-- 账号  -->
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model.trim="LoginForm.account"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="LoginForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="LoginForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 登录 -->
                    <el-form-item>
                        <el-button type="primary" :plain="true" @click="submitForm()">登录</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

// 引入自定义正则验证密码
import { passwordValidate } from '@/utils/validate';

// 引入 local 文件
import local from '@/utils/local';

export default {
    data () {
        // 密码验证
        const checkPassword = (rule,value,callback) =>{
            // 不为空
            if(value === ''){
                callback(new Error('密码不能为空'));
            }
            // 正则passwordValidate验证
            else if(!passwordValidate(value)) {
                callback(new Error('以字母开头，长度在3~6之间，只能包含字符、数字和下划线'));
            }
            // 验证成功
            else{
                // 密码的确认密码一致性
                if(this.LoginForm.checkPass !==''){
                    //  触发checkPass字段
                    this.$refs.LoginForm.validateField('checkPass'); 
                }
                callback();
            }
        };
        // 确认密码验证
        const confirmPassword = (rule,value,callback) => {
            // 为空
            if(value === ''){
                callback(new Error('密码不能为空'));
            }
            // 验证一致性
            else if( value !== this.LoginForm.password ){
                callback(new Error('两次输入密码不一致'));
            }
            // 成功
            else{
                callback();
            }
        };

        return{
            // 表单接收的数据
            LoginForm: {
                account:'',
                password: '',
                checkPass: ''
            },
            // 验证规则
            rules: {
                // 账号
                account: [
                    {required: true, message: '请输入账号', trigger: 'blur'},  // 非空
                    {min: 3, max: 6, message: '账号长度 3~6 位', trigger: 'blur'} // 长度
                ],
                // 自定义正则验证密码
                password : [
                    {required: true, validator: checkPassword, trigger:'blur'}
                ],
                // 确认密码
                checkPass : [
                    {required: true, validator: confirmPassword, trigger:'blur'}
                ],
                
            }
        }
    },
    methods : {
        // 登录函数
        submitForm() {
            this.$refs.LoginForm.validate((valid) => {
                // 如果所有前端验证都通过 valid就是true 否则就是false
                if (valid) {
                    // 接收账号和密码,用axios传给后台
                    let params = {
                        account : this.LoginForm.account,
                        password : this.LoginForm.password
                    }
                    // 发送请求，传入参数
                    this.request.post('/login/checkLogin',params)
                    .then(res => {
                        // 接收参数
                        let {code,reason,token} = res;
                        if(code === 0 ){
                            
                            // 保存token到浏览器
                            local.save('yiyayiyayo',token)

                            this.$message({
                                // 弹出成功
                                message: reason,
                                type: 'success',
                                duration : 800,
                                center: true
                            });

                            setTimeout(() => {
                                // 跳转页面
                                this.$router.push('/home');
                            },800)

                        }else if(code === 1 ){
                             this.$message({
                                message: reason,
                                type: 'error',
                                duration : 800,
                                center: true
                            });
                        }else{
                            this.$message({
                                message: reason,
                                type: 'error',
                                duration : 800,
                                center: true
                            });
                        }
                    })
                    .catch( err => {
                        console.log(err);
                    })
                    
                }
            });
        },
        // 重置函数
        resetForm() {
            this.$refs.LoginForm.resetFields();
        }
    }
}
</script>


<style lang="less">
    // 引入登录样式
    @import './login.less';

</style>

