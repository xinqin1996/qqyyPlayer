<template>
  <div v-show="visible" class="my-toast" :class="positionClass">
    {{ message }}
  </div>
</template>

<script>
export default {
  name:"myToast",
  data() {
    return {
      position: "center", // 默认的显示位置
      message: "", // 默认的显示文本
      duration: 1500, // 显示时间
      visible: false, // 是否显示
    }
  },
  computed: {
    positionClass() {
      return 'my-toast-' + this.position;
    }
  }
}
</script>

<style lang="less" scoped>
  @profix-cls: mm-toast;
  
</style>