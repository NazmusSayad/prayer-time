import markup from './select-dropdown.html'
import './select-dropdown.scss'

window.addEventListener('blur', () => {
  const currentBoxs = document.qsa('.select-box__current.active')

  currentBoxs.forEach(element => {
    element.classList.remove(`active`)
  })
})

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

  document.addEventListener('click', () => {
    if (currentBox === document.activeElement) document.activeElement.classList.toggle('active')
    else currentBox.classList.remove(`active`)
  })

  return element
}
