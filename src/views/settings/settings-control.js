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
  _key = 'currentprayeranimation'
}

class OtherAnimations extends Base {
  _key = 'otheranimations'
}

export default {
  currentPrayerAnimation: new CurrentPrayerAnimation(),
  otherAnimations: new OtherAnimations(),
}
