import Views from '../Views'
import markup from './modal.html'
import greenIcon from '../../assests/icons/ok-svgrepo-com.svg'
import './modal.scss'

class Modal extends Views {
  _element = HTML(markup.replace('{green-icon}', greenIcon))

  constructor() {
    super()
  }

  #yesButton = this._element.qs('#modal-yes')
  #noButton = this._element.qs('#modal-no')
  #title = this._element.qs('.modal__title')
  #message = this._element.qs('.modal__message')

  #showMessageModal(callback, options, needConfirmation) {
    this.#yesButton.addEventListener(
      'click',
      () => {
        this.#closeMessageModal()
        callback(true)
      },
      {
        once: true,
      }
    )
    this.#noButton.addEventListener(
      'click',
      () => {
        this.#closeMessageModal()
        callback(false)
      },
      {
        once: true,
      }
    )

    const { flag, message = '', title = '' } = options
    this.#title.innerHTML = title
    this.#message.innerHTML = message
    this._element.className = `${needConfirmation} ${flag} show`
  }

  #closeMessageModal() {
    this._element.classList.remove(`show`)
  }

  alert(options = {}) {
    return new Promise(resolve => {
      this.#showMessageModal(resolve, options, false)
    })
  }

  confirm(options = {}) {
    return new Promise(resolve => {
      this.#showMessageModal(resolve, options, true)
    })
  }
}

export default new Modal()
