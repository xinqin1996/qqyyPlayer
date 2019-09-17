/** -------------filter 局部vue函数------------- */

// 时间补0函数
function addZero(value){
  return value < 10 ? '0'+value : value 
}

// 时间格式化函数
export function formatDuration(value){
  let m = Math.floor(value / 60); 
  let s = Math.floor(value % 60);
  return addZero(m)+":"+addZero(s) // 把 字符串，数字 强制拼接为一个字符串
}