import markup from './select-dropdown.html'
import './select-dropdown.scss'

const removeAciveDropdowns = () => {
  /* HACK: May contain BUG! */
  const activeBox = document.qs('.select-box__current.active')
  activeBox?.classList.remove(`active`)

  const activeListContainer = activeBox?.nextElementSibling?.qs(
    '.select-box__list--container'
  )
  activeListContainer?.qs('label.focus')?.classList.remove(`focus`)
}

const fillDropDownContainer = (parent, name, options) => {
  const valueContainer = parent.qs('.select-box__current')
  const listContainer = parent.qs('.select-box__list--container')

  options.forEach(({ id, label, checked = false }) => {
    const valueMarkup = `
    <div class="select-box__value">
      <input class="select-box__input" type="radio" id="${id}" name="${name}" ${
      checked ? 'checked' : ''
    } />
      <p class="select-box__input-text">${label}</p>
    </div>
    `
    const listMarkup = `
    <li>
      <label class="select-box__option" for="${id}" aria-hidden="aria-hidden">${label}</label>
    </li>
    `

    valueContainer.appendChild(HTML(valueMarkup))
    listContainer.appendChild(HTML(listMarkup))
  })
}

const focusToUpElement = (container, element) => {
  if (!element) {
    container.lastElementChild.qs('label').classList.add(`focus`)
  } else {
    element.classList.remove(`focus`)
    const prevElement =
      element.parentElement.previousElementSibling?.qs('label')

    if (prevElement) {
      prevElement.classList.add(`focus`)
    } else {
      container.lastElementChild.qs('label').classList.add(`focus`)
    }
  }
}

const focusToDownElement = (container, element) => {
  if (!element) {
    container.firstElementChild.qs('label').classList.add(`focus`)
  } else {
    element.classList.remove(`focus`)
    const nextElement = element.parentElement.nextElementSibling?.qs('label')

    if (nextElement) {
      nextElement.classList.add(`focus`)
    } else {
      container.firstElementChild.qs('label').classList.add(`focus`)
    }
  }
}

export default function (name, options) {
  const element = HTML(markup)
  fillDropDownContainer(element, name, options)

  const currentBox = element.qs('.select-box__current')
  const listContainer = element.qs('.select-box__list--container')

  currentBox.onclick = () => {
    const isActive = currentBox.classList.contains(`active`)

    isActive && listContainer.qs('label.focus')?.click()
    removeAciveDropdowns()
    isActive || currentBox.classList.add(`active`)
  }

  currentBox.addEventListener('keydown', event => {
    if (!currentBox.classList.contains(`active`)) return
    const focusedElement = listContainer.qs('label.focus')

    switch (event.key) {
      case 'ArrowUp':
        focusToUpElement(listContainer, focusedElement)
        break

      case 'ArrowDown':
        focusToDownElement(listContainer, focusedElement)
        break
    }
  })

  return element
}

window.addEventListener('blur', removeAciveDropdowns)
document.addEventListener('click', () => {
  if (document.activeElement.matches(`.select-box__current`)) return
  removeAciveDropdowns()
})
