import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import headerView from '../views/header/header-view.js'
import prayerView from '../views/prayer/prayer-view.js'
import clockView from '../views/clock/clock-view.js'
import settingsView from '../views/settings/settings-view.js'
import settingsControl from '../views/settings/settings-control.js'
import modalView from '../views/modal/modal-view.js'

headerView.render()
prayerView.render()
clockView.render()
settingsView.render()
modalView.render()

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

  modalView.alert({ flag: 'green', title: 'Settings Saved!' })
}

export const updateUsersConfig = () => {
  STATE.Settings.currentPrayerAnimation
    ? settingsControl.currentPrayerAnimation.enable()
    : settingsControl.currentPrayerAnimation.disable()

  STATE.Settings.otherAnimations
    ? settingsControl.otherAnimations.enable()
    : settingsControl.otherAnimations.disable()
}

export const settingsClose = async newSettings => {
  const oldSettings = {
    /* NOTE: Order does matter */
    madhab: STATE.Settings.madhab,
    calculationMethod: STATE.Settings.calculationMethod,
    currentPrayerAnimation: STATE.Settings.currentPrayerAnimation,
    otherAnimations: STATE.Settings.otherAnimations,
  }

  const ifNoChanges =
    JSON.stringify(newSettings) === JSON.stringify(oldSettings)
  if (ifNoChanges) return settingsView.close()

  const input = await modalView.confirm({
    flag: 'red',
    title: 'Are you sure?',
    message: 'You have some unsaved changes.',
  })

  if (input) {
    await Wait(150) // Waiting for the modal-view animation to finish!

    settingsView.close()
    settingsView.setPreviousSettings(oldSettings)
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
  settingsView.show()
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
