import css from './PrayerItem.module.scss'
import cn from 'classnames'

const PrayerItem = ({ prayer, time, currentTime, typeMain, typeExtra }) => {
  return (
    <div
      className={cn(css.PrayerItem, {
        [css.mainItem]: typeMain,
        [css.extraItem]: typeExtra,
      })}
    >
      <div className={css.time}>time</div>
      <div className={css.label}>{prayer}</div>
      <div className={css.remain}>remaining</div>
    </div>
  )
}

export default PrayerItem
