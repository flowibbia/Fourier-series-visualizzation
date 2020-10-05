const { response } = require('express');
const express = require('express');
// const fs=require('fs');

let port = 3000;

let app = express();

app.listen(port);

app.use(express.static('public'));

app.use(express.json({limit : '1mb'})); 

class coefficient {
  constructor(_amplitude, _frequency) {
    this.amplitude = _amplitude;
    this.frequency = _frequency;
  }
}


let rect_coefficients= [];
let triang_coefficients=[];

//fill vectors with appropriate coefficient 
for(let i=0;i<15;i++){

    let n= i*2 +1;
    let  amplitude = 100 * (4 / (n*3.14));

    let rect_coef = new coefficient(amplitude,n);
    rect_coefficients.push(rect_coef);

    amplitude = 30*((16/(3.14))*((-1)**((n-1)/2))/(n**2));
    triang_coef = new coefficient(amplitude,n);
    triang_coefficients.push(triang_coef);
    
}


let coefficients= []; 


app.get("/reset",(req,res)=>{
  //delete coefficient and response with empty array
  coefficients = [];
  res.json(coefficients);
})

app.get("/reload",(req,res)=>{
  //response with array saved in server
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
  coefficients=[];
  res.json(rect_coefficients);
})

app.get('/triangular',(req,res) =>{
  console.log('I got a triangular request') 
  coefficients=[];
  res.json(triang_coefficients);
})

console.log("My server running at port " + port);