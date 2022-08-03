import Views from '../Views'
import './settings.scss'
import markup from './settings.html'
import DropDown from '../../components/select-dropdown/dropdown.js'
import calculationMethodList from '../../data/calculation-methods.json'
import madhabList from '../../data/madhab-list.json'

class Settings extends Views {
  _element = HTML(markup)
  #form = this._element.qs('#settings-form')

  constructor() {
    super()
    this.#fillDropDownOptions()
  }

  show() {
    this._element.classList.add(`show`)
  }

  close() {
    this._element.classList.add(`close`)
    const settings = document
      .qs('html')
      .getAttribute(`settings-otherAnimations`)
    if (settings === 'true') {
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

    const currentPrayerAnimation = !!this.#form.qs(
      `input#currentPrayerAnimation:checked`
    )
    const otherAnimations = !!this.#form.qs(`input#otherAnimations:checked`)

    return {
      /* NOTE: Order does matter */
      madhab,
      calculationMethod,
      currentPrayerAnimation,
      otherAnimations,
    }
  }

  #fillDropDownOptions() {
    const madhabDropDown = new DropDown('madhab', madhabList)
    const calculationDropDown = new DropDown(
      'calculationMethod',
      calculationMethodList
    )

    const madhabItem = this.#form.qs('#settings-item-method')
    const calculationItem = this.#form.qs('#settings-item-calculation')

    madhabItem.append(madhabDropDown)
    calculationItem.append(calculationDropDown)
  }
}

export default new Settings()
