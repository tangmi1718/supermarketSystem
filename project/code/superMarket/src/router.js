import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 暴露路由实例对象
export default new Router({
  routes: [
    {
      path : '/',
      redirect : '/login'
    },
    // 登录
    {
      path : '/login',
      component : () => import('./views/Login/Login.vue')
    },
    // 首页
    {
      path : '/home',
      // 重定向，默认显示系统信息页面
      redirect : '/home/systeminfo',
      component : () => import('./views/Home/Home.vue'),
      children : [
        // 系统信息
        {
          path : '/home/systeminfo',
          component : () => import('./views/SystemInfo/SystemInfo.vue')
        },
        // 个人中心
        {
          path : '/home/personalinfo',
          component : () => import('./views/Personal/Personal.vue')
        },
        // 商品管理
        {
          path : '/home/goodsmanage',
          component : () => import('./views/GoodsManage/GoodsManage.vue')
        },
        // 商品添加
        {
          path : '/home/goodsadd',
          component : () => import('./views/GoodsAdd/GoodsAdd.vue')
        },
        // 库存管理
        {
          path : '/home/stockmanage',
          component : () => import('./views/StockManage/StockManage.vue')
        },
        // 添加库存
        {
          path : '/home/stockadd',
          component : () => import('./views/StockAdd/StockAdd.vue')
        },
        // 账号管理
        {
          path : '/home/accountmanage',
          component : () => import('./views/AccountManage/AccountManage.vue')
        },
        // 添加账号
        {
          path : '/home/accountadd',
          component : () => import('./views/AccountAdd/AccountAdd.vue')
        },
        // 密码修改
        {
          path : '/home/passwordmodify',
          component : () => import('./views/PasswordModify/PasswordModify.vue')
        },
        // 进货统计
        {
          path : '/home/stocktotal',
          component : () => import('./views/StockTotal/StockTotal.vue')
        },
        // 销售统计
        {
          path : '/home/salestotal',
          component : () => import('./views/SalesTotal/SalesTotal.vue')
        },
        // vip账号添加
        {
          path : '/home/vipaccountadd',
          component : () => import('./views/VipAccountAdd/VipAccountAdd.vue')
        },
        // vip账号管理
        {
          path : '/home/vipaccountmanage',
          component : () => import('./views/VipAccountMessage/VipAccountMessage.vue')
        },
        // 销售列表
        {
          path : '/home/productsaleslist',
          component : () => import('./views/ProductSalesList/ProductSalesList.vue')
        },
        // 商品出库
        {
          path : '/home/productshipment',
          component : () => import('./views/ProductShipment/ProductShipment.vue')
        },
        // 商品退货
        {
          path : '/home/salesreturn',
          component : () => import('./views/SalesReturn/SalesReturn.vue')
        },
      ]
    }
  ]
})
