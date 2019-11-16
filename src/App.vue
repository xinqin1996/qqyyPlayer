<template>
  <div id="app">
    <!-- 主体 -->
    <my-header></my-header>
    <!-- <keep-alive> -->
      <router-view v-if="$route.meta.keepAlive" class="router-view"/>      
    <!-- </keep-alive> -->
    <!-- router-view 的 class 会和组件合并在一起 -->
    <router-view v-if="!$route.meta.keepAlive" class="router-view"/>
    <!-- 更新说明 -->
    <!-- <my-dialog></my-dialog> -->
    <audio ref="myPlayer"></audio>
  </div>
</template>

<script>
import {getToplist} from "api";
import { mapMutations,mapActions } from "vuex";
import {defaultSheetId} from "@/config.js";
import myHeader from 'components/myHeader/myHeader.vue';
import { createTopList } from "utils/song";
import {call} from "./store/text.js"


/** --------在App.vue里面初始化数据--------- */
export default {
  data(){
    return{

    }
  },
  created(){
    call();
    // 获取正在播放列表
    getToplist(defaultSheetId).then(res=>{
      var list = res.playlist.tracks;
      // -----------截取100首歌展示------------
      var list = list.splice(0,50);
      list = this._formatSongs(list);
      console.log("打印列表的第一项：",list[0]);
      this.setPlaylist(list);
    }).catch(e=>{console.log(e)});

    // 设置audio元素 存放在vuex中
    this.$nextTick(() => {
      this.setAudioEle( this.$refs.myPlayer );
    })
  },

  components:{
    myHeader,
  },

  methods:{
    // 歌曲格式化函数（调用从utils/song.js 中引入的函数对歌词进行格式化）
    _formatSongs(list){
      let arr=[];
      list.forEach((elem,i)=>{
        arr.push(createTopList(elem))
      })
      return arr;
    },

    ...mapMutations({
      setAudioEle: 'setAudioEle'
    }),
    ...mapActions(["setPlaylist"])
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
    bottom:0;
    left:30%;
  }
}
</style>
