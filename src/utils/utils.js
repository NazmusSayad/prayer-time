export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj))
}

export const convertMstoHHMMSS = durationMs => {
  let seconds = Math.floor((durationMs / 1000) % 60),
    minutes = Math.floor((durationMs / (1000 * 60)) % 60),
    hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24)

  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + ':' + minutes + ':' + seconds
}
