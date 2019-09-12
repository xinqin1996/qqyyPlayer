<template>
  <div id="music">
    <!-- 内容 -->
    <div class="music-content">
      <!-- 内容左侧 -->
      <div class="music-left">
        <!-- -------1: music-btn组件引入------- -->
        <music-btn></music-btn>
        <!-- <music-button></music-button> -->
        <!-- -------2: 子路由导入引入------- -->
        <keep-alive>
          <router-view class="music-list" v-if="$route.meta.keepAlive"/>
        </keep-alive>        
        <router-view class="music-list" v-if="!$route.meta.keepAlive"/>
      </div>
      <!-- 内容右侧 -->
      <div class="music-right"></div>
    </div>
    <!-- 播放器 -->
    <div class="music-bar"></div>
    <!-- 背景 -->
    <div class="qqyyPlayer-bg"></div>
    <!-- 遮罩 -->
    <div class="qqyyPlayer-mask"></div>
  </div>
</template>

<script>
import musicBtn from "components/musicBtn/musicBtn.vue";



export default {
  data(){
    return {

    }
  },
  components:{
    musicBtn
  }
}
</script>

<style lang="less">
  #music{
    padding:75px 25px 25px 25px;
    width:100%;
    height:100%;    
    max-width: 1750px;
    margin:0 auto;
  }

  // 内容样式
  #music{
    .music-content{
      display:flex;
      height:calc(~"100% - 80px");
      .music-left{
        border:1px solid red;
        flex:1;
        transition:0.7s;  // 加点过渡
        .music-list{
          border:1px solid red;
          height:calc(~"100% - 60px")
        }
      }
      .music-right{
        border:1px solid red;
        margin-left:10px;
        width:310px;
        @media (max-width:960px){
          &{ display:none; }
        }
      }
    }
  }

  // mask bg 样式
  #music{
    // 适应父元素的100%
    .qqyyPlayer-mask,
    .qqyyPlayer-bg{
    position: absolute;   // 设置 100% 宽高
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    }
    .qqyyPlayer-mask{
      z-index:-1;
      background-color:@mask_color;
    }
    .qqyyPlayer-bg{
      z-index:-2;
      background-image:url("../assets/img/nidouzi.jpg");
      background-repeat:no-repeat;
      background-size:cover;
      filter:blur(1px);
      background-position:center center;
      opacity:0.7;
      transition:1s;
    }
  }
</style>

