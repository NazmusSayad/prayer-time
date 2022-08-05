const updateSettingsData = () => {
  localStorage.setItem(
    'prayer-time-settings',
    JSON.stringify({
      madhab: STATE.Settings.madhab,
      calculationMethod: STATE.Settings.calculationMethod,
      currentPrayerAnimation: STATE.Settings.currentPrayerAnimation,
      otherAnimations: STATE.Settings.otherAnimations,
    })
  )
}

const updateLocationData = () => {
  localStorage.setItem(
    'prayer-time-location',
    JSON.stringify(STATE.UserLocation)
  )
}

const STATE = {
  Settings: {
    // Settings

    _madhab: 'hanafi',
    _calculationMethod: 'Karachi',
    _currentPrayerAnimation: true,
    _otherAnimations: true,

    get madhab() {
      return this._madhab
    },
    get calculationMethod() {
      return this._calculationMethod
    },
    get currentPrayerAnimation() {
      return this._currentPrayerAnimation
    },
    get otherAnimations() {
      return this._otherAnimations
    },

    set madhab(set) {
      this._madhab = set
      updateSettingsData()
    },
    set calculationMethod(set) {
      this._calculationMethod = set
      updateSettingsData()
    },
    set currentPrayerAnimation(set) {
      this._currentPrayerAnimation = set
      updateSettingsData()
    },
    set otherAnimations(set) {
      this._otherAnimations = set
      updateSettingsData()
    },
  },

  // Location
  _UserLocation: {},

  get UserLocation() {
    return this._UserLocation
  },
  set UserLocation(value) {
    this._UserLocation = value
    updateLocationData()
  },

  // Extras
  prayerTimes: {
    currentPrayer: () => {},
  },

  prayerTimesList: {},

  prayerLoaded: false,
}

;(() => {
  const localSettings = localStorage.getItem(`prayer-time-settings`)
  const localLocation = localStorage.getItem(`prayer-time-location`)

  const loadedSettings = JSON.parse(localSettings) || {}
  const loadedLocation = JSON.parse(localLocation) || {}

  Object.assign(STATE.Settings, loadedSettings)
  Object.assign(STATE.UserLocation, loadedLocation)
})()

export default STATE
