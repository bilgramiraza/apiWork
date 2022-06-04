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
  for(heading of Object.keys(data[0])){
    const tableHeading = document.createElement('th');
    tableHeading.textContent = heading;
    headerRoot.append(tableHeading);
  }
  tableRoot.append(headerRoot);

  for(item of data){
    console.log(item);
    const root = document.createElement('tr');
    const timeStamp = document.createElement('td');
    const userName = document.createElement('td');
    const lat = document.createElement('td');
    const lon = document.createElement('td');
    const id = document.createElement('td');
    timeStamp.textContent = new Date(item.timeStamp).toLocaleString();
    userName.textContent = item.userName;
    lat.textContent = item.lat;
    lon.textContent = item.lon;
    id.textContent = item._id;
    root.append(timeStamp, userName, lat, lon, id);
    
    tableRoot.append(root);
  }  
}