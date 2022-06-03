const express = require('express');
const app = express();
app.listen(3000,()=>console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
let coords = [];
app.post('/api',(request, response)=>{
  coords.push({timeStamp:request.body.time,lat:request.body.lat,lon:request.body.lon});
  console.log(coords);
  response.json({
    status:'success',
    latitude:request.body.lat,
    longitude:request.body.lon,
    timestamp:request.body.time,
  });
});

