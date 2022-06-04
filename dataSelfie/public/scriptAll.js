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
    for(element in item){//Create Element Rows
      const tableElement = document.createElement('td');
      tableElement.textContent = item[element];
      root.append(tableElement);
    }
    tableRoot.append(root);
  }  
}