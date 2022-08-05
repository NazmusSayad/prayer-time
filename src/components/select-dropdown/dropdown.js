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

export default function (name, options) {
  const element = HTML(markup)
  const valueContainer = element.qs('.select-box__current')
  const listContainer = element.qs('.select-box__list--container')

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

    valueContainer.innerHTML += valueMarkup
    listContainer.innerHTML += listMarkup
  })

  const currentBox = element.qs('.select-box__current')
  currentBox.onclick = () => {
    const isActive = currentBox.classList.contains(`active`)

    if (isActive) {
      listContainer.qs('label.focus')?.click()
      removeAciveDropdowns()
    } else {
      currentBox.classList.add(`active`)
    }
  }

  currentBox.addEventListener('keydown', event => {
    if (!currentBox.classList.contains(`active`)) return
    const focusedElement = listContainer.qs('label.focus')

    /* TODO: Refactor this, Now just fold and don't see */
    switch (event.key) {
      case 'ArrowUp':
        if (!focusedElement) {
          listContainer.lastElementChild.qs('label').classList.add(`focus`)
        } else {
          focusedElement.classList.remove(`focus`)
          const prevElement =
            focusedElement.parentElement.previousElementSibling?.qs('label')

          if (prevElement) {
            prevElement.classList.add(`focus`)
          } else {
            listContainer.lastElementChild.qs('label').classList.add(`focus`)
          }
        }

        break

      case 'ArrowDown':
        if (!focusedElement) {
          listContainer.firstElementChild.qs('label').classList.add(`focus`)
        } else {
          focusedElement.classList.remove(`focus`)
          const nextElement =
            focusedElement.parentElement.nextElementSibling?.qs('label')

          if (nextElement) {
            nextElement.classList.add(`focus`)
          } else {
            listContainer.firstElementChild.qs('label').classList.add(`focus`)
          }
        }

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
