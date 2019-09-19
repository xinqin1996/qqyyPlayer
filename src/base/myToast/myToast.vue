<template>
<transition name="toast-fade">
  <div v-show="visible" class="my-toast" :class="positionClass">
    {{ message }}
  </div>
</transition>

</template>

<script>
export default {
  name:"myToast",
  data() {
    return {
      position: "center", // 默认的显示位置 居中
      message: "欢迎", // 默认的显示文本 
      duration: 1500, // 显示时间
      visible: false, // 是否显示
    }
  },
  computed: {
    positionClass() { // 拼接class返回一个位置class
      return 'my-toast-' + this.position;
    }
  }
}
</script>

<!-- less预处理器  && & &- & &-->
<!-- https://www.cnblogs.com/waibo/p/7904102.html-->
<style lang="less" scoped>
  @prefix-cls: my-toast;
  .@{prefix-cls} {
    position:fixed;
    z-index: 1999;
    left:50%;
    transform: translateX(-50%);
    background:@toast_bg_color;
    border-radius:5px;
    color:@toast_text_color;
    font-size:@font_size_medium;
    padding:10px 20px;
    line-height:20px;
    overflow: hidden;
    max-width:80%;
    text-align: center;
    &&-center{
      top:50%;
      margin-top:-20px;
    }
    &&-top{
      top:10%;
    }
    &&-bottom{
      bottom:10%;
    }
  }
  .toast-fade-enter,
  .toast-fade-leave-to{
    opacity:0;
    transform: translate(-50%, -15px);
  }
  .toast-fade-enter-to,
  .toast-fade-leave{
    opacity:1;
    transform: translate(-50%, 0px);
  }
  .toast-fade-enter-active,
  .toast-fade-leave-active{
    transition:0.3s;
  }
</style>