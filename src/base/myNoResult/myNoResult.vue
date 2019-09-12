<template>
  <div id="my-no-result">
    <slot>
      <div class="my-no-result-content">{{text}}</div>      
    </slot>
  </div>
</template>
<script>
export default {
  // https://blog.csdn.net/kangkang_style/article/details/88689821
  // name 1：dom递归调用自身 2：配置<keep-alive>标签的exclude或者include属性做组件筛选
  name:"myNoResult",
  props:{
    text:{
      type:String,
      default:"弄啥呢，啥都没有呢！！！"
    }
  }
}
</script>
<style lang="less">
  #my-no-result{
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items:center;
    .my-no-result-content{
      color:@text_color;
      font-size:@font_size_medium_x;
    }
  }
</style>
