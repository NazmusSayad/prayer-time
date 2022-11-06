import css from './PrayerItem.module.scss'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { convertMstoHHMMSS } from '$utils/utils'

const PrayerItem = ({ prayer, typeMain, typeExtra }) => {
  const currentDate = useSelector((state) => state.prayer.date)
  const currentPrayer = useSelector((state) => state.prayer.currentPrayer)
  const nextPrayer = useSelector((state) => state.prayer.nextPrayer)
  const isExtraType = prayer.id.endsWith('2')
  const isCurrentPrayer = currentPrayer === prayer.id
  const isNextPrayer = nextPrayer === prayer.id

  return (
    <div
      className={cn(
        css.PrayerItem,
        isExtraType ? css.extraItem : css.mainItem,
        {
          [css.current]: prayer.id !== 'sunrise' && isCurrentPrayer,
          [css.next]: isNextPrayer,
        }
      )}
    >
      <div className={css.time}>
        {prayer.time.toLocaleTimeString('en-US', { timeStyle: 'short' })}
      </div>

      <div className={css.label}>{prayer.label}</div>

      {isNextPrayer && (
        <div className={css.remain}>
          {convertMstoHHMMSS(prayer.time - currentDate)}
        </div>
      )}
    </div>
  )
}

export default PrayerItem
