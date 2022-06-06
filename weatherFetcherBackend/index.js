const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();
app.listen(3000,()=>console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api',(request, response)=>{
  arrivalTime = Date.now();
  let row = {
    timeStamp:arrivalTime,
    caption:request.body.caption,
    lat:request.body.lat,
    lon:request.body.lon,
  };
  database.insert(row);
  response.json({
    status:'success',
    timeStamp:arrivalTime,
    caption:request.body.caption,
    latitude:request.body.lat,
    longitude:request.body.lon,
  });
});

app.get('/api',(request, response)=>{
  database.find({},(error, data)=>{
    if(error){
      console.log(error);
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get('/weather/:coords',openWeatherAPI);
async function openWeatherAPI( request, response) {
  const [lat,lon] = request.params.coords.split(',');
  //API KEY REMOVED. Add before compiling
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const aqiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const weatherResponse = await fetch(weatherUrl);
  const aqiResponse = await fetch(aqiUrl);
  const weatherData = await weatherResponse.json();
  const aqiData = await aqiResponse.json();
  let aqi = '';
  switch (aqiData.list[0].main.aqi) {
    case 1:aqi = 'Good';
      break;
    case 2:aqi = 'Fair';
      break;
    case 3:aqi = 'Moderate';
      break;
    case 4:aqi = 'Poor';
      break;
    case 5:aqi = 'Very Poor';
      break;
  }
  const lastUpdatedTime =new Date(aqiData.list[0].dt*1000).toUTCString();
  const data = {
    temp:weatherData.main.temp,
    tempMin:weatherData.main.temp_min,
    tempMax:weatherData.main.temp_max,
    lastUpdatedTime:lastUpdatedTime,
    aqi:aqi,
    pm25:aqiData.list[0].components.pm2_5,
    pm10:aqiData.list[0].components.pm10,
  };
  response.json(data);  
}
