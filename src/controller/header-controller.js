import headerView from '../views/header/header-view.js'
import settingsView from '../views/settings/settings-view.js'

export const showSettings = () => settingsView.show()

export const fullScreen = () => {
  if (media.matches && document.fullscreenElement) {
    document.exitFullscreen()
  } else if (media.matches) {
    alert('Sorry, Press F11')
  } else {
    document.qs('html').requestFullscreen()
  }
}

const media = matchMedia('(display-mode: fullscreen)')
const mediaHandler = () => {
  if (media.matches) headerView.showCompressFullScreenControlButton()
  else headerView.showExpandFullScreenControlButton()
}

media.onchange = mediaHandler
mediaHandler()

window.addEventListener('dblclick', event => {
  event.preventDefault()
  fullScreen()
})

window.addEventListener('contextmenu', event => {
  event.preventDefault()
  showSettings()
})
