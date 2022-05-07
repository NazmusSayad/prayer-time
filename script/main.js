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
    latt: localStorage.getItem("latt") ? localStorage.getItem("latt") : null,
    long: localStorage.getItem("long") ? localStorage.getItem("long") : null,
  },
  method: localStorage.getItem("method") ? localStorage.getItem("method") : "Karachi",
  madhab: localStorage.getItem("madhab") ? localStorage.getItem("madhab") : "Hanafi",
  fajrLoaded: false,
};
