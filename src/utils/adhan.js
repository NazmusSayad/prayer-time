const adhan = new Audio(
  new URL(
    '../assests/adhan/non-fajr-omor-hiasham-al-arabi.webm',
    import.meta.url
  )
)
const adhanFajr = new Audio(
  new URL('../assests/adhan/fajr-al-afasy.webm', import.meta.url)
)

const audioPlayer = audio => {
  const endTime = 1000 * 60 * 5 + Date.now()

  const tryToPlay = setInterval(() => {
    if (endTime < Date.now()) clearInterval(tryToPlay)

    audio
      .play()
      .then(() => {
        clearInterval(tryToPlay)
      })
      .catch(() => {})
  }, 250)
}

export default (prayer, time) => {
  if (prayer === 'fajr') audioPlayer(adhanFajr)
  else audioPlayer(adhan)

  const noti = new Notification("It's time for prayer!", {
    body: prayer + ':\n' + time.toLocaleString(),
  })
  setTimeout(() => noti.close(), 5000)
}
