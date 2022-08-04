import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import * as headerController from './header-controller.js'
import * as prayerController from './prayer-controller.js'
import * as clockController from './clock-controller.js'
import * as settingsController from './settings-controller.js'
import headerView from '../views/header/header-view.js'
import prayerView from '../views/prayer/prayer-view.js'
import clockView from '../views/clock/clock-view.js'
import settingsView from '../views/settings/settings-view.js'
import modalView from '../views/modal/modal-view.js'

headerView.render()
prayerView.render()
clockView.render()
settingsView.render()
modalView.render()

// Init handlers
;(() => {
  headerView.addFullScreenHandler(headerController.fullScreen)
  headerView.addSettingsHandler(headerController.showSettings)

  prayerView.addRetryButtonhandler(prayerController.initPrayer)

  settingsView.addFormSubmitHandler(settingsController.formSubmitHandler)
  settingsView.addCloseHandler(settingsController.settingsClose)
})()

// Init time
;(() => {
  const currentDate = new Date()
  clockController.secUpdater(currentDate.getSeconds())
  clockController.minUpdater(currentDate.getMinutes())
  clockController.hourUpdater(currentDate.getHours())
  clockController.dayUpdater(currentDate)
})()

// Start Interval for accurate time
;(() => {
  const interval = setInterval(() => {
    const ms = new Date().getMilliseconds()
    if (!Math.floor(ms / 100)) {
      clearInterval(interval)
      clockController.startClock()
      setInterval(clockController.startClock, 1000)
    }
  }, 10)
})()

// Init Prayers
;(async () => {
  Model.loadUserConfig()
  settingsController.updateRootConfigAttributes()
  settingsView.setPreviousSettings(STATE.Settings)
  prayerController.initPrayer(() => {
    prayerView.showRetryButton()
  })
})()

let se = 1
console.log((se &&= 23))
