import Views from '../Views'
import './settings.scss'
import markup from './settings.html'



class Settings extends Views {
  constructor() {
    super()
  }


  _element = HTML(markup)
}


export default new Settings()

