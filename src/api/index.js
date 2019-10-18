// ------------axios api-------------

// http://localhost:3000/user/detail?uid=425558017
// UID: 425558017
import axios from "axios";
import { URL } from "@/config";
// import qs from "qs"   
// qs库作用-->格式化数据
// npm i qs 
// https://blog.csdn.net/weixin_42941619/article/details/85937855
// qs.stringify(val) qs.parse(val)

axios.defaults.baseURL = URL;

// 1：用户歌单--同时可以获取用户的简单信息
export function getUserPlaylist(uid){ //~~~playList(uid,obj)
  return new Promise(
    function(resolve,reject){
    var url="/user/playlist";   // ~~~这里可以动态传入一个url
    var obj={uid}               // ~~~这里应该直接传入一个对象
      axios.get(url,{params:obj}).then(res=>{
        if(res.data.code === 200){
          if(res.data.playlist.length == 0){
            reject(`未查询到UID为${uid}的用户信息`)
          }else{
            resolve(res.data)            
          }
        }
      })
    }
  )
}

// 2：获取特定排行榜--展示在正在播放页面
export function getToplist(idx){
  return new Promise(
    function(resolve,reject){
      var url="/top/list";
      var obj={idx};
      axios.get(url,{params:obj}).then(res=>{
        if(res.data.code === 200){
          resolve(res.data)
        }else{
          reject("没有获取到top榜单列表")
        }
      })
    }
  )
}