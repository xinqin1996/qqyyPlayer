<template>
  <transition name="my-dialog-fade">
    <!-- 默认dialog是不显示的 -->
    <div v-show="dialogShow" class="my-dialog-box" @click="closeDialog">
      <div class="my-dialog-wrapper">
        <div class="my-dialog-content">
          <!-- 上：头部 -->
          <div class="my-dialog-head" v-text="headText">
          </div>
          <!-- 中：slot插槽 -->
          <!-- https://blog.csdn.net/weixin_41646716/article/details/80450873 -->
          <slot>
            <!-- div会在slot插入时，被完全替换掉 -->
            <div class="my-dialog-text" v-html="bodyText"></div>
          </slot>
          <!-- 下：按钮组 -->
          <div class="my-dialog-btns">
            <!-- 下方按钮 ：一 -->
            <div
              @click="cancel"
              v-if="dialogType!=='alert'" 
              v-text="cancelBtnText"
              class="my-dialog-btn-cancel"
            ></div>
            <!-- 下方按钮：二 -->
            <!-- 具名插槽 -->
            <slot name="btn"></slot>
            <!-- 下方按钮：三 -->
            <div 
              @click="confirm"
              class="my-dialog-btn-confirm"
              v-text="confirmBtnText"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name:"my-dialog",
  // props 接受的参数
  props:{
    // confirm/alert  类型为confirm时显示取消按钮
    // 默认为confirm 可以取消弹出框
    dialogType: {
      type:String,
      default:'confirm'
    },
    // head 文字
    headText: {
      type:String,
      default:"提示"
    },
    // body 文字
    bodyText: {
      type:String,
      default:""
    },
    // 取消按钮文本
    cancelBtnText:{
      type:String,
      default:"取消"
    },
    // 确定按钮文本
    confirmBtnText:{
      type:String,
      default:"确定"
    },
    appendToBody:{
      type:Boolean,
      defaule:true
    }
  },
  data(){
    return{
      // 使用 $refs 在父组件直接修改
      dialogShow:false,
    }
  },
  // 监听 将元素挂载到body下面
  watch: {
    dialogShow(val){
      if(val && this.appendToBody){
        document.body.appendChild(this.$el)
      }
    }
  },
  // 挂载到dom树
  mounted(){
    // 打印$el (v-show 控制显示)
    // 使用v-if将会导致组件在不显示时dom树为空，无法打印出$el
    // console.log(this.$el) 打桩
    if(this.dialogShow && this.appendToBody){
      document.body.appendChild(this.$el)
    }
  },
  // 组件销毁时
  destroyed() {
    console.log("my-dialog组件被销毁")
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    // 显示事件
    show() {
      this.dialogShow = true
    },
    // 隐藏事件
    hide() {
      this.dialogShow = false
    },
    // 取消事件 
      // 1 关闭组件
      // 2 强行调用父组件传过来的取消函数 ,函数不存在也2不会报错
    cancel() {
      this.hide()  
      this.$emit('cancel')
    },
    // 确定事件
      // 1 关闭组件 点击按钮必定会触发关闭事件
      // 2 调用父组件传过来的确定函数 ,函数不存在也不会报错
    confirm() {
      this.hide()
      this.$emit('confirm')
    },
    // 点击空白处关闭dialog 
    closeDialog(e){
      if(e.target.className=="my-dialog-box"){
        this.hide();
      }
    },
  }
}
</script>
<style lang="less">
  @my-dialog:my-dialog;

  // -----------绑定动画-----------可以嵌套
  .@{my-dialog}-fade-enter-active{
    animation:my-dialog-show-in 0.3s;
    .@{my-dialog}-content{
      animation:my-dialog-bounce-in 0.3s;
    }
  }
  .@{my-dialog}-box{
    user-select: none; // 阻止用户选中文字 提高界面美观度
    position:fixed;
    // display:none;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:999;
    background-color:@dialog_bg_color;
    .@{my-dialog}-wrapper{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      z-index:1000;
      .@{my-dialog}-content{
        transition:0.3s linear;
        width:420px;
        border-radius:10px; 
        background-color:@dialog_content_bg_color;
        @media (max-width: 767px){
          width:270px;
          border-radius:10px;
        }
        .@{my-dialog}-head{
          padding:15px 15px 0px;
          font-size:@font_size_large;
          color:@text_color_active;
          text-align:center;
          @media (min-width: 768px) {
            text-align:left;
          }
        }
        .@{my-dialog}-text{
          padding: 20px 15px;
          line-height:22px;
          font-size:@font_size_medium;
          color:@dialog_text_color;
          a{ color:@a_default_color; }
        }
        .@{my-dialog}-btns{
          display:flex;
          text-align: center;
          font-size:@font_size_large;
          color:@dialog_text_color; 
          @media (max-width: 767px){
            justify-content: space-between;  
            >div{
              flex:1;
              line-height: 43px;
              border-top:1px solid @dialog_line_color;
              border-left:1px solId @dialog_line_color;
              &:first-child{border-left:none;}
            }                       
          } 
          @media (min-width: 768px){
            &{
              padding:0 15px 10px;
              justify-content:flex-end;
              >div{
                padding:0 15px;
                line-height: 30px;
                font-size:@font_size_medium;
                border:1px solid @btn_color;
                border-radius:2px;
                margin-left:10px;
                &{
                  cursor:pointer;
                }
                &:hover{
                  color:@btn_color_active;
                  border:1px solid @btn_color_active;
                }
              }              
            }

          }
        }
      }
    }
  }
  // 定义 dialog 静入动画
  @keyframes my-dialog-show-in {
    0% {
      opacity:0
    }
    100% {
      opacity:1
    }
  }
  @keyframes my-dialog-bounce-in {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(1.2)
    }
    100% {
      transform: scale(1)
    }
  }
</style>
