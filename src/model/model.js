import * as Adhan from 'adhan'
import STATE from './STATE'

export const saveUserConfig = () => {
  localStorage.setItem('prayer-time-settings', JSON.stringify(STATE.Settings))
}

export const loadUserConfig = () => {
  const localSettings = localStorage.getItem(`prayer-time-settings`)

  const loadedSettings = JSON.parse(localSettings) || {}

  Object.assign(STATE.Settings, loadedSettings)
}

const makeUniquePrayerList = (main, extra) => {
  return [
    { id: 'fajr', name: 'Fajr', time: main.fajr },
    { id: 'sunrise', name: 'Sunrise', time: main.sunrise },
    { id: 'dhuhr', name: 'Dhuhr', time: main.dhuhr },
    { id: 'asr', name: 'Asr', time: main.asr },
    { id: 'maghrib', name: 'Maghrib', time: main.maghrib },
    { id: 'isha', name: 'Isha', time: main.isha },

    { id: 'fajr2', name: 'Fajr', time: extra.fajr },
    /* 
    { id: 'sunrise2', name: 'Sunrise', time: extra.sunrise },
    { id: 'dhuhr2', name: 'Dhuhr', time: extra.dhuhr },
    { id: 'asr2', name: 'Asr', time: extra.asr },
    { id: 'maghrib2', name: 'Maghrib', time: extra.maghrib },
    { id: 'isha2', name: 'Isha', time: extra.isha },
     */
  ]
}

const getPrayerTime = date => {
  const coordinates = new Adhan.Coordinates(
    STATE.Settings.location.latitude,
    STATE.Settings.location.longitude
  )

  const params = Adhan.CalculationMethod.Karachi()
  return new Adhan.PrayerTimes(coordinates, date, params)
}

export const getUserLocationByGPS = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          resolve(location)
        },
        () => reject()
      )
    } else reject()
  })
}

export const getUserLocationByIp = async () => {
  const { longitude, latitude } = await fetchJSON('https://json.geoiplookup.io')
  return { longitude, latitude }
}

export const getPrayerTimesList = () => {
  const today = getPrayerTime(new Date())
  const currentPrayer = today.currentPrayer()

  if (currentPrayer === 'none') {
    const yesterday = getPrayerTime(new Date(Date.now() - 86400000))
    return {
      raw: today,
      list: makeUniquePrayerList(yesterday, today),
    }
  } else {
    const tomorrow = getPrayerTime(new Date(Date.now() + 86400000))
    return {
      raw: today,
      list: makeUniquePrayerList(today, tomorrow),
    }
  }
}

export const getCurrentAndNextPrayer = () => {
  const current = STATE.prayerTimes.currentPrayer()
  const next = STATE.prayerTimes.nextPrayer()

  return { current, next }
}
