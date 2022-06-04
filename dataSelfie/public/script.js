function setup() {
  const recordBtn = document.querySelector('#record');
  recordBtn.addEventListener('click',recordCoords);  
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320,240);

  function recordCoords() {
    if(!('geolocation' in navigator)) {
      console.log('Geolocation Not Available');
      return;
    }
    const lat = document.querySelector('.lat');
    const lon = document.querySelector('.lon');
    const userName = document.querySelector('input');
    if(!userName.value){
      alert('Please Fill All Inputs before proceding');
      return
    }
    navigator.geolocation.getCurrentPosition((position) => {
      lat.textContent = position.coords.latitude;
      lon.textContent = position.coords.longitude;
      sendData(userName.value,
               position.coords.latitude,
               position.coords.longitude, 
              );
    });
  }
  async function sendData(userName,lat,lon) {
    video.loadPixels();
    const image64 = video.canvas.toDataURL();
    const data = {lat,lon,userName, image64};
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
}