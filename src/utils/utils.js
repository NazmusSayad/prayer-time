export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const convertMstoHHMMSS = (durationMs) => {
  if (durationMs < 0) durationMs = 0
  const durationSec = Math.floor(durationMs / 1000)

  let seconds = durationSec % 60
  let minutes = Math.floor((durationSec / 60) % 60)
  let hours = Math.floor((durationSec / (60 * 60)) % 24)

  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + ':' + minutes + ':' + seconds
}

export const convertFrom24To12Format = (time24) => {
  if (typeof time24 !== 'string') time24 = time24.toString()

  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1)
  const period = +sHours < 12 ? 'AM' : 'PM'
  const hours = +sHours % 12 || 12

  return `${hours}:${minutes} ${period}`
}

export const requestNotificationPermission = () => {
  try {
    if (
      Notification.permission !== 'denied' ||
      Notification.permission !== 'granted'
    ) {
      Notification.requestPermission()
    }
  } catch {
    console.warn('Notification feature not supported!')
  }
}
