import css from './App.module.scss'
import Header from '$components/Header'
import Prayer from '$components/Prayer'
import Settings from '$components/Settings'
import Clock from '$components/Clock'
import { useDispatch } from 'react-redux'
import prayer from '$store/slice/prayer'

const App = () => {
  const dispatch = useDispatch()

  document.onclick = () => {
    dispatch(prayer.updateMadhab('shafi'))
  }

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
