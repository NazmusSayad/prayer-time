import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import * as Control from './controller.js'
import headerView from '../views/header/header-view.js'
import settingsView from '../views/settings/settings-view.js'

// Init handlers
{
  headerView.addFullScreenHandler(Control.fullScreen)
  headerView.addSettingsHandler(Control.showSettings)

  settingsView.addFormSubmitHandler(Control.formSubmitHandler)
}

// Init time
{
  const currentDate = new Date()
  Control.secUpdater(currentDate.getSeconds())
  Control.minUpdater(currentDate.getMinutes())
  Control.hourUpdater(currentDate.getHours())
  Control.dayUpdater(currentDate)
}

// Start Interval for accurate time
{
  const interval = setInterval(() => {
    const ms = new Date().getMilliseconds()
    if (!Math.floor(ms / 100)) {
      clearInterval(interval)
      Control.startClock()
      setInterval(Control.startClock, 1000)
    }
  }, 10)
}

// Init Prayers
{
  ;(async () => {
    try {
      Model.loadUserConfig()
      Control.updateUsersConfig()

      if (!STATE.Settings.location.latitude || !STATE.Settings.location.longitude) {
        STATE.Settings.location = await Model.getUserLocationByIp()
        Model.saveUserConfig()
      }

      Control.initPrayer()
      Control.updateCurrentAndNextPrayer()
      Control.updateNextPrayerTime()
    } catch (err) {
      alert(err.message)
    }
  })()
}
