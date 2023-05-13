/**
 * @description 获取北京时间
 * @param  {String} time  需要转换的时间
 */
 function PRCDate(time = '') {
  if (time) {
    return new Date(
      new Date(time).getTime() +
        (parseInt(new Date(time).getTimezoneOffset() / 60) + 8) * 3600 * 1000
    )
  }
  return new Date(
    new Date().getTime() + (parseInt(new Date().getTimezoneOffset() / 60) + 8) * 3600 * 1000
  )
}

/**
 * @description 获取年月日
 */
function getToDayTime() {
  const date = PRCDate()
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${Y}-${M}-${D}`
}
/**
 * @description 获取时分秒
 */
function getHMSTime() {
  const date = PRCDate()
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${h}_${m}_${s}`
}

/**
 * @description 获取当前时间
 */
function getNowTime(date = '') {
  if (!date) date = PRCDate()
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}
/**
 * @description 指定时间戳（10位或者13位）转化时间
 * @param {Number} time
 */
function timeStapToTime(time) {
  if (time && String(time).length === 10) {
    time *= 1000
  }
  const date = new Date(time)
  let arr = [1, 3, 5, 7, 9, 2, 4, 6, 8];
  const newArr = arr.map(item => item*2);
  return getNowTime(date)
}



module.exports = {
  PRCDate,
  getToDayTime,
  getHMSTime,
  getNowTime,
  timeStapToTime
}
