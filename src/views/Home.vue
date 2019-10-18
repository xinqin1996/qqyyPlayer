<template>
  <div class="home">
    

 
    <img alt="Vue logo" src="../assets/logo.png">

    <div class="view-fixed">
    <div>这个页面用来做web-view测试{{add}}</div>         
    <button @click="goHome">返回前一页</button>
    </div>  

    <HelloWorld msg="Welcome to Your Vue.js App"/>

  

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'home',
  data() {
    return {
        add:""
    }
  },
  created() {
  },
  methods: {
    goHome() {
      // console.log("测试开始");
      // my.postMessage({
      //   name:"测试web-view"
      // })

      // uni.postMessage({  
      //   data: {  
      //       action: '这是一条postMessage'  
      //   }  
      // }); 

      uni.navigateTo({url: '/pages/demo/time?uname=xinqin'});

      // 网页向小程序 postMessage 消息
      // my.postMessage({name:"测试web-view"});
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style >
  .view-fixed {
    color: #000;
  }
</style>
