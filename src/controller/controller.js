import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import headerView from '../views/header/header-view.js'
import prayerView from '../views/prayer/prayer-view.js'
import clockView from '../views/clock/clock-view.js'
import settingsView from '../views/settings/settings-view.js'
import settingsControl from '../views/settings/settings-control.js'

headerView.render()
prayerView.render()
clockView.render()
settingsView.render()

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

// ----------------------------------

export const formSubmitHandler = data => {
  Object.assign(STATE.Settings, data)
  Model.saveUserConfig()
  updateUsersConfig()

  initPrayer()
  updateCurrentAndNextPrayer()
}

export const updateUsersConfig = () => {
  if (STATE.Settings.currentPrayerAnimation) {
    settingsControl.currentPrayerAnimation.enable()
  } else {
    settingsControl.currentPrayerAnimation.disable()
  }

  if (STATE.Settings.settingsOpenAnimation) {
    settingsControl.settingsOpenAnimation.enable()
  } else {
    settingsControl.settingsOpenAnimation.disable()
  }

  if (STATE.Settings.settingsCloseAnimation) {
    settingsControl.settingsCloseAnimation.enable()
  } else {
    settingsControl.settingsCloseAnimation.disable()
  }
}

// ----------------------------------

export const fullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
    headerView.showExpandFullScreenControlButton()
  } else {
    document.qs('html').requestFullscreen()
    headerView.showCompressFullScreenControlButton()
  }
}

export const showSettings = () => {
  settingsView.show(STATE.Settings)
}

// ----------------------------------

export const initPrayer = () => {
  const prayerTimeManager = Model.getPrayerTimesList()

  STATE.prayerTimes = prayerTimeManager.raw

  prayerTimeManager.list.forEach(({ id, time }) => {
    STATE.prayerTimesList[id] = time
  })

  prayerView.fillContainer(prayerTimeManager.list)
  STATE.prayerLoaded = false
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
