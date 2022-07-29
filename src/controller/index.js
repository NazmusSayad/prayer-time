import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import {
  secUpdater,
  minUpdater,
  hourUpdater,
  dayUpdater,
  initPrayer,
  updateNextPrayerTime,
  updateCurrentAndNextPrayer,
  fullScreen,
  showFullScreen,
} from './controller.js'
import headerView from '../views/header/header-view.js'

const startClock = () => {
  const date = new Date()

  const sec = date.getSeconds()
  secUpdater(sec)
  STATE.prayerLoaded && updateNextPrayerTime()

  if (!sec) {
    const fajrNext = STATE.prayerTimesList['fajr2']
    if (fajrNext <= date) {
      initPrayer()
    }

    const min = date.getMinutes()
    minUpdater(min)
    STATE.prayerLoaded && updateCurrentAndNextPrayer()
    STATE.prayerLoaded && updateNextPrayerTime()

    if (!min) {
      const hour = date.getHours()
      hourUpdater(hour)

      if (!hour) {
        dayUpdater(date)
        initPrayer()
      }
    }
  }
}

// Init handlers
;(() => {
  headerView.addFullScreenHandler(fullScreen)
  headerView.addSettingsHandler(showFullScreen)
})()

// Init time
;(() => {
  const currentDate = new Date()
  secUpdater(currentDate.getSeconds())
  minUpdater(currentDate.getMinutes())
  hourUpdater(currentDate.getHours())
  dayUpdater(currentDate)
})()

// Start Interval
const interval = setInterval(() => {
  const ms = new Date().getMilliseconds()
  if (!Math.floor(ms / 100)) {
    clearInterval(interval)
    startClock()
    setInterval(startClock, 1000)
  }
}, 10)

// Init Prayers
;(async () => {
  try {
    Model.loadUserConfig()

    if (!STATE.UserLocation.latitude || !STATE.UserLocation.longitude) {
      await Model.getAndSaveUserLocationByIp()
    }

    initPrayer()
    updateCurrentAndNextPrayer()
    updateNextPrayerTime()
  } catch (err) {
    alert(err.message)
  }
})()
