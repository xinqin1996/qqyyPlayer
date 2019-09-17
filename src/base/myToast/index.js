// https://www.jianshu.com/p/89a05706917a

// 引入组件
import temp from "./myToast.vue"

let instance;
let isShow = false;
let time; // 储存显示状态
// 定义对象
const myToast = {
  install:function(Vue, options = {}) {
    // Vue.component('Loading',temp)
    let opt = temp.data(); // 获取组件中的默认配置
    Object.assign(opt, options); // 合并配置
    Vue.prototype.$myToast = (message, position) => {
      if (isShow) {
        clearTimeout(time);
        instance.vm.visible = isShow = false;
        document.body.removeChild(instance.vm.$el)
        // return; // 如果toast还在，则不再执行
      }
      if (message) {
        opt.message = message; // 如果有传message，则使用所传的message
      }
      if (position) {
        opt.position = position; // 如果有传type，则使用所传的type
      }
      let tempConstructor = Vue.extend(Temp);
      instance = new tempConstructor({
        data: opt
      })
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.vm.visible = isShow = true;

      time = setTimeout(function() {
        instance.vm.visible = isShow = false;
        document.body.removeChild(instance.vm.$el)
      }, opt.duration)
    }
  }
}

// 导出对象
export default myToast;