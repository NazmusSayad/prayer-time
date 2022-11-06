export const makeUniquePrayerList = (main, extra) => {
  return [
    { id: 'fajr', label: 'Fajr', time: main.fajr },
    { id: 'sunrise', label: 'Sunrise', time: main.sunrise },
    { id: 'dhuhr', label: 'Dhuhr', time: main.dhuhr },
    { id: 'asr', label: 'Asr', time: main.asr },
    { id: 'maghrib', label: 'Maghrib', time: main.maghrib },
    { id: 'isha', label: 'Isha', time: main.isha },
    { id: 'fajr2', label: 'Fajr', time: extra.fajr },

    /* XXX: You can modify them */
    { id: 'sunrise2', label: 'Sunrise', time: extra.sunrise },
    { id: 'dhuhr2', label: 'Dhuhr', time: extra.dhuhr },
    { id: 'asr2', label: 'Asr', time: extra.asr },
    { id: 'maghrib2', label: 'Maghrib', time: extra.maghrib },
    { id: 'isha2', label: 'Isha', time: extra.isha },
  ]
}
