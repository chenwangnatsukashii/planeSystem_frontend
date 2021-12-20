export function toMin (time) {
  if (Object.is(time, undefined) || Object.is(time, null) || Object.is(time, '')) {
    return 0
  }

  time = time.replaceAll('：', ':')
  let timeSplit = time.split(':')
  return timeSplit.length === 2 ? parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1])
    : parseInt(timeSplit[0]) * 60 * 60 + parseInt(timeSplit[1]) * 60 + parseInt(timeSplit[2])
}

export function toMax (time, mode = 'hhmm') {
  if (mode === 'hhmm') {
    let hour = Math.floor(time / 60).toString()
    let minute = (time % 60).toString()
    return hour + ':' + (minute.length === 1 ? '0' + minute : minute)
  } else if (mode === 'hhmmss') {
    let hour = Math.floor(time / (60 * 60))
    let residualSecond = time - hour * 60 * 60
    let minute = Math.floor(residualSecond / 60)
    let second = Math.floor(residualSecond % 60)
    return hour + ':' + (minute.length === 1 ? '0' + minute : minute) + ':' + (second.length === 1 ? '0' + second : second)
  }
}
