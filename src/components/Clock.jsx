import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import css from './Clock.module.scss'

const Clock = () => {
  const currentDate = new Date(useSelector((state) => state.prayer.date))

  return (
    <div className={css.Clock}>
      <p className={css.time}>{currentDate.toLocaleTimeString('en-US')}</p>
      <p className={css.date}>
        {currentDate.toLocaleDateString('en-US', { dateStyle: 'full' })}
      </p>
    </div>
  )
}

export default Clock
