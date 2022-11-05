import css from './index.module.scss'
import PrayerItem from './PrayerItem'
import { getPrayerTimes } from './prayer'
const prayerList = ['fajr', 'duhr', 'asr', 'maghrib', 'isha']

const Prayer = () => {
  getPrayerTimes()

  return (
    <div className={css.Prayer}>
      {prayerList.map((p) => (
        <PrayerItem prayer={p} key={p} typeMain />
      ))}
      {prayerList.map((p) => (
        <PrayerItem prayer={p} key={p} typeExtra />
      ))}
    </div>
  )
}

export default Prayer
