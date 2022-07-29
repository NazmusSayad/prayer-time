import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import headerView from '../views/header/header-view.js'
import prayerView from '../views/prayer/prayer-view.js'
import clockView from '../views/clock/clock-view.js'

headerView.render()
prayerView.render()
clockView.render()

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

export const initPrayer = () => {
  const prayerTimeManager = Model.getPrayerTimesList()
  STATE.prayerTimes = prayerTimeManager.raw

  prayerTimeManager.list.forEach(({ id, time }) => {
    STATE.prayerTimesList[id] = time
  })

  prayerView.fillContainer(prayerTimeManager.list)
  STATE.prayerLoaded = true
}

export const updateNextPrayerTime = () => {
  const nextPrayer = STATE.prayerTimesList[STATE.prayer.next]
  const diffMs = nextPrayer - Date.now()

  prayerView.updateNextPrayerTime(diffMs)
}

export const updateCurrentAndNextPrayer = () => {
  let { current, next } = Model.getCurrentAndNextPrayer()

  if (current === 'none' || next === 'none') {
    current = 'isha'
    next = 'fajr2'
  }

  STATE.prayer = { current, next }
  prayerView.updateCurrentPrayer(current)
  prayerView.updateNextPrayer(next)
}
