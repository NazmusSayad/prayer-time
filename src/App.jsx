import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updatePrayer } from '$store/slice/prayer'
import css from './App.module.scss'
import Header from '$components/Header'
import Prayer from '$components/Prayer'
// import Settings from '$components/Settings'
import Clock from '$components/Clock'

const App = () => {
  // const dispatch = useDispatch()
  // const startClock = () => {
  //   dispatch(updatePrayer)
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const ms = new Date().getMilliseconds()
  //     if (!Math.floor(ms / 100)) {
  //       clearInterval(interval)
  //       startClock()
  //       setInterval(startClock, 1000)
  //     }
  //   }, 10)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <main className={css.main}>
      <Header />
      <Prayer />
      {/* <Settings /> */}
      <Clock />
    </main>
  )
}

export default App
