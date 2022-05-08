const arrayOfObjectSort = (t, e, n) => {
    n ? t.sort((t, n) => (n[e] > t[e] ? 1 : t[e] > n[e] ? -1 : 0)) : t.sort((t, n) => (t[e] > n[e] ? 1 : n[e] > t[e] ? -1 : 0));
  },
  format_time = (t) => {
    let e = t.getHours(),
      r = t.getMinutes(),
      u = e >= 12 ? "PM" : "AM";
    return (e = (e %= 12) || 12) + ":" + (r = r < 10 ? "0" + r : r) + " " + u;
  },
  check_difference_between_two_time = (e, t = new Date()) => {
    const duration = e - t + 10;
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  },
  get_prayerTIme_element = (selector) => {
    const item = element.prayerTimes.querySelector(`[selector="${selector}"]`);

    return {
      main: item,
      label: item.querySelector(".label"),
      name: item.querySelector(".name"),
      time: item.querySelector(".time"),
      remain: item.querySelector(".remain"),
    };
  };
// ----------------------------------------------

const get_prayerTimes = (date = new Date()) => {
  const coordinates = new adhan.Coordinates(config.coordinates.latt, config.coordinates.long);
  const params = adhan.CalculationMethod[config.method]();
  params.madhab = adhan.Madhab[config.madhab];

  const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  const sunnahTimes = new adhan.SunnahTimes(prayerTimes);

  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
    lastThirdNight: sunnahTimes.lastThirdOfTheNight,
    middleNight: sunnahTimes.middleOfTheNight,
  };
};
const get_currentPrayer = () => {
  const array = [
    {
      name: "isha",
      time: config.prayerTimes.today.isha,
    },
    {
      name: "maghrib",
      time: config.prayerTimes.today.maghrib,
    },
    {
      name: "asr",
      time: config.prayerTimes.today.asr,
    },
    {
      name: "dhuhr",
      time: config.prayerTimes.today.dhuhr,
    },
    {
      name: "sunrise",
      time: config.prayerTimes.today.sunrise,
    },
    {
      name: "fajr",
      time: config.prayerTimes.today.fajr,
    },
  ];

  const prayer = array.find((element) => {
    return element.time <= new Date();
  });

  if (prayer) return prayer;
  else {
    return {
      name: "isha_2",
      time: config.prayerTimes.extra.isha,
    };
  }
};
const get_nextPrayer = () => {
  const array = [
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
  ];

  const prayer = array.find((element) => {
    return element.time > new Date();
  });

  if (prayer) return prayer;
  else {
    return {
      name: "fajr_2",
      time: config.prayerTimes.extra.fajr,
    };
  }
};

const update_time_database = () => {
  config.prayerTimes.today = get_prayerTimes(); // Today prayer time updated

  if (config.prayerTimes.today.fajr >= new Date()) {
    // If current time is below than "Fajr" and more than 12:00 AM
    config.prayerTimes.extra = get_prayerTimes(new Date(Date.now() - 86400000));
    config.extraTime_name = "yesterday";
  } else {
    config.prayerTimes.extra = get_prayerTimes(new Date(Date.now() + 86400000));
    config.extraTime_name = "tomorrow";
  }

  update_page();
  update_next_and_current_prayer();
  update_nextPrayer_time();
};
const update_page = () => {
  element.prayerTimes.setAttribute("extraTimes", config.extraTime_name);

  get_prayerTIme_element("fajr").time.innerHTML = format_time(config.prayerTimes.today.fajr);
  get_prayerTIme_element("sunrise").time.innerHTML = format_time(config.prayerTimes.today.sunrise);
  get_prayerTIme_element("dhuhr").time.innerHTML = format_time(config.prayerTimes.today.dhuhr);
  get_prayerTIme_element("asr").time.innerHTML = format_time(config.prayerTimes.today.asr);
  get_prayerTIme_element("maghrib").time.innerHTML = format_time(config.prayerTimes.today.maghrib);
  get_prayerTIme_element("isha").time.innerHTML = format_time(config.prayerTimes.today.isha);

  get_prayerTIme_element("fajr_2").time.innerHTML = format_time(config.prayerTimes.extra.fajr);
  get_prayerTIme_element("sunrise_2").time.innerHTML = format_time(config.prayerTimes.extra.sunrise);
  get_prayerTIme_element("dhuhr_2").time.innerHTML = format_time(config.prayerTimes.extra.dhuhr);
  get_prayerTIme_element("asr_2").time.innerHTML = format_time(config.prayerTimes.extra.asr);
  get_prayerTIme_element("maghrib_2").time.innerHTML = format_time(config.prayerTimes.extra.maghrib);
  get_prayerTIme_element("isha_2").time.innerHTML = format_time(config.prayerTimes.extra.isha);
};
const update_next_and_current_prayer = () => {
  config.prayerTimes.next = get_nextPrayer();
  config.prayerTimes.current = get_currentPrayer();

  const elements = element.prayerTimes.querySelectorAll("article");

  elements.forEach((element) => {
    if (element.getAttribute("selector") !== config.prayerTimes.current.name) {
      element.classList.remove("current");
    }
    if (element.getAttribute("selector") !== config.prayerTimes.next.name) {
      element.classList.remove("next");
    }
  });

  if (config.prayerTimes.current.name !== "sunrise") {
    // prayer cannot be "sunrise" so skip that
    get_prayerTIme_element(config.prayerTimes.current.name).main.classList.add("current");
  }
  get_prayerTIme_element(config.prayerTimes.next.name).main.classList.add("next");

  if (config.prayerTimes.current.name === "fajr") {
    if (!config.fajrLoaded) {
      // for reload after fajir
      config.fajrLoaded = true;
      update_time_database();
    } else {
      update_nextPrayer_time();
    }
  } else {
    update_nextPrayer_time();
    config.fajrLoaded = false;
  }
};
const update_nextPrayer_time = () => {
  const diff = check_difference_between_two_time(config.prayerTimes.next.time);
  get_prayerTIme_element(config.prayerTimes.next.name).remain.innerHTML = diff;
};

const update_coordinates_config = (latt, long) => {
  config.coordinates.latt = latt;
  config.coordinates.long = long;
  localStorage.setItem("latt", latt);
  localStorage.setItem("long", long);
  update_time_database();
};
const update_coordinates_location = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // If geolocation track succeed
        document.body.innerHTML = JSON.stringify(position);
        update_coordinates_config(position.coords.latitude, position.coords.longitude);
      },
      () => alert("Geolocation service not working.")
    );
  } else alert("Geolocation service not working.");
};
const update_coordinates_ip = () => {
  fetch("https://json.geoiplookup.io")
    .then((res) => res.json())
    .then((data) => {
      update_coordinates_config(data.latitude, data.longitude);
    });
};

const set_teatulia = () => {
  update_coordinates_config("22.497906772566186", "89.09805636123112");
};

const sidebar_form_submit = function () {
  event.preventDefault();

  // Check which option is checked
  event.target.querySelectorAll('.madhab input[type="radio"]').forEach((element) => {
    if (element.checked) {
      config.madhab = element.value;
      localStorage.setItem("madhab", element.value);
    }
  });

  // Check which option is checked
  event.target.querySelectorAll('.calculation-method input[type="radio"]').forEach((element) => {
    if (element.checked) {
      config.method = element.value;
      localStorage.setItem("method", element.value);
    }
  });

  update_time_database();
};

const sidebar = {
  show: function () {
    element.sidebar.style.display = "block";
    setTimeout(() => element.sidebar.classList.add("show"), 25);
  },
  hide: function () {
    element.sidebar.classList.remove("show");
    setTimeout(() => element.sidebar.removeAttribute("style"), 300);
  },
};

const fullscreenFn = () => {
  event.preventDefault();

  if (event.altKey) {
    window.open("#", "", "fullscreen=yes, scrollbars=auto");
  } else {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.documentHTML.requestFullscreen();
      }
    }
  }
};

const currentPrayer_animation = {
  enable: () => {
    localStorage.setItem("currentPrayerAnimationEnabled", true);
    element.prayerTimes.setAttribute("currentPrayerAnimationEnabled", true);
    element.currentPrayerAnimationControl.innerHTML = "Disable Current Prayer Animation";
  },
  disable: () => {
    localStorage.setItem("currentPrayerAnimationEnabled", "");
    element.prayerTimes.setAttribute("currentPrayerAnimationEnabled", "");
    element.currentPrayerAnimationControl.innerHTML = "Enable Current Prayer Animation";
  },
  toggle: function (event) {
    const attribute = element.prayerTimes.getAttribute("currentPrayerAnimationEnabled");

    if (attribute) this.disable();
    else this.enable();
  },
};
