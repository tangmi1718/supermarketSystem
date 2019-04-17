<template>
    <div class="password-modify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改账号密码</span>
            </div>
            <div class="text item">
                <el-form size="small" :model="passwordModifyForm" status-icon :rules="rules" ref="passwordModifyForm" label-width="100px" class="demo-ruleForm">
                     <!-- 密码 -->
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="password" v-model="passwordModifyForm.oldPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="passwordModifyForm.newPassword" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="新密码" prop="checkNewPass">
                        <el-input type="password" v-model="passwordModifyForm.checkNewPass" auto-complete="off"></el-input>
                    </el-form-item>
                    
                    <!-- 修改 -->
                    <el-form-item>
                        <el-button type="success" @click="passwordEdit">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
// 引入密码正则验证工具函数
import { passwordValidate } from '@/utils/validate.js';

import local from '@/utils/local';

export default {
    data() {
        // 设置新密码的函数
        const setOldPassword = (rules,value,callback) => {
            // 发送请求 判断原密码是否正确
            this.request.post('/account/checkoldpassword',{ oldPassword: value})
            .then(res =>{
                let {code,reason} = res;
                
                if(value === ''){
                    callback(new Error('请输入原密码'));
                }else if(code === 0){
                    
                    callback(new Error(reason));
                }else if(code ===1 ){
                    callback()
                }
            })
            .catch(err =>{
                console.log(err);
            })
        };
        // 设置新密码的函数
        const setNewPassword = (rules,value,callback) => {
            // 非空
            if(value === ''){
                callback(new Error('密码不能为空'));
            }else if(value === this.passwordModifyForm.oldPassword){
                callback(new Error('原密码和新密码不能相同'));
            }
            // 判断是否符合正则验证
            else if(!passwordValidate(value)){
                callback(new Error('以字母开头，长度 3~6 位，只能包含字符、数字和下划线'));
            }
            // 成功
            else{
                if(this.passwordModifyForm.checkNewPass !== ''){
                    this.$refs.passwordModifyForm.validateField('checkNewPass');
                }
                callback();
            }
        };
        // 确认新密码的函数
        const checkNewPassword = (rules,value,callback) => {
            // 非空
            if(value === ''){
                callback(new Error('密码不能为空'));
            }
            // 判断两次密码是否一致
            else if(value !== this.passwordModifyForm.newPassword){
                callback(new Error('两次密码不一致'));
            }
            // 成功
            else{
                callback();
            }
        };

        return {
            // 表单数据
            passwordModifyForm :{
                oldPassword : '',
                newPassword : '',
                checkNewPass : ''
            },
            // 规则
            rules : {
                // 原密码
                oldPassword : [
                    { required: true, validator: setOldPassword, trigger:'blur' }
                ],
                // 新密码
                newPassword : [
                    { required: true, validator: setNewPassword, trigger:'blur' }
                ],
                // 确认新密码
                checkNewPass : [
                    { required: true, validator: checkNewPassword, trigger:'blur' }
                ]

            }

        }
    },
    methods : {
        // 修改按钮
        passwordEdit() {
            this.$refs.passwordModifyForm.validate((valid) => {
                if (valid) {
                    let params = {
                        newPassword : this.passwordModifyForm.newPassword
                    }
                    this.request.post('/account/passwordmodify',params)
                    .then(res => {
                        // 接收数据
                        let {code ,reason} = res;
                        if(code === 0){
                            // 弹成功提示
                            this.$message({
                                message: reason,
                                type: 'success',
                                duration : 800,
                                center: true
                            });
                            // 删除token
                                local.remove('yiyayiyayo');
                            // 跳转登录界面
                            setTimeout(()=> {
                                this.$router.push('/login');
                            },1000)

                        }else if(code === 1){
                            this.$message.error(reason);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

                } else {
                     // 失败弹出框
                     this.$message({
                        message: '修改失败',
                        type: 'error',
                        duration : 600,
                        center: true
                    });
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="less">
    @import './passwordmodify.less';
</style>


