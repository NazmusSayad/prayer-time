export const convertMstoHHMMSS = (durationMs) => {
  const durationSec = Math.floor(durationMs / 1000)

  let seconds = durationSec % 60
  let minutes = Math.floor((durationSec / 60) % 60)
  let hours = Math.floor((durationSec / (60 * 60)) % 24)

  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + ':' + minutes + ':' + seconds
}
