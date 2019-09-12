import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

// 后端配置
// https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
// 定义routes

const routes=[
  {
    path:'/',
    redirect:'/music', // 重定向
    meta: {
      title: 'music',
      keepAlive: false,
    } 
  },
  {
    path: '/music',
    name: 'music',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('./pages/music.vue'),
    redirect:'/music/playlist',
    meta: {
      keepAlive: false,
    } ,
    children:[
      {
        path: '/music/playlist',
        component: ()=>import('./pages/playList/playList.vue'),
        meta: {
          keepAlive: false,
          title: '播放列表'
        } 
      },
      {
        path: '/music/userlist',
        component: ()=>import('pages/userList/userList.vue'),
        meta: {
          keepAlive: false,
          title: '我的歌单'
        }
      }
    ]
  },
  {
    path:'*',
    component:NotFound,
  },
]

// 创建router
// https://blog.csdn.net/u012982629/article/details/80463583
const router = new Router({
  routes,
  // <router-link>被点击激活的时候就会被加上is-active这个class了
  // 指<router-link>的路径匹配了浏览器url的一部分
  // https://blog.csdn.net/cofecode/article/details/80663259
  linkActiveClass: 'active',     //模糊匹配
  linkExactActiveClass:'active',  //精准匹配
  // 缓存保存
  // mode: 'history',     //history // hash    需要后台配置，否则存在问题
  // 在缓存状态下，页面返回将回到离开时的位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if(from.meta.keepAlive){
        from.meta.savedPosition=document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0} 
    }
  }
  //------------------注释------------------：
  // 位置确实记录上了(加缓存，返回不刷新页面)，也就是说，返回不触发created，所以有些页面需要返回触发的东西都写在activated里面
  //activated() 在进入页面时触发函数，在缓存下也触发

  //1 获取路由地址
  // console.log(this.$route.path)
  // console.log(window.location.href)
  //2 返回前一个页面 
  // history.back();回到上一页
})

// 导出router
export default router;
