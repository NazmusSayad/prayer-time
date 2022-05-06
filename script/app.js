(() => {
  if (config.coordinates.latt && config.coordinates.long) {
    // If coordinates are already exists
    update_time_database();
  } else {
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
  }
})();

window.addEventListener("dblclick", () => {
  event.preventDefault();
  if (document.fullscreenEnabled) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.querySelector("html").requestFullscreen();
    }
  }
});
window.addEventListener("contextmenu", () => {
  event.preventDefault();
  sidebar.show();
});
