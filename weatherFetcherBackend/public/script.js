setup();
function setup() {
  getCoords()
  setInterval(getCoords, 5000);  
  const recordBtn = document.querySelector('#record');
  recordBtn.addEventListener('click',recordCoords);  
}

function getCoords() {
  if(!('geolocation' in navigator)) {
    console.log('Geolocation Not Available');
    return;
  }
  const lat = document.querySelector('.lat');
  const lon = document.querySelector('.lon');
  navigator.geolocation.getCurrentPosition(async (position) => {
    lat.textContent = position.coords.latitude;
    lon.textContent = position.coords.longitude;
    const response = await fetch(`/weather/${position.coords.latitude},${position.coords.longitude}`);
    const json = await response.json();
    console.log(json);
  });
}

function recordCoords() {
  if(!('geolocation' in navigator)) {
    console.log('Geolocation Not Available');
    return;
  }
  const caption = document.querySelector('input');
  if(!caption.value){
    caption.value = '';
  }
  navigator.geolocation.getCurrentPosition((position) => {
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
