import Views from '../Views'
import './header.scss'
import _markup from './header.html'
import iconFullScreenExpand from '../../assests/icons/expand-solid.svg'
import iconFullScreenCompress from '../../assests/icons/compress-solid.svg'
import iconSettings from '../../assests/icons/gear-solid.svg'

const markup = _markup
  .replace('{fullscreenExpand}', iconFullScreenExpand)
  .replace('{fullScreenCompress}', iconFullScreenCompress)
  .replace('{settings}', iconSettings)

class HeaderView extends Views {
  _element = HTML(markup)

  constructor() {
    super()
  }

  addSettingsHandler(callback) {
    const button = this._element.qs('.header__settings button')
    button.onclick = callback
  }

  addFullScreenHandler(callback) {
    const button = this._element.qs('.header__full-screen button')
    button.onclick = callback
  }
}

export default new HeaderView()
