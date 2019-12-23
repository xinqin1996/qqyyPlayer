<template>
  <div class="hello">
    <h2>这里是父组件</h2>
    <my-demo></my-demo>
  </div>
</template>


<script>
import myDemo from "../components/demo/demo"
export default {
  data() {
    return {

    }
  },
  components:{
    myDemo
  }
}
</script>

<style>
  .hello {
    padding-top: 100px;
  }
</style>