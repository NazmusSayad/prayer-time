import {
  convertFrom24To12Format,
  requestNotificationPermission,
} from './utils.js'

const adhanNormal = new URL(
  '../assests/adhan/non-fajr-omor-hiasham-al-arabi.webm',
  import.meta.url
)
const adhanFajr = new URL(
  '../assests/adhan/fajr-al-afasy.webm',
  import.meta.url
)

const audioPlayer = (audioUrl) => {
  const endTime = 1000 * 60 * 5 + Date.now()

  const tryToPlay = setInterval(() => {
    if (endTime < Date.now()) clearInterval(tryToPlay)

    new Audio(audioUrl)
      .play()
      .then(() => {
        clearInterval(tryToPlay)
      })
      .catch(() => {})
  }, 250)
}

export default (prayer, time) => {
  if (prayer === 'sunrise') return

  if (prayer === 'fajr') audioPlayer(adhanFajr)
  else audioPlayer(adhanNormal)

  const noti = new Notification(
    `It's time for "${prayer.capitalize()}" prayer!`,
    {
      body: 'Starting time: ' + convertFrom24To12Format(time),
      vibrate: [200, 100, 200],
      requireInteraction: false,
      badge: 'icon_512x512.png',
      icon: 'adhan.webp',
    }
  )
  setTimeout(() => noti.close(), 10000)
}

document.addEventListener('pointerdown', requestNotificationPermission)
document.addEventListener('mousedown', requestNotificationPermission)
document.addEventListener('touchstart', requestNotificationPermission)
document.addEventListener('keydown', requestNotificationPermission)
