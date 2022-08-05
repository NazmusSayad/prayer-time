import * as Adhan from 'adhan'
import STATE from './STATE'

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
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        () => reject(new Error('Unable to get permission!'))
      )
    } else reject(new Error('Unable to get permission!'))
  })
}

export const getUserLocationByIp = async () => {
  try {
    const { longitude, latitude } = await fetchJSON(
      'https://get.geojs.io/v1/ip/geo.json'
    )

    return { longitude, latitude }
  } catch (err) {
    err.message = 'I need an internet connection for this job.'
    throw err
  }
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
