export function minusTime (time1, time2, coef = 1) {
  if (Object.is(time1, undefined) || Object.is(time1, null) || Object.is(time1, '')) {
    time1 = '00:00'
  }
  if (Object.is(time2, undefined) || Object.is(time2, null) || Object.is(time2, '')) {
    return time1
  } else {
    time1 = time1.replaceAll('：', ':')
    time2 = time2.replaceAll('：', ':')
    let timeOneSplit = time1.split(':')
    let timeTwoSplit = time2.split(':')
    let totalMinute = Math.round(((parseInt(timeOneSplit[0]) - parseInt(timeTwoSplit[0])) * 60 +
      parseInt(timeOneSplit[1]) - parseInt(timeTwoSplit[1])) / coef)

    let hour = Math.floor(totalMinute / 60).toString()
    let minute = (totalMinute % 60).toString()
    return hour + ':' + (minute.length === 1 ? '0' + minute : minute)
  }
}
