import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import music from './pages/music.vue'

Vue.use(Router)

/** ------------------------------------------- */
/** 重点：关于多级子路由，
 * 
 * 可以的话不要在多级路由中，单独的设置parent路由导航
 * 
 * 当parent / children 都设置了缓存时，数据会互相传输，不一样时，以children为准，parent会有独立的数据
 * 
 * 在children设置里定义了keepAlive=true缓存
 * 1：children路由定义了keepAlive=true缓存,在访问parent下的children时，parent路由是否设置缓存，
 * 都将被定义为chileren一样的缓存方式；
 * 2：parent单独路由访问，按照自己的keepAlive来设置缓存
 * 3：并且从 parent/children=>parent=>parent/children parent/children页面中的parent路由中的
 * 数据是缓存的状态parent中的数据是未缓存的状态，数据是不一样的
 * 
 * 4: 有一个孩子没有设置，缓存，将导致其页面所有数据会刷新
 * 设置了缓存的孩子，页面所有数据不刷新
 * */
/** ------------------------------------------- */

// 后端配置 history模式的后端配置
// https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
// 定义routes

const routes=[
  {
    path:'/home',
    component: ()=>import('./views/Home.vue'),
    meta: {
      title: 'home',
      // keepAlive: false,
    } 
  },
  {
    path:'/',
    redirect:'/music', // 重定向
    meta: {
      title: 'music',
      // keepAlive: false,
    } 
  },
  {
    path: '/music',
    name: 'music',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('pages/music'),
    redirect:'/music/playlist',
    meta: {
    } ,
    children:[
      {
        path: '/music/playlist',
        component: ()=>import('pages/playList/playList.vue'),
        meta: {
          keepAlive: true,
          title: '播放列表'
        } 
      },
      {
        path: '/music/userlist',
        component: ()=>import('pages/userList/userList.vue'),
        meta: {
          keepAlive: true,
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


// Vue keep-alive实践总结
// https://www.cnblogs.com/sysuhanyf/p/7454530.html
// 使用<keep-alive>会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来created钩子中获取数据的任务。
// beforeRouteLeave(to,from,next)