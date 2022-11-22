export function addTime (time1, time2, mode = 'hhmmss') {
  if (Object.is(time1, undefined) || Object.is(time1, null) || Object.is(time1, '')) {
    return time2
  } else if (Object.is(time2, undefined) || Object.is(time2, null) || Object.is(time2, '')) {
    return time1
  } else {
    time1 = time1.replaceAll('：', ':')
    time2 = time2.replaceAll('：', ':')
    let timeOneSplit = time1.split(':')
    let timeTwoSplit = time2.split(':')

    if (mode === 'hhmm') {
      let totalMinute = (parseInt(timeOneSplit[0]) + parseInt(timeTwoSplit[0])) * 60 +
        parseInt(timeOneSplit[1]) + parseInt(timeTwoSplit[1])

      let hour = Math.floor(totalMinute / 60).toString()
      let minute = (totalMinute % 60).toString()
      return hour + ':' + (minute.length === 1 ? '0' + minute : minute)
    } else if (mode === 'hhmmss') {
      let totalSecond = (parseInt(timeOneSplit[0]) + parseInt(timeTwoSplit[0])) * 60 * 60 +
        (parseInt(timeOneSplit[1]) + parseInt(timeTwoSplit[1])) * 60 +
        parseInt(timeOneSplit[2]) + parseInt(timeTwoSplit[2])

      let hour = Math.floor(totalSecond / (60 * 60))
      let residualSecond = totalSecond - hour * 60 * 60
      let minute = Math.floor(residualSecond / 60)
      let second = Math.floor(residualSecond % 60)
      return hour + ':' + (minute.length === 1 ? '0' + minute : minute) + ':' + (second.length === 1 ? '0' + second : second)
    }
  }
}
