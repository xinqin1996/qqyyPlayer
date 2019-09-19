<template>
  <header id="my-header">
    <h1  class="header">
      <a href="https://github.com/xinqin1996/qqyyPlayer" target="_blank">qqyyPlayer 在线音乐播放器</a>
    </h1>
    <!-- 开启登录按钮 -->
    <dl class="user">
      <template v-if="user.userId">
        <router-link class="user-info" to="/" tag="dt">
          <img class="avatar" :src="`${user.avatarUrl}?param=50y50`" alt="">
          <span>{{user.nickname}}</span>
        </router-link>
        <dd class="user-btn" @click="out">退出</dd>
      </template>
      <dd v-else class="user-btn" v-show="true" @click="openDialog(0)">登录</dd>
    </dl>
    <!-- 登录 -->
      <!-- 通过@confirm 事件，把事件传给子组件的confirm按钮  实现子传父 -->
    <my-dialog
      ref="loginDialog" 
      head-text="登录"
      confirm-btn-text="登录"
      cancel-btn-text="关闭" 
      @confirm="login"
    >
      <!-- 重点：--------关于slot的样式问题，一定要以插入div的样式为开头，因为数据
      和方法在这里定义，但是样式受到插入后的位置的影响，正常情况下是没问题的，当对子组件的位置
      进行移动时，比如document.body.appendChild($el)-------- -->
      <div class="my-dialog-text">
        <!-- v-model修饰符 -->
        <!-- https://www.cnblogs.com/yysbolg/p/9876276.html -->
        <input
          v-model.trim="uidValue"
          class="my-dialog-input clear_input_number" 
          type="number"
          autofocus="autofocus"
          placeholder="请输入您的网易云 UID"
          @keyup.enter="login"
        />
      </div>
      <!-- slot插槽的函数内容都定义在父组件里，只把内容呈现在子组件 -->
      <div slot="btn" @click="openDialog(1)">帮助</div>
    </my-dialog>
    <!-- 帮助 -->
    <my-dialog
      ref="helpDialog"
      head-text="登录帮助"
      confirm-btn-text="去登陆"
      cancel-btn-text="关闭"
      @confirm="openDialog(0)"
    >
      <div class="my-dialog-text">
        <p>1、<a target="_blank" href="http://music.163.com">点我(http://music.163.com)</a>打开网易云音乐官网
        </p>
        <p>2、点击页面右上角的“登录”</p>
        <p>3、点击您的头像，进入我的主页</p>
        <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
      </div>
    </my-dialog>
    <!-- 退出 -->
      <!-- 这里不需要slot -->
    <my-dialog
      ref="outDialog"
      body-tex="确认退出当前用户吗？"
      @confirm="out"
    ></my-dialog>
  </header>
</template>

<script>
import { getUserPlaylist } from "api";
import myDialog from "base/myDialog/myDialog";
import {mapActions} from "vuex"; // 导入mapActions


export default {
  components:{
    myDialog,
  },
  data(){
    return{
      user:{},
      uidValue:425558017,
    }
  },
  methods:{
    // 打开对话框   
    //-------可以直接修改refs中子组件的属性------    
    openDialog(key){
      switch(key){
        case 0: // 打开登录组件
          // this.$refs.helpDialog.hide();  不需要点击按钮，自动关闭当前组件
          this.$refs.loginDialog.show();
          break;
        case 1: // 打开帮助组件,关闭登录
          this.$refs.loginDialog.hide();        
          this.$refs.helpDialog.show();
          break;
        case 2: // 打开退出组件
          this.$refs.outDialogn.show();
        case 3: // 关闭登录 （在登录成功时）
          this.$refs.loginDialog.hide();
      }
    },
    // 在鼠标点击和回车时发起请求，关闭组件
    login(){
      if(this.uidValue===""){
        this.$myToast("UID 不能为空");
        this.openDialog(0);
        return;
      }
      this.openDialog(3)
      // 发起请求
      this._getUserPlaylist(this.uidValue)
    },
    // axios请求
    _getUserPlaylist(uid){
      getUserPlaylist(uid).then(res=>{
        this.user=res.playlist[0].creator;
        this.$myToast('欢迎  '+this.user.nickname)
      }).catch(e=>{
        console.log(e)
      })
    },
    // 退出登录
    out(){
      this.user={};
      this.$myToast("退出登录")
    },
    // actions映射
    // https://blog.csdn.net/zdj5495/article/details/84871050
    // 使用this.setUid()调用
    ...mapActions(["setUid"])
    
  }
}
</script>
<style lang="less">
  #my-header{
    position:absolute;
    top:0;    
    left:0;
    width:100%;
    height:60px;
    @media (max-width: 768px) {
      background: @header_bg_color;
    };
    .header{
      text-align: center;
      line-height:60px;
      font-size:@font_size_large;
      a{  color:@text_color_active;  };
      @media (max-width:760px) {
        padding-left:20px;
        text-align:left;
      }
    }
    .user{
      position:absolute;
      top:50%;
      right:15px;
      line-height:30px;
      transform:translateY(-50%);
      &-info {
        float:left;
        margin-right:15px;
        cursor: pointer;
        .avatar{
          width:30px;
          height:30px;
          border-radius:90px;
          vertical-align:middle;
        }
        span{
          margin-left:10px;
          font-size:@font_size_medium;
          color:@text_color_active;
        }
      }
      &-btn{
        float:left;
        font-size:@font_size_medium;
        color:@text_color;
        cursor:pointer;
        &:hover{
          color:@text_color_active
        }
      }
      @media (max-width:768px) {
        &-info{
          margin-right:10px;
        }
        span{
          display:none;
        }
      }
    }
  }
  .my-dialog-text{
    .my-dialog-input{
      width:100%;
      height:40px;
      box-sizing: border-box;
      padding:0 15px;
      background-color:transparent;
      outline:none;
      border:1px solid @input_border_color;
      color:@text_color_active;
      font-size:@font_size_medium;
      box-shadow: 0 0 4px 0px #FFF inset;
      // input placeholder颜色设置
      &::placeholder{
        color:@text_color;
      }
    }
    a{
      color:@a_default_color !important;
      &:hover{
        color:@a_hover_color !important;
      }
    }   
  }
</style>

