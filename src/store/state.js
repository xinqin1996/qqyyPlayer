import { playMode } from "@/config"

const state = {
  playlist:[], // 正在播放的播放列表 音乐top榜
  playing:false, // 播放状态
  currentIndex:-1, // 当前音乐索引
  audioEle:null, // audio元素
  mode:playMode.listLoop,
}

export default state;