// https://www.jianshu.com/p/89a05706917a

// 引入组件
import temp from "./myToast.vue"

// ----------弹出的组件公用一个属性------------

let instance; // 实例
let isShow = false; // 不显示
let time; // 储存显示状态
// 定义对象
const myToast = {
  install:function(Vue, options = {}) { //options 获取Vue实例的自定义属性
    let opt = temp.data(); // 获取组件中的默认配置
    Object.assign(opt, options); // 合并配置
    Vue.prototype.$myToast = (message, position) => { // 传入位置和文本两个参数
      // --------1: 如果多次$myToast,先关闭上一个$myToast----------
      if (isShow) {
        clearTimeout(time);
        instance.vm.visible = isShow = false; // instance.vm.visible 获取实例vue 的 visible值
        document.body.removeChild(instance.vm.$el) // vm.$el 指实例dom元素
        // return; // 如果toast还在，则不再执行
      }

      // --------2: 传入数据开启一个新的$myToast----------
      // 在传入数值的时候，替换 opt = temp.data() 的值
      if (message) {
        opt.message = message; // 如果有传message，则使用所传的message
      }
      if (position) {
        opt.position = position; // 如果有传type，则使用所传的type
      }

      let tempConstructor = Vue.extend(temp); // 注册一个组件构造器
      instance = new tempConstructor({ // 把opt = data 
        data: opt
      })
      instance.vm = instance.$mount(); // 将组件挂载到DOM上面
      document.body.appendChild(instance.vm.$el); // 将dom元素挂载到body下
      instance.vm.visible = isShow = true; // 改变状态为显示

      // --------3： 在 duration 之后关闭$myToast----------
      time = setTimeout(function() {
        instance.vm.visible = isShow = false;
        setTimeout(function() {
          document.body.removeChild(instance.vm.$el); // 1：内部定时器，在离开动画结束时才移除元素
        },400)
        // document.body.removeChild(instance.vm.$el); // 2: 直接移除，离开动画不生效
      }, opt.duration)
    }
  }
}

// 导出对象
export default myToast;