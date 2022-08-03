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

  #showMessageModal(callback, config) {
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

    const {
      type,
      needConfirmation,
      options: { message = '', title = '' },
    } = config

    this.#title.innerHTML = title
    this.#message.innerHTML = message
    this._element.className = `${needConfirmation} ${type} show`
  }

  #closeMessageModal() {
    this._element.classList.remove(`show`)
  }

  redConfirm(options = {}) {
    return new Promise(resolve => {
      this.#showMessageModal(resolve, {
        type: 'red',
        needConfirmation: true,
        options,
      })
    })
  }

  greenConfirm(options = {}) {
    return new Promise(resolve => {
      this.#showMessageModal(resolve, {
        type: 'green',
        needConfirmation: true,
        options,
      })
    })
  }

  redAlert(options = {}) {
    return new Promise(resolve => {
      this.#showMessageModal(resolve, {
        type: 'red',
        needConfirmation: false,
        options,
      })
    })
  }

  greenAlert(options = {}) {
    return new Promise(resolve => {
      this.#showMessageModal(resolve, {
        type: 'green',
        needConfirmation: false,
        options,
      })
    })
  }
}

export default new Modal()
