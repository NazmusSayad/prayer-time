import * as Adhan from 'adhan'
import STATE from './STATE'

export const saveUserConfig = () => {
  localStorage.setItem('prayer-time-settings', JSON.stringify(STATE.Settings))
  localStorage.setItem('prayer-time-location', JSON.stringify(STATE.UserLocation))
}

export const loadUserConfig = () => {
  const localSettings = localStorage.getItem(`prayer-time-settings`)
  const localLocation = localStorage.getItem(`prayer-time-location`)

  const loadedSettings = JSON.parse(localSettings) || {}
  const loadedLocation = JSON.parse(localLocation) || {}

  Object.assign(STATE.Settings, loadedSettings)
  Object.assign(STATE.UserLocation, loadedLocation)
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

    /* XXX: You can modify them */
    { id: 'sunrise2', name: 'Sunrise', time: extra.sunrise },
    { id: 'dhuhr2', name: 'Dhuhr', time: extra.dhuhr },
    { id: 'asr2', name: 'Asr', time: extra.asr },
    { id: 'maghrib2', name: 'Maghrib', time: extra.maghrib },
    { id: 'isha2', name: 'Isha', time: extra.isha },
  ]
}

const getPrayerTime = date => {
  const coordinates = new Adhan.Coordinates(
    STATE.UserLocation.latitude,
    STATE.UserLocation.longitude
  )

  const params = Adhan.CalculationMethod[STATE.Settings.calculationMethod]()
  params.madhab = STATE.Settings.madhab

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
