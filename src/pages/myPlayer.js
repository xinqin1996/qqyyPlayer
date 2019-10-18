import { playMode } from '@/config'

// 初始化
// onprogress currentProgress 缓存进度
// onplay musicReady 是否使用播放器
// ontimeupdate currentTime 当前时间
// onerror next() 播放下一首歌

// 一个对象里有一个方法，运行后给audio元素绑定上多个事件
const myPlayerMusic = {
  // 开始函数  在外部被调用  mmPlayerMusic.initAudio(this)
  //     that => vm实例
  initAudio(that) {
    // console.log(that) // vm打印实例
    const ele = that.audioEle // 获取vm实例里的audio元素

    // 1:监听音频正在缓冲事件(持续)，只记录第一段缓冲时间，把缓存进度保存在music.vue的currentProgress里
    // 获得currentProgress 缓存的进度
    ele.onprogress = () => {
      try {
        // console.log(正在尝试缓存)
        // console.log(ele.buffered) // TimeRanges对象
        if (ele.buffered.length > 0) {
          const duration = that.currentMusic.duration // 获取歌曲时长
          // console.log(that.currentMusic)
          let buffered = 0
          // console.log(ele.buffered.start(0)) // 打印第一段时间段
          // console.log(ele.buffered.end(0))
          // console.log(ele.buffered.start(1)) // 打印第二段时间段
          // console.log(ele.buffered.end(1))
          ele.buffered.end(0)
          buffered = // buffered.end(0) 可能大于实际 duration
            ele.buffered.end(0) > duration ? duration : ele.buffered.end(0)
          that.currentProgress = buffered / duration // 缓存进度
        }
      } catch (e) {
        throw new Error('js语句有误，抛出错误，继续直接代码') // 后面代码不在执行
        console.log(e) // 这句话只是把错误打印出来        
      }
    }
    
    // 2:绑定 开始播放音乐事件（开始播放时发生）设置100ms的延迟，设置music.vue的musicReady=true
    // 开始播放音乐后100ms设置musicReady = true;
    ele.onplay = () => {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        // console.log(that.musicReady)
        that.musicReady = true // 可以使用播放器
      }, 100)
    }

    // 获取当前播放时间
    // 绑定timeupdate 事件，在播放时不停运行，获取到currentTime并且保存起来
    ele.ontimeupdate = () => {
      that.currentTime = ele.currentTime
      console.log(that.currentTime)
    }

    // 当前音乐播放完毕
    // 音乐播放完毕如果是单曲循环，那么运行loop()
    ele.onended = () => {
      // if (that.mode === playMode.loop) {
      //   that.loop()
      // } else {
      //   that.next()
      // }
    }

    // 音乐播放出错 onerror出错事件
    // 运行next() 函数，这个函数也被icon-next调用
    ele.onerror = () => {
      that.$myToast('当前音乐不可播放，已自动播放下一曲')
      that.next()
      // console.log('播放出错啦！')
    }

    // 音乐进度拖动大于加载时重载音乐 (该事件没触发)
    // 事件在浏览器尝试获取媒体数据，但数据不可用时触发
    // ele.onstalled = () => {
    //   console.log('重新加载')
    //   ele.load() // 加载音频、视频软件
    //   that.setPlaying(false)
    //   let timer
    //   clearTimeout(timer)
    //   timer = setTimeout(() => {
    //     that.setPlaying(true)
    //   }, 10)
    // }

    // 将能播放的音乐加入播放历史 // 占时没有什么用处
    // ele.oncanplay = () => { }
  }
}

export default myPlayerMusic;

// 使用箭头函数使this 不指向mmPlayerMusic，但是这里没有用到this,实际上是为了简化代码
