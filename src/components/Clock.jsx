import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import css from './Clock.module.scss'

const Clock = () => {
  const currentDate = useSelector((state) => state.prayer.date)

  /*   useEffect(() => {
    const interval = setInterval(() => {
      const ms = new Date().getMilliseconds()
      if (!Math.floor(ms / 100)) {
        clearInterval(interval)
        updateCurrentDate()
        setInterval(updateCurrentDate, 1000)
      }
    }, 10)

    return () => clearInterval(interval)
  }, []) */

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
