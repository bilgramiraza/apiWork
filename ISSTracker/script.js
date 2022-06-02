async function fetchISSLocation(){
  console.log('loading Data');
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  const {latitude, longitude} = data;
  return data;
}
const reloadBtn = document.querySelector('#reload');
reloadBtn.addEventListener('click',async ()=>{
  const {latitude, longitude} = await fetchISSLocation();
  const latDOM = document.querySelector('#lat');
  const lonDOM = document.querySelector('#lon');
  latDOM.textContent = latitude;
  lonDOM.textContent = longitude;
});