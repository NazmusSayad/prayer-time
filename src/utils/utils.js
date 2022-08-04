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

export const convertFrom24To12Format = time24 => {
  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1)
  const period = +sHours < 12 ? 'AM' : 'PM'
  const hours = +sHours % 12 || 12

  return `${hours}:${minutes} ${period}`
}
