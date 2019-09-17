<template>
  <div id="my-lyric">
    <!-- 1:封面图片 -->
    <dl class="music-info">
      <dt>
        <!-- 使用 ~ 获取path定义的路径 -->
        <img src="~assets/img/nidouzi.jpg" alt="">
      </dt>
      <dd>歌曲名：你是人间四月天</dd>
      <dd>歌手名：皆有西热</dd>
      <dd>专辑名：你是人间四月天</dd>
    </dl>
    <!-- 2:歌词部分 -->
    <div class="music-lyric">
      <div class="music-lyric-scroll">
        <h3>还没有开始播放音乐</h3>
        <template>
          <h3
            v-for="(item,index) of lyric"
            :key="index"
            :class="{on:true}"
          >{{item}}</h3>
        </template>
        <h3>暂无歌词！</h3>
        <h3>歌词加载失败！</h3>
      </div>
    </div>
  </div>
</template>

<script>
// import {} from "";

export default {
  name:'',
  components:{},
  flters:{},
  props:{},
  data(){
    return{
      lyric:['000012321sdffdsfsdfsdfdsfsdfsdfdsfsdfdsfsdfsdfsdfsdfsdfdsfsdfdsfdsfssadfdasfsdf000',1111,1222223123,12321,213123,345345,456546,65477,56756756,5675676,567567,567567,58768,234234,787686,234234,8678678,234234],
    }
  },
  computed:{},
  watch:{},
//   activated:{},
  methods:{},
  created(){},
  mounted(){},
  // render(){}, // html模板
}
</script>

<style lang="less" scoped>
// 属性选择器
// https://cloud.tencent.com/developer/ask/176421
  #my-lyric{
    .music-info{
      padding-bottom:20px;
      dt{
        margin:0 auto 15px;
        position:relative;
        img{
          display:block;
          position:relative;
          z-index: 99;
          height: 186px;
          margin:0 auto;
          border-radius:5px;
        }
        &:before{
          content:"";
          width:200px;
          height:180px;
          background:url("~assets/img/zhuanji.jpg") no-repeat; // 使用 ~ 获取path定义的assets路径
          background-size:cover;
          position:absolute;
          border-radius:10px;
          opacity:0.8;
          top:20px;
          left:50%;
          transform: translateX(-42%);
        }
      }
      dd{
        height:30px;
        line-height: 30px;
        color:@text_color;
        text-align: center;
        .no-wrap();
        &:hover{
          color:@text_color_active;
        }
      }
    }
  }
  #my-lyric{
    position:relative;
    .music-lyric{
      position:absolute;
      width:100%;
      height:234px;
      left:0;
      bottom:0;
      overflow: hidden;
      // background-image 配合使用
      // -webkit-mask-image属性详解 ( 透明色阻止div显示,映射最下面的背景，1显示 )
      // https://segmentfault.com/a/1190000011838367
      -webkit-mask-image:linear-gradient(
        to top,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.5) 15%,
        rgba(255,255,255,1) 25%,
        rgba(255,255,255,1) 75%,
        rgba(255,255,255,0.5) 95%,
        rgba(255,255,255,0) 100%,
      );
      .music-lyric-scroll{
        margin-top:90px;
        transition:0.6s;
        font-size:@font_size_small;
        line-height:34px;  
        .on{
          color:@lyric_color_active;
          .no-wrap();  
        }
      }
    }
  }
</style>