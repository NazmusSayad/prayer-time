import Views from '../Views'
import './header.scss'
import markup from './header.html'
import iconFullScreenExpand from '../../assests/icons/expand-solid.svg'
import iconFullScreenCompress from '../../assests/icons/compress-solid.svg'
import iconSettings from '../../assests/icons/gear-solid.svg'

class HeaderView extends Views {
  _element = HTML(
    markup
      .replace('{fullscreenExpand}', iconFullScreenExpand)
      .replace('{fullScreenCompress}', iconFullScreenCompress)
      .replace('{settings}', iconSettings)
  )

  constructor() {
    super()
  }

  addSettingsHandler(callback) {
    const button = this._element.qs('button.header__settings')
    button.onclick = callback
  }

  addFullScreenHandler(callback) {
    const button = this._element.qs('button.header__full-screen')
    button.onclick = callback
  }

  showCompressFullScreenControlButton() {
    const fullScreenElement = this._element.qs(`.header__full-screen`)
    fullScreenElement.setAttribute(`fullscreen`, '')
  }

  showExpandFullScreenControlButton() {
    const fullScreenElement = this._element.qs(`.header__full-screen`)
    fullScreenElement.removeAttribute(`fullscreen`)
  }
}

export default new HeaderView()
