import Views from '../Views.js'
import markup from './clock.html'
import './clock.scss'

class Clock extends Views {
  constructor() {
    super()
  }

  _element = HTML(markup)
  #secElement = this._element.qs('.clock__time--sec')
  #minElement = this._element.qs('.clock__time--min')
  #hourElement = this._element.qs('.clock__time--hour')
  #suffixElement = this._element.qs('.clock__time--suffix')
  #dateElement = this._element.qs('.clock__date')

  updateSecond(sec) {
    this.#secElement.innerHTML = sec < 10 ? '0' + sec : sec
  }

  updateMinute(min) {
    this.#minElement.innerHTML = min < 10 ? '0' + min : min
  }

  updateHour(hour) {
    let suffix = hour >= 12 ? 'PM' : 'AM'
    hour = ((hour + 11) % 12) + 1

    this.#hourElement.innerHTML = hour
    this.#suffixElement.innerHTML = suffix
  }

  updateDay(day) {
    this.#dateElement.innerHTML = day.toLocaleString('en-US', {
      day: '2-digit',
      year: 'numeric',
      month: 'long',
      weekday: 'long',
    })
  }
}

export default new Clock()
