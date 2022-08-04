import './sass/base/index.scss'
import './controller'

// Service Worker!
;(async () => {
  try {
    await navigator.serviceWorker.register('./service-worker.js')
  } catch {}
})()
