const getters = {
  // 正在播放的播放列表
  playlist:(state)=>{ return state.playlist; },
  // 播放状态
  playing:(state)=>{ return state.playing; },
  // 当前音乐索引
  currentIndex:(state)=>{ return state.currentIndex },
  // 当前音乐(通过下标获得音乐对象) 
  currentMusic:(state)=>{ // 如果不存在返回一个空的对象-1
    return state.playlist[state.currentIndex] || {}
  },
  // 获取audioEle
  audioEle:(state)=>{  return state.audioEle  },
  // 获取mode播放模式
  mode:(state)=>{ return state.mode },
}

export default getters;