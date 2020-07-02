const express = require('express');
const Datastore = require('nedb');
const fs=require('fs');

let port = 3000
let app = express();

const database = new Datastore('database.db');
database.loadDatabase();

let server = app.listen(port);

app.use(express.static('public'));

app.use(express.json({limit : '1mb'})); //this protect my server for flooding of huge quantity of data 

app.post('/api',(request, response) => {
      console.log('I got a request')
      console.log(request.body);          //i want receive only the body
  
      const data = request.body; 
      const timestamp = Date.now();
      data.timestamp = timestamp;
  
      database.insert(data);
      console.log(database);
      //questo è quello che torna al client
      response.json({
          status: 'success',
          timestamp:timestamp,
          radius:data._radius,
          angle:data._angle
      });
  });


console.log("My server running at port " + port);




// const express = require('express');
// const Datastore = require('nedb');
// const port = 8001
// //const fs = require('fs');

// const app = express();
// app.listen(port,() => {
//     console.log('sto in ascolto alla porta '+ port)
// }); 

// //app.get('public/index.html');

// // app.get('/',function(req, res) {
// //     res.send('<b>hello world</b>');

// //    //console.log('porcodio');
// //   });

// app.use(express.static('public'))
// app.use(express.json({limit : '1mb'})); //this protect my server for flooding of huge quantity of data 


// const database = new Datastore('database.db');
// database.loadDatabase();

// //app.get('/')

// app.post('/api',(request, response) => {
//     console.log('I got a request')
//     console.log(request.body);          //i want receive only the body

//     const data = request.body; 
//     const timestamp = Date.now();
//     data.timestamp = timestamp;

//     database.insert(data);
//     console.log(database);
//     //questo è quello che torna al client
//     response.json({
//         status: 'success',
//         timestamp:timestamp,
//         latitude:data.lat,
//         longitude:data.lon
//     });
// });

