import css from './Clock.module.scss'

const Clock = ({ currentTime = new Date() }) => {
  return (
    <div className={css.Clock}>
      <p className={css.time}>{currentTime.toLocaleTimeString('en-US')}</p>
      <p className={css.date}>
        {currentTime.toLocaleDateString('en-US', { dateStyle: 'full' })}
      </p>
    </div>
  )
}

export default Clock
