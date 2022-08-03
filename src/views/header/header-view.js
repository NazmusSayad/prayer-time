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

  #fullScreenButton = this._element.qs('button.header__full-screen')
  #settingsButton = this._element.qs('button.header__settings')

  constructor() {
    super()
  }

  addSettingsHandler(callback) {
    this.#settingsButton.onclick = callback
  }

  addFullScreenHandler(callback) {
    this.#fullScreenButton.onclick = callback
  }

  showCompressFullScreenControlButton() {
    this.#fullScreenButton.setAttribute(`fullscreen`, '')
  }

  showExpandFullScreenControlButton() {
    this.#fullScreenButton.removeAttribute(`fullscreen`)
  }
}

export default new HeaderView()
