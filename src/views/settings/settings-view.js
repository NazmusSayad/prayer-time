import Views from '../Views'
import './settings.scss'
import markup from './settings.html'
import iconSettings from '../../assests/icons/gear-solid.svg'
import DropDown from '../../components/select-dropdown/dropdown.js'
import calculationMethodList from '../../data/calculation-methods.json'
import madhabList from '../../data/madhab-list.json'

class Settings extends Views {
  _element = HTML(markup.replace(`{settings}`, iconSettings))
  #form = this._element.qs('#settings-form')

  constructor() {
    super()
    this.fillDropDownOptions()
  }

  show() {
    this._element.classList.add(`show`)
  }

  setPreviousSettings(settings) {
    this.#form.qs('#' + settings.madhab)?.click()
    this.#form.qs('#' + settings.calculationMethod)?.click()

    const prayerAnimation = this.#form.qs(`input#currentPrayerAnimation`)
    const settingsAnimation = this.#form.qs(`input#settingsAnimation`)

    if (prayerAnimation.checked !== settings.currentPrayerAnimation) prayerAnimation.click()
    if (settingsAnimation.checked !== settings.settingsAnimation) settingsAnimation.click()
  }

  addFormSubmitHandler(callback) {
    this.#form.addEventListener('submit', event => {
      event.preventDefault()
      callback(this.getFormData())
    })
  }

  getFormData() {
    const madhab = this.#form.qs(`input[name='madhab']:checked`).id
    const calculationMethod = this.#form.qs(`input[name='calculationMethod']:checked`).id

    const currentPrayerAnimation = !!this.#form.qs(`input#currentPrayerAnimation:checked`)
    const settingsAnimation = !!this.#form.qs(`input#settingsAnimation:checked`)

    return {
      /* NOTE: Order does matter */
      madhab,
      calculationMethod,
      currentPrayerAnimation,
      settingsAnimation,
    }
  }

  addCloseHandler(confirmToClose) {
    const button = this._element.qs(`#settings-close-button`)

    button.onclick = () => {
      if (!confirmToClose(this.getFormData())) return

      this._element.classList.add(`close`)
      const settings = document.qs('html').getAttribute(`settings-settingsanimation`)
      if (settings === 'true') {
        setTimeout(() => (this._element.className = ''), 500)
      } else this._element.className = ''
    }
  }

  fillDropDownOptions() {
    const madhabDropDown = new DropDown('madhab', madhabList)
    const calculationDropDown = new DropDown('calculationMethod', calculationMethodList)

    const madhabItem = this.#form.qs('#settings-item-method')
    madhabItem.append(madhabDropDown)
    const calculationItem = this.#form.qs('#settings-item-calculation')
    calculationItem.append(calculationDropDown)
  }
}

export default new Settings()
