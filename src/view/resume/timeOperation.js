export const hms = 'HH:mm:ss'
export const hm = 'HH:mm'

// 把时间转换成秒
export function toMin (time) {
  if (Object.is(time, undefined) || Object.is(time, null) || Object.is(time, '')) {
    return 0
  }

  time = time.replaceAll('：', ':')
  let timeSplit = time.split(':')
  return timeSplit.length === 2 ? parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1])
    : parseInt(timeSplit[0]) * 60 * 60 + parseInt(timeSplit[1]) * 60 + parseInt(timeSplit[2])
}

// 把秒转化成时间格式
export function toMax (time, mode = hm) {
  if (mode === hm) {
    let hour = Math.floor(time / 60)
    let minute = time % 60
    return hour + ':' + (minute < 10 ? '0' + minute : minute)
  } else if (mode === hms) {
    let hour = Math.floor(time / (60 * 60))
    let residualSecond = time - hour * 60 * 60
    let minute = Math.floor(residualSecond / 60)
    let second = Math.floor(residualSecond % 60)
    return hour + ':' + (minute.length === 1 ? '0' + minute : minute) + ':' + (second.length === 1 ? '0' + second : second)
  }
}

// 比较两个时间  time1，time2均为日期类型
// 判断两个时间段是否相差31天
export function completeDate (time1, time2) {
  return time2.getDate() - time1.getDate() < 31
}
