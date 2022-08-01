import Views from '../Views'
import './settings.scss'
import markup from './settings.html'
import iconSettings from '../../assests/icons/gear-solid.svg'
import DropDown from '../../components/select-dropdown/dropdown.js'
import calculationMethodList from '../../data/calculation-methods.json'
import madhabList from '../../data/madhab-list.json'

class Settings extends Views {
  _element = HTML(markup.replace(`{settings}`, iconSettings))

  constructor() {
    super()
    this.addCloseHandler()
    this.fillDropDownOptions()
  }

  show(settings) {
    const form = this._element.qs('#settings-form')

    form.qs('#' + settings.madhab)?.click()
    form.qs('#' + settings.calculationMethod)?.click()

    const prayerAnimation = form.qs(`input#currentPrayerAnimation`)
    const openAnimation = form.qs(`input#settingsOpenAnimation`)
    const closeAnimation = form.qs(`input#settingsCloseAnimation`)

    if (prayerAnimation.checked !== settings.currentPrayerAnimation) prayerAnimation.click()
    if (openAnimation.checked !== settings.settingsOpenAnimation) openAnimation.click()
    if (closeAnimation.checked !== settings.settingsCloseAnimation) closeAnimation.click()

    this._element.classList.add(`show`)
  }

  addFormSubmitHandler(callback) {
    const form = this._element.qs('#settings-form')
    form.addEventListener('submit', event => {
      event.preventDefault()

      const madhab = this._element.qs(`input[name='madhab']:checked`).id
      const calculationMethod = this._element.qs(`input[name='calculationMethod']:checked`).id

      const currentPrayerAnimation = !!form.qs(`input#currentPrayerAnimation:checked`)
      const settingsOpenAnimation = !!form.qs(`input#settingsOpenAnimation:checked`)
      const settingsCloseAnimation = !!form.qs(`input#settingsCloseAnimation:checked`)

      callback({
        madhab,
        calculationMethod,
        currentPrayerAnimation,
        settingsOpenAnimation,
        settingsCloseAnimation,
      })
    })
  }

  addCloseHandler() {
    const button = this._element.qs(`#settings-close-button`)

    button.onclick = () => {
      this._element.classList.add(`close`)
      const settings = document.qs('html').getAttribute(`settings-settingscloseanimation`)
      if (settings === 'true') {
        setTimeout(() => (this._element.className = ''), 500)
      } else this._element.className = ''
    }
  }

  fillDropDownOptions() {
    const madhabDropDown = new DropDown('madhab', madhabList)
    const calculationDropDown = new DropDown('calculationMethod', calculationMethodList)

    const madhabItem = this._element.qs('#settings-item-method')
    madhabItem.append(madhabDropDown)
    const calculationItem = this._element.qs('#settings-item-calculation')
    calculationItem.append(calculationDropDown)
  }
}

export default new Settings()
