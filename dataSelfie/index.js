const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000,()=>console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api',(request, response)=>{
  let coords = {
    timeStamp:Date.now(),
    requestTimeStamp:request.body.time,
    lat:request.body.lat,
    lon:request.body.lon
  };
  database.insert(coords);
  response.json({
    status:'success',
    latitude:request.body.lat,
    longitude:request.body.lon,
    timestamp:request.body.time,
  });
});

