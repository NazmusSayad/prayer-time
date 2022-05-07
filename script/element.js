const element = {
  documentHTML: document.querySelector("html"),
  prayerTimes: document.getElementById("prayerTimes"),
  sidebar: document.getElementById("sidebar"),
  sidebar__form: document.querySelector("#sidebar .sidebar__form"),
  currentPrayerAnimationControl: document.getElementById("currentPrayerAnimationControl"),
};

{
  const method_list = [
    {
      name: "Muslim World League",
      value: "MuslimWorldLeague",
    },
    {
      name: "Egyptian General Authority of Survey",
      value: "Egyptian",
    },
    {
      name: "University of Islamic Sciences, Karachi (default)",
      value: "Karachi",
      default: true,
    },
    {
      name: "Umm al-Qura University, Makkah",
      value: "UmmAlQura",
    },
    {
      name: "Dubai",
      value: "Dubai",
    },
    {
      name: "Moonsighting Committee",
      value: "MoonsightingCommittee",
    },
    {
      name: "ISNA",
      value: "NorthAmerica",
    },
    {
      name: "Kuwait",
      value: "Kuwait",
    },
    {
      name: "Qatar",
      value: "Qatar",
    },
    {
      name: "Singapore",
      value: "Singapore",
    },
    {
      name: "Institute of Geophysics, University of Tehran",
      value: "Tehran",
    },
    {
      name: "Dianet",
      value: "Turkey",
    },
    {
      name: "Other",
      value: "Other",
    },
  ];
  const method__list_container = element.sidebar.querySelector(".calculation-method__list");

  method_list.forEach((item, ind) => {
    const div = document.createElement("div");
    div.classList.add("calculation-method__list--item");
    div.innerHTML = `<input type="radio" name="calculation-method__list--item" id="calculation-method__list--item--radio-${ind}" value="${item.value}" ${
      item.default ? "checked " : ""
    }/><label for="calculation-method__list--item--radio-${ind}">${item.name}</label>`;

    method__list_container.append(div);
  });

  // click on loaded settings
  element.sidebar__form.querySelector(`.madhab .madhab__list--item [value="${config.madhab}"]`).click();
  element.sidebar__form.querySelector(`.calculation-method .calculation-method__list--item [value="${config.method}"]`).click();
}

if (localStorage.getItem("currentPrayerAnimationEnabled") !== "") {
  currentPrayer_animation.enable();
} else {
  currentPrayer_animation.disable();
}
