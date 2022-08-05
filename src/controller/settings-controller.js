import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import settingsView from '../views/settings/settings-view.js'
import modalView from '../views/modal/modal-view.js'
import * as prayerController from './prayer-controller.js'
import devLocation from '../data/dev-location.json'

export const formSubmitHandler = async Settings => {
  Object.assign(STATE.Settings, {
    madhab: Settings.madhab,
    calculationMethod: Settings.calculationMethod,
    currentPrayerAnimation: Settings.currentPrayerAnimation,
    otherAnimations: Settings.otherAnimations,
  })

  updateRootConfigAttributes()

  try {
    switch (Settings.locationMethod) {
      case 'ip':
        STATE.UserLocation = await Model.getUserLocationByIp()
        break
      case 'gps':
        STATE.UserLocation = await Model.getUserLocationByGPS()
        // Idk how to do that
        break
      case 'custom':
        // STATE.UserLocation =
        break
      case 'dev':
        STATE.UserLocation = devLocation
        break
    }

    prayerController.updatePrayer()
    modalView.greenAlert({
      title: 'Settings Saved!',
    })
  } catch (err) {
    modalView.redAlert({
      title: 'Failed!',
      message: err.message,
    })
  }
}

export const updateRootConfigAttributes = () => {
  STATE.Settings.currentPrayerAnimation
    ? settingsView.updater.currentPrayerAnimation.enable()
    : settingsView.updater.currentPrayerAnimation.disable()

  STATE.Settings.otherAnimations
    ? settingsView.updater.otherAnimations.enable()
    : settingsView.updater.otherAnimations.disable()
}

export const settingsClose = async newSettings => {
  const oldSettings = STATE.Settings
  const ifNoChanges =
    oldSettings.calculationMethod === newSettings.calculationMethod &&
    oldSettings.madhab === newSettings.madhab &&
    oldSettings.otherAnimations === newSettings.otherAnimations &&
    oldSettings.currentPrayerAnimation === newSettings.currentPrayerAnimation

  if (ifNoChanges) return settingsView.close()

  const input = await modalView.redConfirm({
    title: 'Are you sure?',
    message: 'You have some unsaved changes.',
  })

  if (input) {
    await Wait(150) // Waiting for the modal-view closing animation to finish!

    settingsView.close()
    settingsView.setPreviousSettings(oldSettings)
  }
}
