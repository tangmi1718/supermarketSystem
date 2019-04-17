<template>
    <div class="nav-menu">
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#3E4E67"
            text-color="#fff"
            active-text-color="rgb(64, 158, 255)"
            unique-opened  
            router
        >
                <!-- 系统管理 -->
                <el-submenu :index="(index + 1) + '' " v-for="(meun,index) in meuns" :key="index">
                    <template slot="title">
                        <i :class="meun.iconClass"></i>
                        <span> {{ meun.title }} </span>
                    </template>
                    <el-menu-item-group v-for="(child,i) in meun.children" :key="i">
                        <el-menu-item :index="child.path"> {{ child.subTitle }} </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 导航数据
            meuns : [
                //系统管理
                {
                    iconClass :'el-icon-setting',
                    title : '系统管理',
                    children : [
                        {
                            path: '/home/systeminfo',
                            subTitle : '系统信息'
                        }
                    ]
                },
                // 账号管理
                {
                    iconClass :'el-icon-menu',
                    title : '账号管理',
                    children : [
                        {
                            path: '/home/accountmanage',
                            subTitle : '账号管理'
                        },
                        {
                            path : '/home/accountadd',
                            subTitle : '添加账号'
                        },
                            {
                            path : '/home/passwordmodify',
                            subTitle : '密码修改'
                        }
                    ]
                },
                // 商品管理
                {
                    iconClass :'el-icon-goods',
                    title : '商品管理',
                    children : [
                        {
                            path: '/home/goodsmanage',
                            subTitle : '商品管理'
                        },
                        {
                            path : '/home/goodsadd',
                            subTitle : '添加商品'
                        }
                    ]
                },
                // 进货管理
                {
                    iconClass :'el-icon-news',
                    title : '进货管理',
                    children : [
                        {
                            path: '/home/stockmanage',
                            subTitle : '库存管理'
                        },
                        {
                            path : '/home/stockadd',
                            subTitle : '添加库存'
                        }
                    ]
                },
                // 出货管理
                    {
                    iconClass :'el-icon-sold-out',
                    title : '出货管理',
                    children : [
                        {
                            path: '/home/productsaleslist',
                            subTitle : '销售列表'
                        },
                        {
                            path : '/home/productshipment',
                            subTitle : '商品出库'
                        },
                        {
                            path : '/home/salesreturn',
                            subTitle : '商品退货'
                        }
                    ]
                },
                // 统计管理
                {
                    iconClass :'el-icon-edit-outline',
                    title : '统计管理',
                    children : [
                        {
                            path: '/home/salestotal',
                            subTitle : '销售统计'
                        },
                        {
                            path : '/home/stocktotal',
                            subTitle : '进货统计'
                        }
                    ]
                },
                // vip管理
                {
                    iconClass :'el-icon-star-on',
                    title : '会员管理',
                    children : [
                        {
                            path: '/home/vipaccountmanage',
                            subTitle : '账号管理'
                        },
                        {
                            path : '/home/vipaccountadd',
                            subTitle : '添加账号'
                        }
                    ]
                }
            ]
        }
    }
}
</script>


<style lang="less">
    @import './Navigation.less';
</style>



