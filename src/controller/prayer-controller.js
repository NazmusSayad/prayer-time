import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import prayerView from '../views/prayer/prayer-view.js'
import settingsView from '../views/settings/settings-view.js'
import modalView from '../views/modal/modal-view.js'

export const initPrayer = async () => {
  try {
    if (!STATE.UserLocation.latitude || !STATE.UserLocation.longitude) {
      STATE.UserLocation = await Model.getUserLocationByIp()
      Model.saveUserConfig()
      settingsView.setPreviousSettings(STATE.Settings)
    }
  } catch (err) {
    return modalView.redAlert({
      title: 'No internet connection!',
      message: 'At least give me internet connection for the first time.',
    })
  }

  updatePrayer()
}

export const updatePrayer = () => {
  const prayerTimeManager = Model.getPrayerTimesList()
  STATE.prayerTimes = prayerTimeManager.raw
  prayerTimeManager.list.forEach(({ id, time }) => {
    STATE.prayerTimesList[id] = time
  })

  prayerView.fillContainer(prayerTimeManager.list)
  STATE.prayerLoaded = false

  updateCurrentAndNextPrayer()
  updateNextPrayerTime()
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
  STATE.prayerLoaded = true
}
