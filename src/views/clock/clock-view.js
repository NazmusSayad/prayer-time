import Views from '../Views.js'
import markup from './clock.html'
import './clock.scss'

class Clock extends Views {
  _element = HTML(markup)

  constructor() {
    super()
  }
}

export default new Clock()
