<template>
  <div id="playlist">
    <!-- 把删除事件 、 播放事件传给子组件 -->
    <music-list
      :playlist="playlist"
      :listType = '1'
      @select="selectItem"
      @delete="deleleItem"
    ></music-list>
  </div>
</template>

<script>
// 在父组件获取数据，传递给子组件
import musicList from "components/musicList/musicList";
import { mapActions,mapGetters,mapMutations } from "vuex";
import { setTimeout } from 'timers';

export default {
  name:"playList",
  data(){
    return{
      list:[],
    }
  },
  computed:{
    // 获取playlist
    ...mapGetters(['playlist','currentIndex']),
  },
  methods:{
    // 1:设置播放的下标 （当点击的不是正在播放的歌曲时：1都设置true,2改变下标）
    selectItem(item, index) {
      this.setPlaying(true); // 设置true
      this.setCurrentIndex(index); // 设置下标 
    },

    ...mapActions(["removePlayListItem"]),
    
    ...mapMutations({
      setPlaying:"setPlaying",
      setCurrentIndex:"setCurrentIndex",
    }),
 
    // 2:删除playlist的一个music
    deleleItem(index){
      let list = this.playlist;
      // var arr = [1,2,3,4];
      // console.log(...arr);
      // 该语法直接把数组中元素按照顺序输出
      list.splice(index,1);
      // 传入 删除后的list / index
      index === this.currentIndex ? this.$myToast("删除成功,自动播放下一首歌","center") :  this.$myToast("删除成功","center");
      this.removePlayListItem({ list,index })      
    },
  },
  components:{
    musicList,
  },
  mounted(){

  }
}
</script>

<style lang="less">
  
</style>
