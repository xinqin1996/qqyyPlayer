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
const BG_ARR = [
	"http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%98%9F%E7%A9%BA%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=1&spn=0&di=19690&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3815718549%2C646223543&os=2439071948%2C168077600&simid=0%2C0&adpicid=0&lpn=0&ln=567&fr=&fmq=1571750036594_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F59c20062ebfa4.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Botg9aaa_z%26e3Bv54AzdH3Fowssrwrj6_kt2_8nc8la_m_z%26e3Bip4s&gsm=&rpstart=0&rpnum=0&islist=&querylist=&force=undefined",
	"http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%98%9F%E7%A9%BA%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=8&spn=0&di=107140&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1861941979%2C4097807445&os=1404496029%2C1525545951&simid=4291609456%2C997328543&adpicid=0&lpn=0&ln=567&fr=&fmq=1571750036594_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fpics0.baidu.com%2Ffeed%2F9922720e0cf3d7ca540e47e40b57720d6a63a971.jpeg%3Ftoken%3D9667c2633a6ddae3ab1dd9aa61110f7a%26s%3D09417B6E9BA0A3765059050A0100E0C2&fromurl=ippr_z2C%24qAzdH3FAzdH3Fkwt3twiw5_z%26e3Bkwt17_z%26e3Bv54AzdH3Ff%3Ft1%3D8mnna09a00bncbmc80m%26ou6%3Dfrt1j6%26u56%3Drv&gsm=&rpstart=0&rpnum=0&islist=&querylist=&force=undefined",
	"http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%98%9F%E7%A9%BA%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=30&spn=0&di=75460&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3178377640%2C1548769879&os=2951490707%2C2753348710&simid=3341154889%2C136388035&adpicid=0&lpn=0&ln=567&fr=&fmq=1571750036594_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fpic2.16pic.com%2F00%2F49%2F73%2F16pic_4973929_b.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B8mrtv_z%26e3Bv54AzdH3Fri5p5AzdH3Frtv_9l0nldl_z%26e3Bip4s&gsm=&rpstart=0&rpnum=0&islist=&querylist=&force=undefined",
	"http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%98%9F%E7%A9%BA%E5%9B%BE%E7%89%87&step_word=&hs=2&pn=53&spn=0&di=86350&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3331059562%2C2945137849&os=2930922755%2C2417095576&simid=0%2C0&adpicid=0&lpn=0&ln=567&fr=&fmq=1571750036594_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181018%2F21%2F1539868172-CJQonrEXGB.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bktw5kwt37_z%26e3Bv54AzdH3Fs4AzdH3F980a8_d_z%26e3Bip4s&gsm=&rpstart=0&rpnum=0&islist=&querylist=&force=undefined"
]
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