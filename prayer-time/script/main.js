const config = {
  prayerTimes: {
    today: {
      fajr: "",
      sunrise: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
    },
    extra: {
      fajr: "",
      sunrise: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: "",
    },
  },
  extraTime_name: "",
  coordinates: {
    latt: localStorage.getItem("latt"),
    long: localStorage.getItem("long"),
  },
  method: localStorage.getItem("method") || "Karachi",
  madhab: localStorage.getItem("madhab") || "Hanafi",
  fajrLoaded: false,
  done: false,
}
