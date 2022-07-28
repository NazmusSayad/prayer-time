import Views from '../Views'
import containerMarkup from './prayer-container.html'
import prayerItemMarkup from './prayer.html'
import './prayer.scss'

const prayerList = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

class Prayer extends Views {
  _element = HTML(containerMarkup)

  #fillContainer = () => {
    const container = this._element.qs('.prayer')

    ;['main', 'extra'].forEach(time => {
      prayerList.forEach(item => {
        const prayerItemElement = HTML(prayerItemMarkup)
        prayerItemElement.classList.add(time)
        prayerItemElement.setAttribute(`name`, item)
        prayerItemElement.qs('.name').innerHTML = item

        container.appendChild(prayerItemElement)
      })
    })
  }

  constructor() {
    super()
    this.#fillContainer()
  }
}

export default new Prayer()
