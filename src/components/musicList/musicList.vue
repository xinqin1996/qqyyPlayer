<!-- -该musicList模块，其他模块通过往里面传数据和方法来生成不一样的页面- - -->
<!--
1: playlist / listType 由父组件传过来
2: ...mapGetters(["playing","currentMusic"]) 由vuex拿到播放的index / music
3: selectItem / deleteItem 把参数传给父组件，把事件交给myIcon调用
4：父 > 子 > myIcon
5: 最后的函数对数据的操作交由父组件来实行
-->


<template>
  <div id="music-list">
    <template  v-if="playlist.length>0">
      <!-- list-header -->
      <div class="list-header list-item">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span class="list-time" v-if="listType===1">时长</span>
        <span class="list-album" v-else>专辑</span>
      </div>
      <!-- list-content -->
      <div class="list-content" ref="listContent" @scroll="listScroll($event)">
        <!-- 绑定动态 on class -->
        <div
        v-for="(item,index) of  playlist" 
        :key="index" 
        class="list-item"
        :class="{'on':(playing && currentMusic.id == item.id)}"
        @dblclick="selectItem(item,index,$event)"
        >
          <span class="list-num">{{index+1}}</span>
          <div class="list-name">
            <span>{{item.name}}</span>
            <!-- 使用 :size = "40" 传输一个数字 -->
            <div class="list-icon">
              <div class="list-icon-block">
                <!-- class 绑定的class会以class的形式生效，并且和子组件的class合并
                而不会作为参数传给子组件 -->
                <!-- 在子组件中绑定函数，想要传入 $event， e是undefined -->
                <my-icon
                  class="hover"
                  @click.stop="selectItem(item,index)"
                  :type="getIconType(item)"
                  :size="35"  
                ></my-icon>              
              </div>
            </div>
          </div>
          <span class="list-artist">{{item.singer}}</span>
          <div class="list-time" v-if="listType===1">
            <span>{{item.duration | formatD}}</span>
            <div class="list-icon">
              <div class="list-icon-block">
                <my-icon
                  class="hover list-icon-del"
                  type="shanchux"
                  @click.stop="deleteItem(index)"
                  :size="35"
                ></my-icon>              
              </div>
            </div> 
          </div>
          <span class="list-album" v-else>{{item.album}}</span>
        </div>
      </div>
    </template>
    <my-no-result v-else></my-no-result>
  </div>
</template>
<script>
import myIcon from "base/myIcon/myIcon";
import { formatDuration } from "utils/filter";
import { mapGetters, mapMutations } from 'vuex';
import { setTimeout, setInterval } from 'timers';
import myNoResult from "base/myNoResult/myNoResult";
 
export default { 
  name:'musicList',
  components:{
    myIcon,
    myNoResult
  },
  filters:{
    // 时间过滤器 用于把时间转化为 04:35 的形式
    formatD:formatDuration,
  },  
  // 接受了传过来的playlist / listType
  props:{ 
    playlist:{
      type:Array,
      default:[],
    },
    /**0:显示专辑
      1：显示时间 */
    listType:{
      type:Number,
      default:0,
    }
  },

  data(){
    return{
      // 是否锁定滚动加载事件，默认锁定
      // ----------------滚动加载事件，在首页没有应用------------------
      lockUp:true,
      scrollTop:0,
    }
  },

  computed:{
    //             播放状态    当前音乐
    ...mapGetters(["playing","currentMusic"]),
  },

  watch:{
    // 滚动加载事件，在listType=2 ,lockUp=false 执行
    playlist(newList, oldList) {
      if (this.listType != 2) { //不等于2就不执行
        return;
      }
      if (newList.length != oldList.length) {
        this.lockUp = false;
      } else if (
        newList[newList.length - 1].id !== oldList[oldList.length -1].id
      ) {
       this.lockUp = false;
      }
    }
  },

  activated(){
    this.scrollTop && (this.$refs.listContent.scrollTop = this.scrollTop)
  },

  methods:{
    // 滚动介绍
    // https://www.cnblogs.com/wenruo/p/9754576.html
    // 1:滚动事件
    listScroll(e){
      let scrollTop = e.target.scrollTop; // scroll 上部溢出的高度
      this.scrollTop = scrollTop;
      if (this.listType != 2 || this.lockUp) {
        return;
      }
      //      内部子元素的高度和  自身高度  10200 425
      let { scrollHeight, offsetHeight  } = e.target;
      if (scrollTop + offsetHeight >= scrollHeight - 50) {
        this.lockUp = true; // 符合情况锁定lockUp
        // -------------************----------------
        // this.$emit("pullUp") // 触发事件  没有找到在哪里
      } 
    },

    // 2：回到顶部
    scrollToTop(){
      this.$refs.listContent.scrollTop = 0;
    },

    // 3：暂停播放事件 
    // 应该没有傻逼~~会在播放键上单击两次
    // 只要触发事件，不管怎么，一律切换模式
    selectItem(item,index,e){
      // 当e存在，且e.target.classNamef符合时 return（点击的是删除按钮不执行）
      if (e && /list-icon-del/.test(e.target.className)) {      
        return;
      }
      // 正在播放的歌 和 点击的歌一样，---切换暂停or播放
      if (this.currentMusic.id && item.id === this.currentMusic.id) {
        this.setPlaying(!this.playing);
        return;
      }else{
        // 如果不一样---开始播放,改变下标(调用playList.vue的事件)
        this.$emit("select", item, index);
      }
    },

    // 4：判断icon图标的样式
    // ------------------参数解构---------------------
    getIconType({ id: itemId }){
      // 参数解构
      const { playing, currentMusic: { id } } = this;
      if (playing === true && id === itemId) {
        return "zanting"
      } else {
        return "kaishi"
      }
    },

    // 5：从 playlist 中删除一个
    deleteItem(index){
      this.$emit("delete",index)
    },

    ...mapMutations({ setPlaying:"setPlaying" })
  },
  created(){
  },
  mounted(){},
  // render(){}, // html模板
}
</script>

<style lang="less" scoped>
  #music-list{
    height:100%;    
    .list-header{
      color:@text_color_active;
      padding-left:40px;
    }
    .list-item{
      width:100%;
      display:flex;
      line-height:50px;
      border-bottom:1px solid @list_item_line_color;
      .list-num{
        text-align: center;
        width:30px;
        margin-right:10px;
      }
      .list-name{
        //--------------设置flex:1使元素撑满剩下的宽度-------------
        //--------------设置width:0使元素在放不下自身内容时还是会被压缩，不设置会导致，宽度被内容强行撑开，失去弹性效果-------------
        flex:1;  
        width:0;        
        padding-right:50px;
        >span{
          display:block;
          .no-wrap(); // mixin.less里定义了
          // white-space: nowrap;
          // overflow: hidden;
          // text-overflow: ellipsis;
        }
      }
      .list-artist{
        width:150px;
        padding-right:5px; // 防止文字位置过近
        overflow: hidden;
        white-space:nowrap; // 文本不换行
        text-overflow: ellipsis;  // ...溢出隐藏
        @media (max-width:767px){
          width:20%;
        }
        @media (max-width:640px) {
          width:80px;
        }  
      }
      .list-time,
      .list-album{
        width:60px;
        @media (max-width:640px) {
          display: none;
        }        
      }
      .list-album{
        width:120px; // 稍微长一点，免得放不下
        .no-wrap();
      }
    }
  }
  #music-list{
    .list-content{
      width:100%;
      height:calc(~"100% - 60px");
      overflow-x: hidden;
      overflow-y: auto;
      // https://www.cnblogs.com/xiahj/p/8036419.html
      // 滚动回弹效果.
      -webkit-overflow-scrolling: touch;
    }
  }
  // list-icon 功能动态样式
  #music-list{
    .list-content{
      .list-item{
        &:hover{
          .list-icon{
            display: block;
          }
          .list-time>span{
            display:none;
          }
        }
      }
      // 当前播放的高亮
      .list-item.on{
        color:@music_playing_color;
        .list-num{
          font-size:0;
          background:url("~assets/img/wave.gif") no-repeat center center;
        }
      }
      .list-name{
        position:relative;
        @media (max-width: 767px){
          .list-icon{
            display:block;
          }
        }
      }
      .list-time{
        position:relative;
        .list-icon{
          left:0px;
        }
      }
      .list-icon{
        width:40px;
        height:40px;
        position: absolute;
        top:50%;
        right:10px;
        transform:translateY(-50%);
        display:none; // 一开始是none   display:flex; 两个不能一起设置
        color:@text_color;
        .list-icon-block{ // 确保不同的icon字体size，都可以居中
          display:flex;
          width:100%;
          height:100%;
          justify-content:center;
          align-items:center;
        }
        .hover:hover{
          color:@text_color_active;          
        }
      }      
    }
  }
</style>