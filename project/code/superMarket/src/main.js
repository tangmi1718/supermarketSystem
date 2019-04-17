import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入 local 文件
import local from '@/utils/local';

// 引入request
import request from './utils/request';
// 将request挂在Vue原型上，供其他组件中的vue实例对象使用
Vue.prototype.request = request;

// 引入echarts -- 报表
import echarts from "echarts";
// 挂载在Vue原型上
Vue.prototype.echarts = echarts;

// 引入base.css
import '@/assets/css/base.css';

// element-ui 组件
import ElementUI from 'element-ui'; 
// element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'; 

// 组成element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false

// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // to: 要进入的目标路由对象  from: 当前导航正要离开的路由 next: 是一个函数 只要调用 才能进入下一步
  // 获取浏览器中的token
  const token = local.get('yiyayiyayo');
  // 如果有token 直接放行
  if (token) {
     // 放行
    next()
  } else { // 没有token
    // 如果要去登录 放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果想去其他界面 直接跳转到登录
      next('/login')
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

