<template>
  <div id="music-btns">
    <router-link to="/music/playlist" tag="span">正在播放</router-link>
    <router-link to="/music/userlist" tag="span">推荐</router-link>
    <router-link to="/music" tag="span">搜索</router-link>
    <router-link to="/music" tag="span">我的歌单</router-link>
    <router-link to="/music" tag="span">我听过的</router-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  created(){

  }
}
</script>

<style lang="less" scoped>
  #music-btns{
    width:100%;
    height:60px;
    display:flex;
    @media (max-width: 767px){
      height:50px;
      border:1px solid red;      
    }
    @media (max-width:500px){
      justify-content: space-between;
    }
    &>span{
      width:90px;
      height: 40px;
      line-height: 38px;
      text-align: center;
      margin-right:8px;
      &:last-child{
        margin-right:0px;
      }
      border:1px solid @text_color;
      border-radius:3px;
      color:@text_color;
      cursor:pointer;
      &.active,    // 在这里定义路由被url匹配到时的颜色
      &:hover{
        border:1px solid @text_color_active;
        color:@text_color_active;
      }
      @media (max-width:767px){
        width:64px;
        height:35px;
        line-height:33px;
        margin-right:5px; 
      }
      @media (max-width:500px){
        width:18.5%;
        margin-right:0px;
        font-size:@font_size_small;
      }
    }
  }
</style>