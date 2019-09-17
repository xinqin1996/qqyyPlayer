<!-- icon 组件  是一个inline-block的行内块元素，全部由输入的type,size来控制大小和样式，本身不具有任何的位置样式-->
 <script>
 export default{
  name:"myIcon",
  props:{
    type:{
      type:String,
      // 可以使用required选项来声明这个参数是否必须传入
      required:true      
    },
    size:{
      type:Number,
      default:16,
    }
  },
  methods:{
    // 返回一个字符串class ( 控制icon类型 )
    getIconClass(){
      return `icon-${this.type}`
    },
    // 返回一个style对象 ( 控制字体size )
    getIconStyle(){
      return {fontSize:this.size+"px"};
    },
    // 调用父组件传过来的函数 ( 调用组件的函数 ) 传入e
    onClick(e){
      // console.log(e.target); // 这里打印出来的是<i></i> 不加e,在父级调用子组件绑定 click.stop 的时候回找不到e而报错，
      // 这个e参数，在父组件是无法获取的
      this.$emit('click',e);
    }
  },
  // 使用render创建一个html片段，使用了react的语法
  render(){
    const icon=(
      <i
        onClick={this.onClick}
        class={`iconfont ${this.getIconClass()}`}
        style={this.getIconStyle()}
      >
      </i>
    )
    return icon;
  },   
 }

 </script>
 <style lang="less">
 .iconfont{
   display:inline-block;
   font-style:normal;
   font-weight: normal;
   font-variant:normal; //small-caps 小型大写字体
   line-height:1;
   vertical-align:baseline;
  //  uppercase capitalize lowercase 字体大小写
   text-transform:none; 
  //  抗锯齿
   -webkit-font-smoothing:antialiased;
   -moz-osx-font-smoothing:grayscale;
 }
 </style>