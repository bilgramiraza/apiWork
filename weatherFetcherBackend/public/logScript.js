async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  createTable(data);
}
const reloadBtn = document.querySelector('#getData');
reloadBtn.addEventListener('click',getData);

function createTable(data) {
  const tableRoot = document.querySelector('table');
  const headerRoot = document.createElement('tr');//Create Header Row
  const timeStampHeading = document.createElement('th');
  const captionHeading = document.createElement('th');
  const latHeading = document.createElement('th');
  const lonHeading = document.createElement('th');
  timeStampHeading.textContent = 'Time';
  captionHeading.textContent = 'Caption';
  latHeading.textContent = 'Latitude';
  lonHeading.textContent = 'Longitude';
  headerRoot.append(timeStampHeading, captionHeading, latHeading, lonHeading);
  tableRoot.append(headerRoot);

  for(item of data){
    console.log(item);
    const root = document.createElement('tr');
    const timeStamp = document.createElement('td');
    const caption = document.createElement('td');
    const lat = document.createElement('td');
    const lon = document.createElement('td');
    timeStamp.textContent = new Date(item.timeStamp).toLocaleString();
    caption.textContent = item.caption;
    lat.textContent = item.lat;
    lon.textContent = item.lon;
    root.append(timeStamp, caption, lat, lon);
    
    tableRoot.append(root);
  }  
}