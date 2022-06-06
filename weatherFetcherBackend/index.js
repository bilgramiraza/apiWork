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
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`;//API key removed for safety
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);  
}
