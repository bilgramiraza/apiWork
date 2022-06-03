function recordCoords() {
  if('geolocation' in navigator) {
    console.log('Geolocation Available');
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const lat = document.querySelector('.lat');
      const lon = document.querySelector('.lon');
      lat.textContent = position.coords.latitude;
      lon.textContent = position.coords.longitude;
      sendData(position.timestamp,position.coords.latitude,position.coords.longitude);
    });
  } else {
    /* geolocation IS NOT available */
    console.log('Geolocation Not Available');
  } 
}
async function sendData(time,lat,lon) {
  const data = {time,lat,lon};
  const options = {
    method:'POST',
    headers:{
      "Content-Type": 'application/json',
    },
    body:JSON.stringify(data),
  };
  const response = await fetch('/api',options);
  console.log(await response.json());
}
const recordBtn = document.querySelector('#record');
recordBtn.addEventListener('click',recordCoords);