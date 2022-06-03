if('geolocation' in navigator) {
  console.log('Geolocation Available');
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    const lat = document.querySelector('.lat');
    const lon = document.querySelector('.lon');
    lat.textContent = position.coords.latitude;
    lon.textContent = position.coords.longitude;
  });
} else {
  /* geolocation IS NOT available */
  console.log('Geolocation Not Available');
}