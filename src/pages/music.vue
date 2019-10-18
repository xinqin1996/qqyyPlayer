<!--
audio的绑定src


-->

<template>
  <div id="music">

    <!-- 内容 -->
    <div class="music-content">
      <!-- 内容左侧 -->
      <div class="music-left">
        <!-- -------1: music-btn组件引入------- -->
        <music-btn></music-btn>
        <!-- -------2: 子路由导入引入------- -->
        <keep-alive>
          <!-- 给子内容定义公共样式 -->
          <router-view class="music-list" v-if="$route.meta.keepAlive"/>
        </keep-alive>        
        <router-view class="music-list" v-if="!$route.meta.keepAlive"/>
      </div>
      <!-- 内容右侧 -->
      <my-lyric
       class="music-right"
      >
      </my-lyric>
    </div>

    <!-- 播放器 -->
    <div class="music-bar disable">
      <!-- 1: 开关按钮组 -->
      <div class="music-bar-btns">
        <my-icon type="kaishi" :size="38"></my-icon>
        <div class="music-bar-btn-center">
          <my-icon type="kaishi" :size="24"></my-icon>          
        </div>

        <my-icon type="kaishi" :size="38"></my-icon>
      </div>

      <!-- 2： 进度条部分 -->
      <div class="music-bar-music">
        <div class="music-bar-music-info">
          <div style="display:none">欢迎使用欢迎欢迎qqyyPlayer</div>
          <div>
            歌曲名字让我们航程作伴
            <span>时间</span>
          </div>
        </div>
        <div class="music-bar-music-bar">
          <my-progress></my-progress>
        </div>
      </div>

      <!-- 3:  切换播放模式 -->
      <div class="music-bar-mode">
        <my-icon type="kaishi" :size="30"></my-icon>
      </div>
      <!-- 4:  评论 -->
      <div class="music-bar-comment">
        <my-icon type="kaishi" :size="30"></my-icon>
      </div>
      <!-- 5:  音量控制 -->
      <div class="music-bar-volume">
        <my-icon type="kaishi" :size="30"></my-icon>
        <div class=music-bar-volume-line></div>
      </div>

      <!-- <audio controls src="https://music.163.com/song/media/outer/url?id=1369798757.mp3"></audio> -->
    </div>

    <!-- 背景 -->
    <div class="qqyyPlayer-bg"></div>

    <!-- 遮罩 -->
    <div class="qqyyPlayer-mask"></div>

    <!-- less & 的应用 -->
    <!-- <div class="fix">
      123
      <div class="fix-name">4567</div>
    </div> -->
  </div>
</template>

<script>
import myProgress from "base/myProgress/myProgress";
import musicBtn from "components/musicBtn/musicBtn.vue";
import myLyric from "components/myLyric/myLyric";
import myPlayerMusic from "pages/myPlayer.js";
import { mapMutations, mapGetters } from 'vuex';

export default {
  name:'music',
  components:{
    musicBtn,
    myLyric,
    myProgress
  },
  flters:{},
  props:{},
  data(){
    return { 
      // 这三个数据都是都myPlayer.js中的监听事件，动态获取到的
      currentProgress:0, // 当前缓存进度，以audio.buffered.end(0)的时间为准
      musicReady:false, // 是否可以使用播放器
      currentTime:0, // 当前播放时间
      lyric:[], // 歌词
      
    }
  },
  computed:{
    ...mapGetters([
      "audioEle", // audio元素
      'mode', // 播放模式
      'currentMusic', // 当前播放的音乐 
      'playing', // 是否正在播放（播放状态）
    ])
  },
  watch:{
    // 监听当前正在播放的歌曲（对象）
    currentMusic(newMusic, oldMusic) {
      console.log(newMusic)
      //---------------该判断条件可能不用----------------
      if (!newMusic.id) { // 首先进行判断 如果id不存在返回
        this.lyric = []
        return
      }
      this.audioEle.src = newMusic.url;
      // 播放的歌曲改变时充值相关参数
      this.currentProgress = this.currentTime = 0;
      this.audioEle.play(); // 改变时播放
    },
    // 监听播放状态
    playing(newPlaying) {
      const audio = this.audioEle;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      })
    }
  },
  // activated:{},
  methods:{
    next(){
      alert("播放下一首歌")
    }
  }, 
  created(){
    
  },
  mounted(){
    // 初始化audio（调用myPlayer.js中的播放器初始化函数）
    this.$nextTick(() => {
      myPlayerMusic.initAudio(this) // 传入当前vm实例对象
    })
  },
  // render(){}, // html模板
}
</script>

<style lang="less">
  // 主体样式 
  #music{
    padding:75px 25px 25px 25px;
    width:100%;
    height:100%;    
    max-width: 1750px;
    margin:0 auto;
    @media (max-width: 767px){
      padding:75px 15px 5px 15px;
    }
  }

  // 内容样式
  #music{
    .music-content{
      display:flex;
      height:calc(~"100% - 80px");
      .music-left{
        flex:1;
        transition:0.7s;  // 加点过渡
        .music-list{
          height:calc(~"100% - 60px")
        }
      }
      .music-right{
        margin-left:10px;
        width:310px;
        @media (max-width:960px){
          &{ display:none; }
        }
      }
    }
  }

  // mask bg 样式
  #music{
    // 适应父元素的100%
    .qqyyPlayer-mask,
    .qqyyPlayer-bg{
    position: absolute;   // 设置 100% 宽高
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    }
    .qqyyPlayer-mask{
      z-index:-1;
      background-color:@mask_color;
    }
    .qqyyPlayer-bg{
      z-index:-2;
      background-image:url("../assets/img/nidouzi.jpg");
      background-repeat:no-repeat;
      background-size:cover;
      filter:blur(1px);
      background-position:center center;
      opacity:0.7;
      transition:1s;
    }
  }
  
  // 播放器
  #music{
    // 定义初始样式
    .music-bar{
      width:100%;
      height:80px;
      padding-bottom:15px;
      display: flex;
      align-items: center;
      color:@text_color_active;
      position:relative;
      // >div{  border:1px solid red;  }
      .music-bar-btns{
        min-width:180px;
        // height:40px;
        display: flex;
        justify-content: space-between;
        align-items:center;
        .music-bar-btn-center{
          width:40px;
          height:40px;
          display: flex;
          justify-content: center;
          align-items:center;
          border-radius:50%;
          background-color:@control_bg_color;
        }
      }
      .music-bar-music{
        margin-left:40px;
        width:0;
        flex:1;
        // 上部介绍
        .music-bar-music-info{
          font-size:@font_size_small;
          line-height:15px;
          padding-right:80px;
          width:100%;
          position:relative;
          >div{ 
            .no-wrap(); // 使歌曲名不换行
          }
          span{ // 时间定位
            position:absolute;
            top:0px;
            right:5px;
          }
        }
        // 下部进度条
        .music-bar-music-bar{
          height:12px;
          width:100%;
        }
      }
      .music-bar-mode{
        margin-left:20px;
      }
      .music-bar-comment{
        margin-left:20px;
      }
      .music-bar-volume{
        .flex-center();
        margin-left:20px;
        .music-bar-volume-line{
          width:115px;
          height: 5px;
          border:1px solid #eee;
          margin-left:6px;
          @media (max-width: 767px) {
            display: none;
          }
        }
      }
      // 屏幕小于520时重新布局 (使用绝对定位布局)
      &{
        @media (max-width: 520px) {
          >div{
            position:absolute; // 全部定位      
          }
          .music-bar-btns{
            width:56%;
            bottom:10px;
            left:50%;
            transform:translate(-50%);
          }
          .music-bar-music{
            top:-10px;
            width:100%;
            margin:0px;
          }
          .music-bar-mode{
            bottom:15px;
            left:5px;
            margin:0px;
          }
          .music-bar-comment{
            bottom:15px;
            right:5px;
          }
          .music-bar-volume{
            display:none;
          }
        }      
      }

    }
  }

  // #music{
  //   .fix{
  //     position:fixed;
  //     top:0px;
  //     z-index: 5000;
  //     color:aquamarine;
  //     &{
  //       color:blue;
  //     }
  //     &-name{ // 转义为.fix-name, 不会形成嵌套
  //       color:red;
  //     }
  //   }
  // }
</style>
