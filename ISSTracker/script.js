async function fetchISSLocation(){
  console.log('loading Data');
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  const {latitude, longitude} = data;
  return data;
}
function ISSmap() {
  const myMap = L.map('ISSmap').setView([0,0], 1);
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileURL, {attribution});
  tiles.addTo(myMap);
  const issIcon = L.icon({
      iconUrl: 'iss.png',
      iconSize: [50, 32],
      iconAnchor: [25, 16],
  });
  return [L.marker([0,0], {icon:issIcon}).addTo(myMap), myMap];
}
async function updateMarker(){
  const {latitude, longitude} = await fetchISSLocation();
  const latDOM = document.querySelector('#lat');
  const lonDOM = document.querySelector('#lon');
  latDOM.textContent = latitude.toFixed(2);
  lonDOM.textContent = longitude.toFixed(2);
  marker.setLatLng([latitude, longitude]);
  myMap.setView([latitude, longitude], 5);
}
const reloadBtn = document.querySelector('#reload');
const [marker, myMap] = ISSmap();
updateMarker();
setInterval(updateMarker, 10000);
reloadBtn.addEventListener('click',updateMarker);
