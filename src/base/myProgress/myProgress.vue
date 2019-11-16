<!--歌曲播放进度条 组件-->
<!---->
<!-- 从上面页面传入了 1：歌曲进度 2：缓存进度 -->

<!--outer：缓冲条：存在业务逻辑问题--> 
<!--inner: 播放条-->

<template>
  <!--进度条拖动-->
  <div ref="myProgress" class="myProgress" @click="barClick">
    <div class="myProgress-bar"></div>
    <div ref="myPercentProgress" class="myProgress-outer" :style="{width:outerWidth+'px'}"></div> 
    <div ref="myProgressInner" class="myProgress-inner" :style="{width:innerWidth+'px'}">
      <!--  在 鼠标/手指点击dot时，开启进度点拖动功能-->
      <div
        class="myProgress-dot"
        @mousedown="barDown"
        @touchstart.prevent="barDown"
      ></div>
    </div>
  </div>
</template>

<script>
const dotWidth = 10 // 定义了播放点的尺寸 = padding*2 = 5*2
export default {
  name: 'myProgress',
  props: {
    // 进度值一 （百分比） (歌曲播放百分比) （计算当前时间/总时长）
    percent: {
      type: [Number],
      default: 0
    },
    // 进度值二（歌曲缓冲进度用）（缓冲百分比）（计算的是第一段缓冲时间/总时长）
    percentProgress: {
      type: [Number],
      default: 0
    }
  },
  data() {
    return {
      outerWidth: 0, // 缓冲长度
      innerWidth: 0, // 播放长度
      move: {
        status: false, // 是否可拖动
        startX: 0, // 记录鼠标的起始clientX
        left: 0, // 记录当前长度

      }
    }
  },
  computed: {
    // 进度条长度 （屏幕自适应的进度条总长度myProgress-bar）
    barWidth() {
      let Width = this.$refs.myProgress.clientWidth - dotWidth
      return Width;
    },
  },
  watch: {
    // 监听播放进度 （传入播放进度，改变innerWidth）
    percent(newPercent) { // 监听music页面传过来的播放进度，移动滑块
      if (newPercent >= 0 && !this.move.status) { // 鼠标/手指点到时，进度条暂停变化
        // element.clientWidth：直接获取元素的宽度 (ele.width不存在)
        const offsetWidth = newPercent * this.barWidth // 获取播放条的长度
        this.moveSilde(offsetWidth)
      }
    },
    // 监听缓存条进度 (传入缓存进度，改变outerWidth）
    percentProgress(newValue) {
      let offsetWidth = this.barWidth * newValue;
      this.outerWidth = offsetWidth;
    }
  },
  mounted() { 
    this.$nextTick(() => {
      this.bindEvents();
    })
  },
  methods: {
    // 移动滑块 (传入)
    moveSilde(offsetWidth) {
      this.innerWidth = offsetWidth;
    },
		// 修改percent (修改歌曲播放百分比)
		// 该函数动态获取比例
		// 在鼠标拖拽滑块时，实施改变innerWidth的宽度变化，，计算百分比
		commitPercent() {
		  let percent = this.innerWidth / this.barWidth; 
		  this.$emit('changePercent', percent)
		},
    // 添加绑定事件
    bindEvents() {
      document.addEventListener('mousemove',this.barMove);
      document.addEventListener('mouseup',this.barUp);
      document.addEventListener('touchmove',this.barMove);
      document.addEventListener('touchend',this.barUp);
    },
    // myProgress点击事件
    //  - 点击时改变innerWidth宽度
    //  - 点击时改变播放进度
    // 计算innerWidth就能解决一切东西
    barClick(e) {
      let offsetWidth = Math.min(
        this.barWidth, Math.max(
					0, e.offsetX-5
				)
      )
      // console.log(e.offsetX-5)
			this.moveSilde(offsetWidth)
			this.commitPercent();
    },
    // 1:鼠标/手指 释放事件
    barUp() {
      this.move.status = false;  
    },
    // 2:鼠标/手指 移动事件
    //   - 触发innerWidth变化
    //   - 歌曲播放百分比动态改变
    barMove(e) {
      e.stopPropagation();
      // e.preventDefault(); 报错，无法取消监听事件对象的默认事件
      if(!this.move.status) {
        return;
      }
      let endX = e.clientX || e.touches[0].clientX;
      let intervalX = endX - this.move.startX;
      let offsetWidth = intervalX + this.move.left; // 把起始宽度+鼠标移动的距离
      offsetWidth = Math.max(0, offsetWidth);
      offsetWidth = Math.min(this.barWidth, offsetWidth);
      this.moveSilde(offsetWidth); // 改变滑块位置
      this.commitPercent(); // 调整percent
    },
    // 3:鼠标/手指 按下事件 (e.client 浏览器可视区域)
    // 判断式获取不同设备下的 clientX;
    // 获取 起始鼠标位置 和 起始进度条长度
    barDown(e) {
      e.stopPropagation();
      e.preventDefault();
      this.move.status = true;
      // console.log(e.clientX) pc端
      // console.log(e.touches[0].clientX) 手机端
      this.move.startX = e.clientX || e.touches[0].clientX;
      // this.move.left =  this.$refs.myProgressInner.clientWidth;  // 宽度和内边距
			this.move.left = this.innerWidth;  // 点击时把当前的的innerWidth宽度保存下来
    },
  },
}
</script>

<style lang="less">
.myProgress { // 长方形的一个容器
  position: relative;
  padding: 5px;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  .myProgress-bar { // 进度条：高度2px 的长条
    height: 2px;
    width: 100%;
    background: @bar_color;
  }
  .myProgress-outer { // 缓冲条
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: @bar_out_color;
  }
  .myProgress-inner { // 播放进度条
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: @bar_line_color;
    .myProgress-dot { // 跟在播放进度条的最后面，中心点和进度条的末尾相交
      position: absolute;
      top: 50%;
      right: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: @bar_dot_color;
      transform: translateY(-50%);
    }
  }
}
</style>