import * as types from "./mutations-types";

const mutations = {
  // 设置正在播放list
    // 用 [ ] 包裹字符串，其实变为一个对象的变量
  [types.setPlaylist](state,val){
    state.playlist = val;
  },

  // 设置播放状态
  [types.setPlaying](state,val){
    state.playing = val;
  }, 
  
  // 设置播放下标
  [types.setCurrentIndex](state,val){
    state.currentIndex = val;
  } 
}

export default mutations;