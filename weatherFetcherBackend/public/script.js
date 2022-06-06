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
  navigator.geolocation.getCurrentPosition(async (position) => {
    const weatherResponse = await fetch(`/weather/${position.coords.latitude},${position.coords.longitude}`);
    const weatherData = await weatherResponse.json();
    displayData(weatherData, position);
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

function displayData(weatherData, position){
  const latDOM = document.querySelector('.lat');
  const lonDOM = document.querySelector('.lon');
  const tempDOM = document.querySelector('.temp');
  const tempMaxDOM = document.querySelector('.tempMax');
  const tempMinDOM = document.querySelector('.tempMin');
  const aqiDOM = document.querySelector('.aqi');
  const pm2_5DOM = document.querySelector('.pm25');
  const pm10DOM = document.querySelector('.pm10');
  const timeStampDOM = document.querySelector('.timeStamp');

  latDOM.textContent = position.coords.latitude.toFixed(2);
  lonDOM.textContent = position.coords.longitude.toFixed(2);
  tempDOM.textContent = weatherData.temp;
  tempMaxDOM.textContent = weatherData.tempMax;
  tempMinDOM.textContent = weatherData.tempMin;
  aqiDOM.textContent=weatherData.aqi;
  pm2_5DOM.textContent=weatherData.pm25;
  pm10DOM.textContent=weatherData.pm10;
  timeStampDOM.textContent=weatherData.lastUpdatedTime;
}