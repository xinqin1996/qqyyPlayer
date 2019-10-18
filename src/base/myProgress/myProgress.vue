<!--歌曲播放进度条 组件-->
<!---->
<!-- 从上面页面传入了 1：歌曲进度 2：缓存进度 -->


<template>
  <!--进度条拖动-->
  <div ref="mmProgress" class="mmProgress">
  <!-- <div ref="mmProgress" class="mmProgress" @click="barClick"> -->
    <div class="mmProgress-bar"></div>
    <div ref="mmPercentProgress" class="mmProgress-outer"></div>
    <div ref="mmProgressInner" class="mmProgress-inner">
      <div
        class="mmProgress-dot"
      ></div>
      <!-- <div
        class="mmProgress-dot"
        @mousedown="barDown"
        @touchstart.prevent="barDown"
      ></div> -->
    </div>
  </div>
</template>

<script>
const dotWidth = 10 // 定义了播放点的尺寸
export default {
  name: 'MmProgress',
  props: {
    // 进度值一 （百分比） (歌曲播放百分比)
    percent: {
      type: [Number],
      default: 0
    },
    // 进度值二（歌曲缓冲进度用）（缓冲百分比）
    percentProgress: {
      type: [Number],
      default: 0
    }
  },
  data() {
    return {
      move: {
        status: false, // 是否可拖动
        startX: 0, // 记录最开始点击的X坐标
        left: 0 // 记录当前已经移动的距离
      }
    }
  },
  watch: {
    percent(newPercent) { // 监听music页面传过来的播放进度，移动滑块
      if (newPercent >= 0 && !this.move.status) {
        const barWidth = this.$refs.mmProgress.clientWidth - dotWidth
        const offsetWidth = newPercent * barWidth
        // this.moveSilde(offsetWidth)
      }
    },
    // percentProgress(newValue) {
    //   let offsetWidth = this.$refs.mmProgress.clientWidth * newValue
    //   this.$refs.mmPercentProgress.style.width = `${offsetWidth}px`
    // }
  },

 
}
</script>

<style lang="less">
.mmProgress { // 长方形的一个容器
  position: relative;
  padding: 5px;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  .mmProgress-bar { // 进度条：高度2px 的长条
    height: 2px;
    width: 100%;
    background: @bar_color;
  }
  .mmProgress-outer { // 缓冲条
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: @bar_out_color;
  }
  .mmProgress-inner { // 播放进度条
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: @bar_line_color;
    .mmProgress-dot { // 跟在播放进度条的最后面，中心点和进度条的末尾相交
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