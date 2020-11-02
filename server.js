const express = require('express');

let port = 3000;
let app = express();

app.listen(port,()=>{
  console.log("listen on port "+ port)
});

//serve static files in the root address
app.use(express.static('public'));

//use json middleware
app.use(express.json());

 //data structure for coefficient
class coefficient {
  constructor(_amplitude, _nth) {
    this.amplitude = _amplitude;
    this.nth = _nth;
  }
}
app.get("/",(req,res)=>{
  console.log(req);

})

//
let rect_coefficients = [];
let triang_coefficients = [];

//fill vectors with appropriate coefficient for rectangular and triangular wave
for (let i = 0; i < 15; i++) {
  let n = i * 2 + 1;
  let amplitude = 100 * (4 / (n * 3.14));

  let rect_coef = new coefficient(amplitude, n);
  rect_coefficients.push(rect_coef);

  amplitude = 30 * ((16 / (3.14)) * ((-1) ** ((n - 1) / 2)) / (n ** 2));
  triang_coef = new coefficient(amplitude, n);
  triang_coefficients.push(triang_coef);
}

//array for save form data
let coefficients = [];

app.get("/reset", (req, res) => {
  //delete coefficient and response with empty array
  coefficients = [];
  res.json(coefficients);
})

app.get("/reload", (req, res) => {
  //response with array saved in server
  res.json(coefficients);
})

//manage form post request
app.post('/form', (request, response) => {

  console.log('I got a form request');
  coefficients.push(request.body);
  console.log(coefficients[coefficients.length - 1]);

  response.json({
    status: 'success',
    amplitude: coefficients[coefficients.length - 1].amplitude,
    nth : coefficients[coefficients.length - 1].nth
  });
});

//response for rectangular wave request
app.get('/rectangular', (req, res) => {
  console.log('I got a rectangular request')
  coefficients = [];
  res.json(rect_coefficients);
})

//response for triangular wave request
app.get('/triangular', (req, res) => {
  console.log('I got a triangular request')
  coefficients = [];
  res.json(triang_coefficients);
}) 

