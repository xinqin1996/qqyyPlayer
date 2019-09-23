/** ---------对歌单修改，删除的操作放在action异步执行--------- */

import * as types from "./mutations-types";

const actions = {
  // 设置正在播放list
  setPlaylist({ commit },val){
    commit(types.setPlaylist,val);
  },

  // 删除正在播放 的歌曲             { 删除后的list， 删除的下标 }
  removePlayListItem({ commit, state: { currentIndex } }, { list, index }){
    // let currentIndex = state.currentIndex;  使用参数二级结构代替

    // 对删除的下标进行判断
    if (index < currentIndex || currentIndex === list.length) {
      commit(types.setCurrentIndex,currentIndex-1);
    }

    commit(types.setPlaylist,list);
    // 当删完的时候 删完时停止播放
    if (list.length === 0) {
      commit(types.setPlaying, false)
    }
  },


}

export default actions;