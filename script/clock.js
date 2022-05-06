{
  let currentDate, sec, min, hou, ampm;

  const fix = (input) => {
    return input < 10 ? "0" + input : String(input);
  };
  const updateSec = (date) => {
    sec = date.getSeconds();
    time_s.textContent = fix(sec);

    if (config.prayerTimes.next) {
      update_nextPrayer_time();
    }
  };
  const updateMin = (date) => {
    min = date.getMinutes();
    time_m.textContent = fix(min);
    update_next_and_current_prayer();
  };
  const updateHou = (date) => {
    hou = date.getHours();
    if (!hou) {
      updateDate(date);
    }
    ampm = hou >= 12 ? "PM" : "AM";
    hou = hou % 12;
    hou = hou ? hou : 12;
    time_h.textContent = fix(hou);
    time_t.textContent = ampm;
  };
  const updateDate = (date) => {
    date_all.textContent = date.toLocaleString("en-US", {
      day: "2-digit",
      year: "numeric",
      month: "long",
      weekday: "long",
    });

    update_time_database();
  };
  const setfirstDate = () => {
    const dateWhenLoad = new Date();
    updateSec(dateWhenLoad);
    updateMin(dateWhenLoad);
    updateHou(dateWhenLoad);
    updateDate(dateWhenLoad);
  };
  const startClock = () => {
    currentDate = new Date();
    updateSec(currentDate);
    if (!sec) {
      updateMin(currentDate);

      if (!min) {
        updateHou(currentDate);
      }
    }
  };

  const time_h = document.querySelector("#clock .time_h"),
    time_m = document.querySelector("#clock .time_m"),
    time_s = document.querySelector("#clock .time_s"),
    time_t = document.querySelector("#clock .time_t"),
    date_all = document.querySelector("#clock .date");

  setfirstDate();

  const loadInterval = window.setInterval(() => {
    if (!Math.round(new Date().getMilliseconds() / 100)) {
      window.clearInterval(loadInterval);
      startClock();
      setInterval(() => {
        startClock();
      }, 1000);
    }
  }, 1);
}
