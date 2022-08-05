import Views from '../Views'
import settingsUpdater from './settings-updater.js'
import './settings.scss'
import './custom-location.scss'
import markup from './settings.html'
import DropDown from '../../components/select-dropdown/dropdown.js'
import calculationMethodList from '../../data/calculation-methods.json'
import madhabList from '../../data/madhab-list.json'
import modalView from '../modal/modal-view.js'

class Settings extends Views {
  _element = HTML(markup)
  #form = this._element.qs('#settings-form')
  updater = settingsUpdater

  constructor() {
    super()
    this.#fillDropDownOptions()
  }

  show() {
    this._element.classList.add(`show`)
  }

  close() {
    this._element.classList.add(`close`)
    const otherAnimationSettings = document
      .qs('html')
      .getAttribute(`settings-otherAnimations`)

    if (otherAnimationSettings === 'true') {
      setTimeout(() => (this._element.className = ''), 500)
    } else this._element.className = ''
  }

  setPreviousSettings(settings) {
    this.#form.qs('#' + settings.madhab)?.click()
    this.#form.qs('#' + settings.calculationMethod)?.click()

    const prayerAnimation = this.#form.qs(`input#currentPrayerAnimation`)
    const otherAnimations = this.#form.qs(`input#otherAnimations`)

    prayerAnimation.checked === settings.currentPrayerAnimation ||
      prayerAnimation.click()
    otherAnimations.checked === settings.otherAnimations ||
      otherAnimations.click()
  }

  addCloseHandler(callback) {
    const button = this._element.qs(`#settings-close-button`)
    button.onclick = () => callback(this.#getFormData())
  }

  addFormSubmitHandler(callback) {
    this.#form.addEventListener('submit', event => {
      event.preventDefault()
      callback(this.#getFormData())
    })
  }

  #getFormData() {
    const madhab = this.#form.qs(`input[name='madhab']:checked`).id
    const calculationMethod = this.#form.qs(
      `input[name='calculationMethod']:checked`
    ).id
    const locationMethod = this.#form
      .qs(`input[name='location']:checked`)
      .id.split('-')[1]

    const currentPrayerAnimation = Boolean(
      this.#form.qs(`input#currentPrayerAnimation:checked`)
    )
    const otherAnimations = Boolean(
      this.#form.qs(`input#otherAnimations:checked`)
    )

    return {
      madhab,
      calculationMethod,
      currentPrayerAnimation,
      otherAnimations,
      locationMethod,
    }
  }

  #fillDropDownOptions() {
    const madhabDropDown = new DropDown('madhab', madhabList)
    const calculationDropDown = new DropDown(
      'calculationMethod',
      calculationMethodList
    )
    const locationDropDown = new DropDown('location', [
      {
        id: 'location-none',
        label: 'none',
        checked: true,
      },
      {
        id: 'location-ip',
        label: 'IP Address',
      },
      {
        id: 'location-gps',
        label: 'Geolocation API',
      },
      {
        id: 'location-custom',
        label: 'Custom',
      },
      {
        id: 'location-dev',
        label: 'Only for Developer',
      },
    ])

    const madhabContainer = this.#form.qs('#settings-item-method')
    const calculationContainer = this.#form.qs('#settings-item-calculation')
    const locationContainer = this.#form.qs('#settings-item-location')

    madhabContainer.append(madhabDropDown)
    calculationContainer.append(calculationDropDown)
    locationContainer.append(locationDropDown)

    /* TODO: Add custom location support */
    locationContainer.qs('#location-custom').onclick = async () => {
      locationContainer.qs('label').click() /* XXX: Will be removed later */

      await modalView.redAlert({
        title: 'Not implemented yet!',
        message: 'This feature is inside the TODO list :)',
      })
    }
  }
}

export default new Settings()
