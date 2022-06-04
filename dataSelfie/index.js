const express = require('express');
const Datastore = require('nedb');

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
    userName:request.body.userName,
    lat:request.body.lat,
    lon:request.body.lon,
    image:request.body.image64,
  };
  database.insert(row);
  response.json({
    status:'success',
    timeStamp:arrivalTime,
    userName:request.body.userName,
    latitude:request.body.lat,
    longitude:request.body.lon,
    image:request.body.image64,
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