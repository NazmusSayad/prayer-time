(() => {
  if (config.coordinates.latt && config.coordinates.long) update_time_database(); // If coordinates are already exists
  else {
    // basically when first time using
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //If Geolocation works
          update_coordinates_config(position.coords.latitude, position.coords.longitude);
        },
        () => {
          //If Geolocation fail
          update_coordinates_ip();
        }
      );
    } else update_coordinates_ip(); // If Geolocation not supported
  }
})();

window.addEventListener("dblclick", fullscreenFn);

window.addEventListener("click", (event) => {
  if (event.ctrlKey) {
    element.documentHTML.classList.toggle("cursorHide");
  }
});

window.addEventListener("resize", () => {
  if (window.innerHeight === screen.height) {
    element.documentHTML.classList.add("cursorHide");
  } else {
    element.documentHTML.classList.remove("cursorHide");
  }
});

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  sidebar.show();
});
