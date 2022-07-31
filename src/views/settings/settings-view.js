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
      setTimeout(() => {
        this._element.className = ''
      }, 500)
    }
  }
}

export default new Settings()
