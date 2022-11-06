import { useState } from 'react'

import css from './App.module.scss'
import Header from '$components/Header'
import Prayer from '$components/Prayer'
import Settings from '$components/Settings'
import Clock from '$components/Clock'

const App = () => {
  const [showSettings, setShowSettings] = useState(true)

  return (
    <main className={css.main}>
      <Header setShowSettings={setShowSettings} />
      <Prayer />
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      <Clock />
    </main>
  )
}

export default App
