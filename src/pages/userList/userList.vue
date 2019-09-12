<template>
  <div>
    <template v-if="list.length>0">
    </template>
    <my-no-result text="弄啥子呢！！！"></my-no-result>
  </div>
</template>
<script>
import myNoResult from "base/myNoResult/myNoResult"
export default {
  data(){
    return{
      list:[],
    }
  },
  components:{
    myNoResult,
  }
}
</script>
<style lang="less">
  
</style>
