const arrayOfObjectSort = (t, e, n) => {
   n ? t.sort((t, n) => (n[e] > t[e] ? 1 : t[e] > n[e] ? -1 : 0)) : t.sort((t, n) => (t[e] > n[e] ? 1 : n[e] > t[e] ? -1 : 0))
}
const format_time = (t) => {
   let e = t.getHours(),
      r = t.getMinutes(),
      u = e >= 12 ? "PM" : "AM"
   return (e = (e %= 12) || 12) + ":" + (r = r < 10 ? "0" + r : r) + " " + u
}
const check_difference_between_two_time = (e, t = new Date()) => {
   const duration = e - t + 10
   let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

   hours = hours < 10 ? "0" + hours : hours
   minutes = minutes < 10 ? "0" + minutes : minutes
   seconds = seconds < 10 ? "0" + seconds : seconds

   return hours + ":" + minutes + ":" + seconds
}
const get_prayerTIme_element = (selector) => {
   const item = element.prayerTimes.querySelector(`[selector="${selector}"]`)

   return {
      main: item,
      label: item.querySelector(".label"),
      name: item.querySelector(".name"),
      time: item.querySelector(".time"),
      remain: item.querySelector(".remain"),
   }
}
// ----------------------------------------------

const update_time_database = () => {
   if (!config.coordinates.latt || !config.coordinates.long) return

   config.prayerTimes.today = get_prayerTimes() // Today prayer time updated

   if (config.prayerTimes.today.fajr >= new Date()) {
      // If current time is below than "Fajr" and more than 12:00 AM
      config.prayerTimes.extra = get_prayerTimes(new Date(Date.now() - 86400000))
      config.extraTime_name = "yesterday"
   } else {
      config.prayerTimes.extra = get_prayerTimes(new Date(Date.now() + 86400000))
      config.extraTime_name = "tomorrow"
   } // Extra prayer time updated

   update_page()
   config.done = true
   update_next_and_current_prayer()
}
const update_page = () => {
   element.prayerTimes.setAttribute("extraTimes", config.extraTime_name)

   get_prayerTIme_element("fajr").time.innerHTML = format_time(config.prayerTimes.today.fajr)
   get_prayerTIme_element("sunrise").time.innerHTML = format_time(config.prayerTimes.today.sunrise)
   get_prayerTIme_element("dhuhr").time.innerHTML = format_time(config.prayerTimes.today.dhuhr)
   get_prayerTIme_element("asr").time.innerHTML = format_time(config.prayerTimes.today.asr)
   get_prayerTIme_element("maghrib").time.innerHTML = format_time(config.prayerTimes.today.maghrib)
   get_prayerTIme_element("isha").time.innerHTML = format_time(config.prayerTimes.today.isha)

   get_prayerTIme_element("fajr_2").time.innerHTML = format_time(config.prayerTimes.extra.fajr)
   get_prayerTIme_element("sunrise_2").time.innerHTML = format_time(config.prayerTimes.extra.sunrise)
   get_prayerTIme_element("dhuhr_2").time.innerHTML = format_time(config.prayerTimes.extra.dhuhr)
   get_prayerTIme_element("asr_2").time.innerHTML = format_time(config.prayerTimes.extra.asr)
   get_prayerTIme_element("maghrib_2").time.innerHTML = format_time(config.prayerTimes.extra.maghrib)
   get_prayerTIme_element("isha_2").time.innerHTML = format_time(config.prayerTimes.extra.isha)
}

// Prayer Times
const get_prayerTimes = (date = new Date()) => {
   const coordinates = new adhan.Coordinates(config.coordinates.latt, config.coordinates.long)
   const params = adhan.CalculationMethod[config.method]()
   params.madhab = adhan.Madhab[config.madhab]

   const prayerTimes = new adhan.PrayerTimes(coordinates, date, params)

   return {
      fajr: prayerTimes.fajr,
      sunrise: prayerTimes.sunrise,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
   }
}
const today_prayer_list_array = () => {
   return [
      {
         name: "fajr",
         time: config.prayerTimes.today.fajr,
      },
      {
         name: "sunrise",
         time: config.prayerTimes.today.sunrise,
      },
      {
         name: "dhuhr",
         time: config.prayerTimes.today.dhuhr,
      },
      {
         name: "asr",
         time: config.prayerTimes.today.asr,
      },
      {
         name: "maghrib",
         time: config.prayerTimes.today.maghrib,
      },
      {
         name: "isha",
         time: config.prayerTimes.today.isha,
      },
   ]
}
const get_currentPrayer = () => {
   const array = today_prayer_list_array().reverse()

   const prayer = array.find((element) => {
      return element.time <= new Date()
   })

   return (
      prayer || {
         name: "isha_2",
         time: config.prayerTimes.extra.isha,
      }
   )
}
const get_nextPrayer = () => {
   const array = today_prayer_list_array()

   const prayer = array.find((element) => {
      return element.time > new Date()
   })

   return (
      prayer || {
         name: "fajr_2",
         time: config.prayerTimes.extra.fajr,
      }
   )
}
const update_next_and_current_prayer = () => {
   config.prayerTimes.next = get_nextPrayer()
   config.prayerTimes.current = get_currentPrayer()

   const elements = element.prayerTimes.querySelectorAll("article")

   elements.forEach((element) => {
      if (element.getAttribute("selector") !== config.prayerTimes.current.name) {
         element.classList.remove("current") // If dom current prayer isn't current prayer
      }
      if (element.getAttribute("selector") !== config.prayerTimes.next.name) {
         element.classList.remove("next") // If dom next prayer isn't next prayer
      }
   })

   // Add curreny Prayer class
   if (config.prayerTimes.current.name !== "sunrise") {
      // prayer cannot be "sunrise" so skip that
      get_prayerTIme_element(config.prayerTimes.current.name).main.classList.add("current")
   }
   get_prayerTIme_element(config.prayerTimes.next.name).main.classList.add("next")

   if (config.prayerTimes.current.name === "fajr") {
      if (!config.fajrLoaded) {
         // for reload after fajir
         config.fajrLoaded = true
         update_time_database()
      } else {
         update_nextPrayer_time()
      }
   } else {
      update_nextPrayer_time()
      config.fajrLoaded = false
   }
}
const update_nextPrayer_time = () => {
   const diff = check_difference_between_two_time(config.prayerTimes.next.time)
   get_prayerTIme_element(config.prayerTimes.next.name).remain.innerHTML = diff
}

// Update Location
const update_coordinates_config = (latt, long) => {
   config.coordinates.latt = latt
   config.coordinates.long = long
   update_time_database()

   if (latt !== null && long !== null) {
      localStorage.setItem("latt", latt)
      localStorage.setItem("long", long)
   }
}
const update_coordinates_custom = {
   show: () => {
      event.target.classList.toggle("custom_location-active")
   },
   form: () => {
      event.preventDefault()
      event.target.previousElementSibling.classList.remove("custom_location-active")

      const latt = event.target.querySelector('[name="Lattitute"]')
      const long = event.target.querySelector('[name="Longtitute"]')

      update_coordinates_config(latt.value, long.value)
   },
}
const update_coordinates_location = () => {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            // If geolocation track succeed
            update_coordinates_config(position.coords.latitude, position.coords.longitude)
         },
         () => alert("Geolocation service not working.")
      )
   } else alert("Geolocation service not working.")
}
const update_coordinates_ip = async () => {
   try {
      const request = await fetch("https://json.geoiplookup.io")
      if (!request.ok) {
         throw new Error("Oh! No.\nI need internet connection to set up times for your location for the first time.")
      }

      const data = await request.json()
      update_coordinates_config(data.latitude, data.longitude)
   } catch (error) {
      alert(error.message)
   }
}
const set_teatulia = () => {
   update_coordinates_config("22.497906772566186", "89.09805636123112")
}

// More
const sidebar_form_submit = function () {
   event.preventDefault()

   // Check which option is checked
   const madhab_checked = document.querySelector('.madhab input[type="radio"]:checked')
   config.madhab = madhab_checked.value
   localStorage.setItem("madhab", madhab_checked.value)

   // Check which option is checked
   const calculationMethod_checked = document.querySelector('.calculation-method input[type="radio"]:checked')
   config.method = calculationMethod_checked.value
   localStorage.setItem("method", calculationMethod_checked.value)

   update_time_database()
}
const sidebar = {
   show: function () {
      element.sidebar.style.display = "block"
      setTimeout(() => element.sidebar.classList.add("show"), 25)
   },
   hide: function () {
      element.sidebar.classList.remove("show")
      setTimeout(() => element.sidebar.removeAttribute("style"), 300)
   },
}
const fullscreenFn = () => {
   event.preventDefault()

   if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
         document.exitFullscreen()
      } else {
         element.documentHTML.requestFullscreen()
      }
   }
}
const currentPrayer_animation = {
   enable: () => {
      localStorage.setItem("currentPrayerAnimationEnabled", true)
      element.prayerTimes.setAttribute("currentPrayerAnimationEnabled", true)
      element.currentPrayerAnimationControl.innerHTML = "Disable Current Prayer Animation"
   },
   disable: () => {
      localStorage.setItem("currentPrayerAnimationEnabled", "")
      element.prayerTimes.setAttribute("currentPrayerAnimationEnabled", "")
      element.currentPrayerAnimationControl.innerHTML = "Enable Current Prayer Animation"
   },
   toggle: function (event) {
      const attribute = element.prayerTimes.getAttribute("currentPrayerAnimationEnabled")

      if (attribute) this.disable()
      else this.enable()
   },
}
