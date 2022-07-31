import Views from '../Views'
import './settings.scss'
import markup from './settings.html'
import iconSettings from '../../assests/icons/gear-solid.svg'

class Settings extends Views {
  _element = HTML(markup.replace(`{settings}`, iconSettings))

  constructor() {
    super()

    this.addCloseHandler()
  }

  show() {
    this._element.classList.add(`show`)
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
}

export default new Settings()
