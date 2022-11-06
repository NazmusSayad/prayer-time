import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import * as Adhan from 'adhan'
import useDate from './useDate'
let shouldUpdatePrayerTimes = 0

const usePrayer = () => {
  const currentDate = useDate()
  console.log(currentDate)

  return
  const prevStore = useSelector((state) => state.prayer)

  const prayerResult = useMemo(() => {
    console.log('Get new times')
    const params = Adhan.CalculationMethod.Karachi()
    return new Adhan.PrayerTimes(prevStore.config.cords, prevStore.date, params)
  }, [
    prevStore.config.cords,
    prevStore.config.method,
    prevStore.config.madhab,
    shouldUpdatePrayerTimes,
  ])

  console.log(prayerResult)
}

export default usePrayer
