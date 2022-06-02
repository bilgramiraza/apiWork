chartIt();
async function chartIt(){
  const data = await getData();
  console.log('About to fetch');
  const ctx = document.querySelector('#chart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: data.xs,
          datasets: [{
              label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C',
              data: data.ys,
              backgroundColor: ['rgba(255, 99, 132, 0.2)',],
              borderColor: ['rgba(255, 99, 132, 1)',],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: false,
              }
          }
      }
    });
}
async function getData(){
  const xs = [];
  const ys = [];
  const response = await fetch('weatherData.csv');
  const data = await response.text();
  const table = data.split('\n').slice(1);
  table.forEach(row =>{
    const column = row.split(',');
    const year = column[0];
    const temp = column[1];
    xs.push(parseFloat(year));
    ys.push(parseFloat(temp)+14);
    console.table(year,temp);
  });
  return {xs,ys};
};