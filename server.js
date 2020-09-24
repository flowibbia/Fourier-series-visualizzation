const express = require('express');
const fs=require('fs');

let port = 3000
let app = express();

let radius = [];
let angle  = [];


// let server = 
app.listen(port);

app.use(express.static('public'));

app.use(express.json({limit : '1mb'})); //this protect my server for flooding of huge quantity of data 

//todo, check this
app.get('/coefficient',(request,response) => {
    console.log('I got a request for coefficient');
    let res=response.json({
        status: 'success',
        radius: 1,
        angle: 1
    });

    console.log(res);

});

app.post('/api',(request,response) =>{

  console.log('I got a request');
  console.log(request.body);

 // console.log(radius[0]);
  radius[0]=request.body.radius;
  angle[0]= request.body.angle;
  //console.log(radius[0]);
  //console.log(angle[0]);
  //console.log(request.body);
  response.json({
    status: 'success',
    radius: radius[0],
    angle: angle[0] 
  });
})



app.post('/form',(request,response)=>{
  console.log('I got a form request');
  console.log(request.body);

 // console.log(radius[0]);
  radius[0]=request.body.radius;
  angle[0]= request.body.angle;
  //console.log(radius[0]);
  //console.log(angle[0]);
  //console.log(request.body);
  response.json({
    status: 'success',
    radius: radius[0],
    angle: angle[0] 
  });
})


console.log("My server running at port " + port);

class coefficient {
  constructor(_amplitude, _phase) {
    this.radius = _amplitude;
    this.angle = _phase;
  }
}

let rect_coefficients= []
for(let i=0;i<40;i++){


    let n= i*2 +1;

    let  _amplitude = 50 * (4 / (n*3.14));

    let coef = new coefficient(_amplitude,n);
    rect_coefficients.push(coef);
}

app.get('/rectangular',(req,res)=>{
  console.log('I got a rectangular request')
  res.json(rect_coefficients);
})

