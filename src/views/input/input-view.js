import Views from '../Views'
import inputMarkup from './input.html'
import './input.scss'

class Input extends Views {
  _element = HTML(inputMarkup)

  constructor() {
    super()
  }
}

export default new Input()
