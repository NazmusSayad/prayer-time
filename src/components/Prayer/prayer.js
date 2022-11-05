import * as Adhan from 'adhan'

export const getPrayerTimes = ({ cords, date, method, madhab } = {}) => {
  const coordinates = new Adhan.Coordinates('22.497924', '89.098102')
  const params = Adhan.CalculationMethod.Karachi()
  params.madhab = 'hanafi'
  const prayerTimes = new Adhan.PrayerTimes(coordinates, new Date(), params)

  console.log(prayerTimes.currentPrayer())
  console.log(prayerTimes.nextPrayer())
  console.log(prayerTimes.timeForPrayer())

  return {
    output: prayerTimes,
    prayer: {
      fajr: prayerTimes.fajr,
      sunrise: prayerTimes.sunrise,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
    },
  }
}
