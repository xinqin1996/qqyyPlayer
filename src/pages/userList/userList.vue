<template>
  <div>
    <template v-if="list.length>0">
    </template>
    <my-no-result v-else text="弄啥子呢！！！"></my-no-result>

      <div ref="msgDiv">{{msg}}</div>
      <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
      <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
      <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
      <button @click="changeMsg">
      Change the Message
      </button>

  </div>
  
</template>
<script>
import myNoResult from "base/myNoResult/myNoResult"
export default {
  data(){
    return{
      msg:"hello vue",
      msg1:'',
      msg2:'',
      msg3:'',
      // msg1:'',
      list:[1],
    }
  },
  components:{
    myNoResult,
  },
  methods:{
    changeMsg() {
      this.msg = "Hello world."
      this.msg1 = this.$refs.msgDiv.innerHTML
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
      })
      this.msg3 = this.$refs.msgDiv.innerHTML
    }
  }
}
</script>
<style lang="less">
  
</style>
