import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from "fastclick"
// import mmToast from "base/mm-toast" //自动引入index.js文件
// import Icon from "base/mm-icon/mm-icon"
import VueLazyload from "vue-lazyload"
import { VERSION } from "./config" //从config导入版本号

// import "@/styles/index.less" //使用了@代表src

// 导入 fastclick.js 优化移动端300ms点击延迟
fastclick.attach(document.body)

// 弹出层组件 导入TempToast模块
// Vue.use()详解 
// https://www.jianshu.com/p/89a05706917a 
Vue.use(mmToast)

// icon组件
Vue.component(Icon.name,Icon);

// 懒加载 
// 使用来绑定图片： <img v-lazy="图片地址" :key="图片地址">
// https://www.cnblogs.com/xiao-ling-zi/p/10954417.html
Vue.use(VueLazyload,{
  preload:1, // 默认为1.3
  error:require('assets/img/error.png'), // require 防止找不到路径
  loading:require('assets/img/default.png'),
  attempt:2
  // loading:require("assets/img/default.png")
})

// 访问版本统计 （百度统计）
window._hmt && window._hmt.push(['_setCustomVar', 1 ,'version', VERSION, 1])

// 路由监控
// 定义title不改变的路由
const redirectList = ['/music/details','/music/comment']
router.beforeEach((to, from, next) => {
  // 1 监控路由跳转，把fullPath拼接进window._hmt
  window._hmt && to.path && 
  window._hmt.push(['_trackPageview', '/#' + to.fullPath]) 
  // 2 跳转时修改document.title
  if(redirectList.includes(to.path)){
    next();
  }else{
    document.title=(to.meta.title && `${to.meta.title}-qqyyPlayer在线播放器`) || 'qqyyPlayer在线播放器';   
    next();
  }
})

// 版权信息
window.qqyyPlayer = window.qqyyPlayer = `欢迎来到qqyyPlayer!
当前版本为：V${VERSION}
作者：昕昕

`






Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
