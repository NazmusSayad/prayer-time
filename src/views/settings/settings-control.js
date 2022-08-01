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

class SettingsOpenAnimation extends Base {
  _key = 'settingsOpenAnimation'
}

class SettingsCloseAnimation extends Base {
  _key = 'settingsCloseAnimation'
}

export default {
  currentPrayerAnimation: new CurrentPrayerAnimation(),
  settingsOpenAnimation: new SettingsOpenAnimation(),
  settingsCloseAnimation: new SettingsCloseAnimation(),
}
