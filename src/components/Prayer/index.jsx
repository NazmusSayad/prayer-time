import { useSelector } from 'react-redux'
import css from './index.module.scss'
import PrayerItem from './PrayerItem'

const Prayer = () => {
  const prayerTimes = useSelector((state) => state.prayer.prayerTimes.list)

  return (
    <div className={css.Prayer}>
      {prayerTimes.map((prayer) => (
        <PrayerItem prayer={prayer} key={prayer.id} />
      ))}
    </div>
  )
}

export default Prayer
