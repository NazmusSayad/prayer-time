import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Adhan from 'adhan'
import store from '$store'
import prayerAct from '$store/slice/prayer'
import { makeUniquePrayerList } from './utils'
let prayerTimesLoaded = false
let prayerCalculateCount = 0

const PrayerTimes = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const runClock = () => setCurrentDate(new Date())
  const dispatch = useDispatch()
  const config = useSelector((state) => state.prayer.config)

  // When fajr2 finishes, then recalculate times
  const nextFajrTime = useSelector(
    (state) =>
      state.prayer.prayerTimes.list?.filter(({ id }) => id === 'fajr2')[0]?.time
  )
  if (nextFajrTime && nextFajrTime <= currentDate) prayerCalculateCount++

  // Calculate times
  useEffect(() => {
    const getPrayerTimes = (date) => {
      const params = Adhan.CalculationMethod[config.method]()
      params.madhab = config.madhab
      return new Adhan.PrayerTimes(config.cords, date, params)
    }

    const today = getPrayerTimes(currentDate)
    const currentPrayer = today.currentPrayer()
    let output

    if (currentPrayer === 'none') {
      const yesterday = getPrayerTimes(new Date(Date.now() - 86400000))
      output = {
        raw: today,
        list: makeUniquePrayerList(yesterday, today),
      }
    } else {
      const tomorrow = getPrayerTimes(new Date(Date.now() + 86400000))
      output = {
        raw: today,
        list: makeUniquePrayerList(today, tomorrow),
      }
    }

    dispatch(prayerAct.updatePrayer(output))
    prayerTimesLoaded = true
  }, [config, currentDate.getDate(), prayerCalculateCount])

  // Calculate current and next prayers
  useEffect(() => {
    if (!prayerTimesLoaded) return
    const prevStore = store.getState().prayer

    let current = prevStore.prayerTimes.raw.currentPrayer()
    let next = prevStore.prayerTimes.raw.nextPrayer()

    if (current === 'none' || next === 'none') {
      current = 'isha'
      next = 'fajr2'
    }

    dispatch(prayerAct.updateCurrentNext({ current, next }))
    if (prevStore.currentPrayer && prevStore.currentPrayer !== current) {
      console.log('Play adhan', { current })
    }
  }, [currentDate.getMinutes(), prayerTimesLoaded])

  // Date
  useEffect(() => {
    dispatch(prayerAct.updateDate(currentDate))
  }, [currentDate.toString()])

  // Start Clock
  useEffect(() => {
    const interval = setInterval(() => {
      const ms = new Date().getMilliseconds()
      if (!Math.floor(ms / 100)) {
        clearInterval(interval)
        runClock()
        setInterval(runClock, 1000)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [])

  return <></>
}

export default memo(PrayerTimes)
