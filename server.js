const { response } = require('express');
const express = require('express');
// const fs=require('fs');

let port = 4000;

let app = express();

// let radius = [];
// let angle  = [];


// let server = 
app.listen(port);

app.use(express.static('public'));

app.use(express.json({limit : '1mb'})); //this protect my server for flooding of huge quantity of data 

class coefficient {
  constructor(_amplitude, _frequency) {
    this.amplitude = _amplitude;
    this.frequency = _frequency;
  }
}

let rect_coefficients= [];
for(let i=0;i<40;i++){

    let n= i*2 +1;

    let  _amplitude = 50 * (4 / (n*3.14));

    let coef = new coefficient(_amplitude,n);
    rect_coefficients.push(coef);
}

let coefficients= []; 

app.post("/reset", (request,response) => {
  coefficients = [];
});

app.get("/reload",(req,res)=>{
  res.json(coefficients);
})

app.post('/form',(request,response)=>{
  console.log('I got a form request');

  coefficients.push(request.body);
  console.log(coefficients[coefficients.length-1]);

  response.json({
    status: 'success',
    amplitude: coefficients[coefficients.length-1].amplitude,
    frequency: coefficients[coefficients.length-1].frequency 
  });
});

app.get('/rectangular',(req,res)=>{
  console.log('I got a rectangular request')
  res.json(rect_coefficients);
})

console.log("My server running at port " + port);