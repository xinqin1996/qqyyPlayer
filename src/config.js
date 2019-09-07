/**-----------------基本配置文件-------------------*/

//1 导出：网络请求地址
export const URL = "http://localhost:3000"

//2 导出：版本号 
export const VERSION = "1.6.0"

//3
/**
 * 默认歌单ID （正在播放列表）
 * @type {number}
 * 0: 云音乐新歌榜,
 * 1: 云音乐热歌榜,
 * 2: 网易原创歌曲榜,
 * 3: 云音乐飙升榜,
 * 4: 云音乐电音榜,
 * 5: UK排行榜周榜,
 * 6: 美国Billboard周榜
 * 7: KTV嗨榜,
 * 8: iTunes榜,
 * 9: Hit FM Top榜,
 * 10: 日本Oricon周榜
 * 11: 韩国Melon排行榜周榜,
 * 12: 韩国Mnet排行榜周榜,
 * 13: 韩国Melon原声周榜,
 * 14: 中国TOP排行榜(港台榜),
 * 15: 中国TOP排行榜(内地榜)
 * 16: 香港电台中文歌曲龙虎榜,
 * 17: 华语金曲榜,
 * 18: 中国嘻哈榜,
 * 19: 法国 NRJ EuroHot 30周榜,
 * 20: 台湾Hito排行榜,
 * 21: Beatport全球电子舞曲榜,
 * 22: 云音乐ACG音乐榜,
 * 23: 云音乐嘻哈榜
 */

//3 导出：默认歌单ID
export const defaultSheetId = 1

//4 导出：默认分页数量
export const defaultLimit = 30

//5 导出：默认背景图片（网络图片或者本地静态图片）
//  从BG_ARR数组中随机取一张图片用于背景图片
const BG_ARR = []
export const defaultBG = BG_ARR[Math.floor(Math.random() * BG_ARR.length)]

//6 导出：默认音量
export const defaultVolume = 0.2

//7
/**
 * 播放模式
 * listLoop: 列表循环
 * order：顺序
 * loop: 单曲循环
 * random: 随机
 */
//7 导出：默认的播放模式
export const playMode = {
  listLoop:0,
  order:1,
  random:2,
  loop:3
}