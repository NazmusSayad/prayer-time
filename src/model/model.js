import * as Adhan from 'adhan'
import STATE from './STATE'

const saveUserLocation = ({ latitude, longitude }) => {
  STATE.UserLocation = { latitude, longitude }
  localStorage.setItem(`location`, JSON.stringify(STATE.UserLocation))
}

const getPrayerTime = date => {
  const coordinates = new Adhan.Coordinates(
    STATE.UserLocation.latitude,
    STATE.UserLocation.longitude
  )

  const params = Adhan.CalculationMethod.Karachi()
  return new Adhan.PrayerTimes(coordinates, date, params)
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

export const loadUserConfig = () => {
  const localLocation = localStorage.getItem(`location`)
  const localSettings = localStorage.getItem(`settings`)

  STATE.UserLocation = JSON.parse(localLocation)
  STATE.Settings = JSON.parse(localSettings)
}

export const getAndSaveLocationByGeolocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          saveUserLoation(location)
          resolve(location)
        },
        () => reject()
      )
    } else reject()
  })
}

export const getAndSaveUserLocationByIp = async () => {
  const { longitude, latitude } = await fetchJSON('https://json.geoiplookup.io')
  saveUserLocation({ latitude, longitude })
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
