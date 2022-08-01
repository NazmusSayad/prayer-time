class Base {
  #root = document.querySelector('html')

  _key = null

  enable() {
    this.#root.setAttribute('settings-' + this._key, true)
  }

  disable() {
    this.#root.setAttribute('settings-' + this._key, false)
  }
}

class CurrentPrayerAnimation extends Base {
  _key = 'currentPrayerAnimation'
}

class SettingsAnimation extends Base {
  _key = 'settingsanimation'
}

export default {
  currentPrayerAnimation: new CurrentPrayerAnimation(),
  settingsAnimation: new SettingsAnimation(),
}
