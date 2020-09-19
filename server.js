const express = require('express');
const fs=require('fs');

let port = 3000
let app = express();
let coefficients   = [];
let raggio = [];
let angle  = [];


let server = app.listen(port);

app.use(express.static('public'));

app.use(express.json({limit : '1mb'})); //this protect my server for flooding of huge quantity of data 


//todo, check this
app.post('/coefficient',(request,response) => {
    console.log('I got a request for coefficient');

    response.json({
        status: 'success',
        radius: data.radius,
        angle: data.angle
    });

});

console.log("My server running at port " + port);


class coefficient {
  constructor(_amplitude, _phase) {
    this.amplitude = _amplitude;
    this.phase = _phase;
  }
}

for(let i=0;i<40;i++){


    let n= i*2 +1;

    let  _amplitude = 50 * (4 / (n*3.14));

    let coef = new coefficient(_amplitude,n);
    coefficients.push(coef);
}

//module.exports= coefficients
module.export = coefficients;


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

