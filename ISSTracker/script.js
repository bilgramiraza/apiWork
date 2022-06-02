async function fetchISSLocation(){
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  const {latitude, longitude} = data;
  console.log(latitude, longitude);
}
fetchISSLocation();