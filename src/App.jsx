import css from './App.module.scss'
import Header from '$components/Header'
import Prayer from '$components/Prayer'
// import Settings from '$components/Settings'
import Clock from '$components/Clock'

const App = () => {
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
