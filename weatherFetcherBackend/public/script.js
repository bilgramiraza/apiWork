const recordBtn = document.querySelector('#record');
recordBtn.addEventListener('click',recordCoords);  

function recordCoords() {
  if(!('geolocation' in navigator)) {
    console.log('Geolocation Not Available');
    return;
  }
  const lat = document.querySelector('.lat');
  const lon = document.querySelector('.lon');
  const caption = document.querySelector('input');
  if(!caption.value){
    caption.value = '';
  }
  navigator.geolocation.getCurrentPosition((position) => {
    lat.textContent = position.coords.latitude;
    lon.textContent = position.coords.longitude;
    sendData(caption.value,
              position.coords.latitude,
              position.coords.longitude, 
            );
  });
}
async function sendData(caption,lat,lon) {
  const data = {lat,lon,caption};
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
