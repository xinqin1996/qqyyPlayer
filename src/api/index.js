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

// 获取用户歌单，同时可以获取用户的简单信息
export function getUserPlaylist(uid){
  return new Promise(
    function(resolve,reject){
    var url="/user/playlist";   
    var obj={uid}   
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
