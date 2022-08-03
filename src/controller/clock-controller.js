import STATE from '../model/STATE.js'
import clockView from '../views/clock/clock-view.js'
import * as prayerController from './prayer-controller.js'

export const secUpdater = sec => {
  clockView.updateSecond(sec)
}
export const minUpdater = min => {
  clockView.updateMinute(min)
}
export const hourUpdater = hour => {
  clockView.updateHour(hour)
}
export const dayUpdater = day => {
  clockView.updateDay(day)
}
export const startClock = () => {
  const date = new Date()

  const sec = date.getSeconds()
  secUpdater(sec)
  STATE.prayerLoaded && prayerController.updateNextPrayerTime()

  if (!sec) {
    const fajrNext = STATE.prayerTimesList['fajr2']
    if (fajrNext <= date) {
      prayerController.initPrayer()
    }

    const min = date.getMinutes()
    minUpdater(min)
    STATE.prayerLoaded && prayerController.updateCurrentAndNextPrayer()
    STATE.prayerLoaded && prayerController.updateNextPrayerTime()

    if (!min) {
      const hour = date.getHours()
      hourUpdater(hour)

      if (!hour) {
        dayUpdater(date)
        prayerController.initPrayer()
      }
    }
  }
}
