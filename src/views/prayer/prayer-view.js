import { convertMstoHHMMSS } from '../../utils/utils'
import Views from '../Views'
import containerMarkup from './prayer-container.html'
import prayerItemMarkup from './prayer.html'
import './prayer.scss'

class Prayer extends Views {
  _element = HTML(containerMarkup)
  #container = this._element.qs('.prayer')

  constructor() {
    super()
  }

  fillContainer = list => {
    this.#container.innerHTML = ''

    list.forEach(({ id, name, time }) => {
      const prayerItemElement = HTML(prayerItemMarkup)
      prayerItemElement.id = id
      prayerItemElement.qs('.name').innerHTML = name
      prayerItemElement.qs('.time').innerHTML = time
        .toLocaleTimeString()
        .replace(':00 ', ' ')

      this.#container.appendChild(prayerItemElement)
    })
  }

  updateCurrentPrayer(currentPrayer) {
    this.#container.qsa('.current').forEach(element => {
      element?.classList?.remove(`current`)
    })

    if (currentPrayer === 'sunrise') return
    this.#container.qs('#' + currentPrayer).classList.add(`current`)
  }

  updateNextPrayer(nextPrayer) {
    this.#container.qsa('.next').forEach(element => {
      element?.classList?.remove(`next`)
    })

    this.#container.qs('#' + nextPrayer).classList.add(`next`)
  }

  updateNextPrayerTime(diff) {
    const nextPrayerElement = this.#container.qs('.next')
    const remainElement = nextPrayerElement.qs('.remain')

    remainElement.innerHTML = convertMstoHHMMSS(diff + 100)
  }

  addRetryButtonhandler(callback) {
    const button = this.#container.qs('button')
    button.onclick = () => callback()
  }
}

export default new Prayer()
