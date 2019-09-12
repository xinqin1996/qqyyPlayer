<template>
  <div id="playlist">
    <music-list></music-list>
  </div>
</template>

<script>
// 在父组件获取数据，传递给子组件
import musicList from "components/musicList/musicList"
export default {
  name:"playList",
  data(){
    return{
      list:[],
    }
  },
  components:{
    musicList,
  }
}
</script>

<style lang="less">
  
</style>
