<template>
    <div class="acount-manage">
        <!-- 面板内容 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <div class="text item">
                <!-- 表格数据 -->
                <el-table
                    ref="accountManageDate"
                    :data="accountManageData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column label="用户名称" prop="account"></el-table-column>

                    <el-table-column prop="user_group" label="用户组" ></el-table-column>

                    <!-- 日期 -->
                    <el-table-column label="日期">
                        <template slot-scope="scope">{{ scope.row.create_date | filterDate }}</template>
                    </el-table-column>

                    <!-- 按钮 -->
                    <el-table-column prop="accountmanage" label="管理" show-overflow-tooltip> 
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type='primary'
                            @click="handleEdit(scope.row.id)">
                                <i class="el-icon-edit"></i>
                                编辑
                            </el-button>

                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">
                                <i class="el-icon-delete"></i>
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
                <!-- 批量删除和取消选择 -->
                <div style="margin:30px auto;">
                    <el-button type="danger" plain @click="batchDel">批量删除</el-button>
                    <el-button type="info" plain @click="cancelSelect">取消选择</el-button>
                </div>
            </div>

            <!-- 修改账号弹出模板 -->
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">

                <el-form :model="editForm" :rules="rules">
                    <!-- 账号 -->
                    <el-form-item prop="account" label="账号" :label-width="formLabelWidth">
                        <el-input v-model="editForm.account" auto-complete="off"></el-input>
                    </el-form-item>
                    <!-- 用户组 -->
                    <el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth">
                        <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通员工" value="普通员工"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditAccount">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 分页 -->
            <div class="accountManagePages">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1,3, 5, 10, 20,30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
// 引入时间处理模块moment
import moment from 'moment';
export default {
    data() {
      return {
        accountManageData: [],       //页面中表格数据
        currentPage : 1,            // 分页当前页码
        pageSize: 5,                //一页中数据条数
        accountId : '',             // 点击修改的账号id
        total : 0,             //总的账号条数
        dialogFormVisible : false,     //修改账号模板
        editForm : {                //修改账号模板表单数据
            account : '',
            userGroup : ''
        },
        formLabelWidth : '100px',    //模态框的标题宽度
        rules : {                    //模态框的表单验证
            account :[
                {required : true, message: '账号不能为空', trigger :'blur'},
                {min: 3, max:6, message: '账号长度 3~6 位', trigger :'blur'},
            ]
        },
        batchDelId :[]                 //批量删除的id数组
      }
    },
    methods: {

		// 按照分页请求数据
		getAccountListByPage() {
		  // 收集参数
		  let params = {
			currentPage: this.currentPage,
			pageSize: this.pageSize
		  }
		  // 请求数据
		  this.request.get('/account/accountlistbypage', params)
			.then(res => {
			  // 接收后端返回的数据
			  let {total,data} = res;
			  //  console.log(data);  //data是当前页码的数据，是个数组
			  
			  // 赋值给对应变量
			  this.total = total;
			  this.accountManageData = data;
			  
			  // 如果这一页已经没有数据了
			  if (!data.length && this.currentPage !== 1) {
				// 回到上一页
				this.currentPage -= 1;
				// 调用自己
				this.getAccountListByPage();
			  }
			})
			.catch(err => {
			  console.log(err)
			})

		},
      // 修改按钮
      handleEdit(id) {
        // 保存点击修改的id
        this.accountId = id;
        // 发送请求，传入id
        this.request.get('/account/editaccount', { id })
            .then(( res ) => {
                let { account,user_group } = res[0];
                // 赋值回填给模态框
                this.editForm.account = account;
                this.editForm.userGroup = user_group;
            })
            .catch(( err ) => {
                console.log(err);
            })

        // 修改模态框显示
        this.dialogFormVisible = true;

      },
      // 点击确定 发送请求传入新数据和原来的id
      saveEditAccount(){
          this.dialogFormVisible = false;  //模态框消失
          // 发送请求传入新数据和原来的id
          let params = {
              account : this.editForm.account,
              userGroup : this.editForm.userGroup,
              accountId : this.accountId
          }
		  
          this.request.get('/account/saveedit',params)
            .then((res) => {
                // 接收响应的数据
                let {code ,reason} = res;
                if(code === 0){
                    this.$message({
                        type : 'success',
                        message : reason,
                        duration : 1000,
                        center: true
                    })
                    // 刷查页面
                    this.getAccountListByPage();

                }else if(code === 1){
                    // 接收后台数据失败
                    this.$message.error(reason);
                }
            })
            .catch((err) => {
                console.log(err);
            })
      },
      // 删除按钮
      handleDelete(id) {
        //   删除功能用户体验  提示一下
        this.$confirm('你确定要删除吗？别后悔哈', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  //确定

            //   发送请求，传id给后台 
            this.request.get('/account/deleteaccount', { id } )
            .then(( res ) => {
                let {code, reason} = res;
                if(code === 0){
                    this.$message({
                        type : 'success',
                        message : reason,
                        duration : 1000,
                        center: true
                    })
                    // 刷查页面
                    this.getAccountListByPage();

                }else if(code === 1){
                    // 接收后台数据失败
                    this.$message.error(reason);
                }
            })
            .catch(( err ) => {
                console.log(err)
            })
        
        }).catch(() => {  //取消
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 取消全选
      cancelSelect() {
        this.$refs.accountManageDate.clearSelection();
      },
      // 选项改变 -- 触发事件
      handleSelectionChange(val) {
        // val 是选中的所有账号数据 是个数组
        // 保存选择的id 用于批量删除
        this.batchDelId = val.map(v=> v.id);
      },
      // 批量删除
      batchDel() {
        // 如果选择的id不等于空，才发送批量删除请求
        if(!this.batchDelId.length){
            // 弹错误提示
            this.$message.error('请选择以后再操作!');
            return false
        }

        // 增加用户体验
        this.$confirm('你确定要删除吗？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        // 点击确认
        .then(() => {
            // 发送请求，传入选择批量删除的id
            let params = {
                batchDelId : this.batchDelId
            }
            // 只有当选择了删除的才能发送批量删除请求
            this.request.get('/account/batchdel',params)
            .then(( res ) => {
                
            // 接收响应数据
            let { code,reason} = res;

            if(code === 0){
                // 弹成功提示
                this.$message({
                    type : 'success',
                    message : reason,
                    duration : 1000,
                    center: true
                })

                // 刷新页面
                this.getAccountListByPage();

                }else if(code === 1){
                    // 弹失败提示
                    this.$message.error(reason);
                }
            })
            .catch(( err ) => {
                console.log(err);
            })
        })
        // 点击弹出框取消
        .catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除',
                center: true
            });          
        });
      },
      // 每页数据条数
      handleSizeChange(val) {
        this.pageSize = val;
        // 调用分页函数
        this.getAccountListByPage();
      },
      // 当前的页码
      handleCurrentChange(val) {
        this.currentPage = val;
        // 调用分页函数
        this.getAccountListByPage();
      }
    },
    // vue钩子函数，打开该页面自动触发
    created() {
        this.getAccountListByPage();
    },
    filters: {
        filterDate(val){
            return moment(val).format('YYYY-MM-DD hh:mm:ss'); 
        }
    }
};
</script>

<style lang="less">
    @import "./accountmanage.less";
</style>

