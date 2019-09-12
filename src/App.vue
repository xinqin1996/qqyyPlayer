<template>
  <div id="app">
    <!-- 主体 -->
    <my-header></my-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="router-view"/>      
    </keep-alive>
    <!-- router-view 的 class 会和组件合并在一起 -->
    <router-view v-if="!$route.meta.keepAlive" class="router-view"/>
    <router-view  class="router-view"/>
    <!-- 更新说明 -->
    <!-- <my-dialog></my-dialog> -->
    <audio src=""></audio>
  </div>
</template>

<script>
import myHeader from 'components/myHeader/myHeader.vue';
export default {
  data(){
    return{

    }
  },
  components:{
    myHeader,
  }
}
</script>

<style lang="less">
#app {
  // text-align: center;
  // 定义的全局样式有效
  color: @text_color;          //定义全局字体颜色
  font-size:@font_size_medium; //定义全局字体大小
  position:relative;
  width:100%;
  height:100%;
  user-select: none;  // 全局定义阻止用户选中文字

  .router-view{
    width:100%;
    height:100%;

  }
  audio {
    position:fixed;
  }
}
</style>
