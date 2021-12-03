export function addTime(time1, time2, mode = 'hhmmss') {
  if (Object.is(time1, undefined) || Object.is(time1, null) || Object.is(time1, "")) {
    return time2
  } else if (Object.is(time2, undefined) || Object.is(time2, null) || Object.is(time2, "")) {
    return time1
  } else {
    let k = 0
    let t = 0
    time1 = time1.replaceAll(':', "")
    time2 = time2.replaceAll(':', "")
    for (let i = time1.length - 1; i >= 0; i--) {
      if (i % 2 === 0) {
        t = parseInt(time1[i]) + parseInt(time2[i]) + k
        if (t > 5) {
          k = 1
          t -= 6
        } else {
          k = 0
        }
      } else {
        t = parseInt(time1[i]) + parseInt(time2[i]) + k
        if (t > 9) {
          k = 1
          t -= 10
        } else {
          k = 0
        }
      }
      time1 = time1.substring(0, i) + t.toString() + time1.substring(i + 1)
    }
  }
  if (mode === 'hhmmss') {
    return time1.substring(0, 2) + ':' + time1.substring(2, 4) + ':' + time1.substring(4, 6)
  } else if (mode === 'hhmm') {
    return time1.substring(0, 2) + ':' + time1.substring(2, 4)
  }
}
