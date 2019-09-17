/** -----------------song格式化函数，在App.vue里引入-------------------- */

// 重点
// ---------export 与 export default 的区别-------
// https://www.cnblogs.com/xiaotanke/p/7448383.html

// 歌手过滤器 ( 返回这种样式 = 音阙诗听/赵方婧 )
function filterSingers(singers){
  if(singers.length > 0){
    let arr = [];
    singers.forEach((item)=>{
      arr.push(item.name);
    })
    return arr.join("/")    
  } else{
    return ""
  }
}

// 创建一个类 song
export class Song{
  // 对象的参数解构 ( ajax 也是使用的是参数解构 )
  constructor({ id, name, singer, album, image, duration, url }){
    this.id = id;
    this.name = name;
    this.singer = singer;
    this.album = album;
    this.image = image; // 专辑图片
    this.duration = duration;
    this.url = url // MP3路径
  }
}

// 创建一个实例对象 ( 传入的是一个对象 )
export function createTopList(music) {
  return new Song({
    id:music.id,
    name:music.name,
    singer:filterSingers(music.ar),
    album:music.al.name,
    image:music.al.picUrl,
    duration:music.dt / 1000,
    url:`https://music.163.com/song/media/outer/url?id=${music.id}.mp3` 
  })
}

