import STATE from '../model/STATE.js'
import * as Model from '../model/model.js'
import settingsView from '../views/settings/settings-view.js'
import modalView from '../views/modal/modal-view.js'
import * as prayerController from './prayer-controller.js'

export const formSubmitHandler = data => {
  Object.assign(STATE.Settings, data)
  Model.saveUserConfig()
  updateRootConfigAttributes()

  prayerController.initPrayer()
  modalView.greenAlert({
    title: 'Settings Saved!',
  })
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
