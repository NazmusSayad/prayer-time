import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import * as Control from './controller.js'
import headerView from '../views/header/header-view.js'
import settingsView from '../views/settings/settings-view.js'

// Init handlers
;(() => {
  headerView.addFullScreenHandler(Control.fullScreen)
  headerView.addSettingsHandler(Control.showSettings)

  settingsView.addFormSubmitHandler(Control.formSubmitHandler)
  settingsView.addCloseHandler(Control.settingsClose)
})()

// Init time
;(() => {
  const currentDate = new Date()
  Control.secUpdater(currentDate.getSeconds())
  Control.minUpdater(currentDate.getMinutes())
  Control.hourUpdater(currentDate.getHours())
  Control.dayUpdater(currentDate)
})()

// Start Interval for accurate time
;(() => {
  const interval = setInterval(() => {
    const ms = new Date().getMilliseconds()
    if (!Math.floor(ms / 100)) {
      clearInterval(interval)
      Control.startClock()
      setInterval(Control.startClock, 1000)
    }
  }, 10)
})()

// Init Prayers
;(async () => {
  Model.loadUserConfig()
  Control.updateUsersConfig()

  try {
    if (!STATE.UserLocation.latitude || !STATE.UserLocation.longitude) {
      STATE.UserLocation = await Model.getUserLocationByIp()
      Model.saveUserConfig()
    }
  } catch (err) {
    alert(err.message)
  }

  settingsView.setPreviousSettings(STATE.Settings)
  Control.initPrayer()
  Control.updateCurrentAndNextPrayer()
  Control.updateNextPrayerTime()
})()
