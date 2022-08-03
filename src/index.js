import './sass/base/index.scss'
import './controller'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('Hello')
    
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
