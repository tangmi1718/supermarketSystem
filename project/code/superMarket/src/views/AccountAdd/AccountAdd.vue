<template>
    <div class="acount-add">
        <!-- 面板内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
            <div class="text item">
                <el-form size="small" :model="accountAddForm" status-icon :rules="rules" ref="accountAddForm" label-width="100px" class="demo-ruleForm">
                    <!-- 账号  -->
                    <el-form-item label="用户名" prop="account">
                        <el-input type="text" v-model="accountAddForm.account"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="accountAddForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="accountAddForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 选择用户组 -->
                     <el-form-item label="选择用户组" prop="region">
                        <el-select v-model="accountAddForm.region" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 登录 -->
                    <el-form-item>
                        <el-button type="primary" :plain="true" @click="addForm()">添加</el-button>
                        <el-button @click="resetForm()" type="success" :plain="true">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
// 引入正则工具函数
import { passwordValidate } from '@/utils/validate';

export default {
    data() {

        // 验证用户名是否存在
        const checkAccount = (rules,value,callback) => {
            if(value === ''){
                callback(new Error('请输入用户名'))
            }else if( value.length<3 || value.length>6 ){
                callback(new Error('用户名长度 3~6 位'))
            }else{
                this.request.get('/account/checkaccount', { account : this.accountAddForm.account })
                .then(res => {
                    let { code ,reason } = res;
                    if(code === 0){
                        callback();
                    }else if(code === 1){
                        callback(new Error(reason))
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
        // 验证密码函数
        const checkPassword = (rules,value,callback) => {
            if(value === ''){ //非空
                callback(new Error('密码不能为空'));
            }
            else if(!passwordValidate(value)){ //正则规则
                callback(new Error('以字母开头，长度 3~6 位，只能包含字符、数字和下划线'));
            }
            else{
                if (this.accountAddForm.checkPass !== '') {
                    this.$refs.accountAddForm.validateField('checkPass');
                }
                callback();
            }
        };
        // 验证确认密码函数
        const confirmPass = (rules,value,callback) => {
            if(value === ''){ //非空
                callback(new Error('确认密码不能为空'));
            }
            else if(value !== this.accountAddForm.password){ //密码一致性
                callback(new Error('两次输入密码不同'));
            }
            else{
                callback();
            }
        };

        return {
            // 双向绑定表单数据
            accountAddForm:{
                account : '',
                password : '',
                checkPass: '',
                region: ''
            },
            // 规则
            rules : {
                // 用户名
                account : [
                    { required : true, validator:checkAccount, trigger: 'blur'}, //非空
                    // { required : true, message: '请输入用户名', trigger: 'blur'}, //非空
                    // { min: 3, max: 6, message:'用户名长度 3~6 位', trigger: 'blur'}  //长度
                ],
                // 密码
                password : [
                    { required : true, validator: checkPassword, trigger: 'blur'}  //自定义规则

                ],
                // 确认密码
                checkPass : [
                    { required : true, validator: confirmPass, trigger: 'blur'}  //自定义规则
                ],
                // 选择用户组
                region : [
                    { required : true, message: '请选择用户组', trigger: 'change'} //非空
                    
                ]
            }
        }
    },
    methods : {
        // 添加按钮
        addForm() {
            // 验证所有的表单是否都通过验证valid
             this.$refs.accountAddForm.validate((valid) => {
                //  验证通过
                if (valid) {
                    let params = {
                        account : this.accountAddForm.account,
                        password : this.accountAddForm.password,
                        region :this.accountAddForm.region
                    }

                    // 发送axios
                    this.request.post('/account/accountadd',params)
                    .then((response) => {
                        if(response.code === 0){
                            this.$message({
                                // 弹出成功
                                message: response.reason,
                                type: 'success',
                                duration : 1000,
                                center: true
                            });

                            // 页面跳转
                            setTimeout(()=>{
                                return this.$router.push('/home/accountmanage');
                            },400)
                        }else if(code === 1){
                            // 弹出失败
                            this.$message({
                                message: response.reason,
                                type: 'error',
                                duration : 1000,
                                center: true
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                } 
                // 验证不通过
                else {
                    // 失败弹出框
                    this.$message({
                        message: '添加失败',
                        type: 'error',
                        duration : 600,
                        center: true
                    });
                    return false;
                }
            });
        },
        // 重置按钮
        resetForm() {
            this.$refs.accountAddForm.resetFields();
        }

    }
}
</script>


<style lang="less">
    @import './accountadd.less';
</style>
