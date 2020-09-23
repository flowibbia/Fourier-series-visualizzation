let time  =0;
let coefficients0 = [];  //array for debug

let coefficients = [];   //array to fill from the server or the form

function myFunction(){

  //here i have to get the data from the form
  const data = {  //data for debug
    radius:63,
    angle: 1
   };

  const options={
    method: 'POST',
    headers:{"Content-type": "application/json"},
    body: JSON.stringify(data)
  }

  fetch('/api',options).then(res => {  
    return res.json();
  })
  .then(obj=>{
    appo=obj;
    console.log(appo)})
}

class coefficient {
  constructor(_radius, _angle) {
    this.radius = _radius;
    this.angle = _angle;
  }
}

console.log(appo)

//get coefficient automatically for rectangular impulse and store in the array for debug 
for(let i=0;i<40;i++){

    let n= i*2 +1;
    let  radius = 50 * (4 / (n*3.14));
    let coef= new coefficient(radius,n);

    coefficients0.push(coef);
    
  console.log(coefficients0[i].radius);
}

let wave = [];  //point of the function
let num=10;     //number of coefficient


function setup(){

  let cnv=createCanvas(1000,400);
}

function draw(){

  background(0,10,50);

  translate(200,200);

  let x=0;
  let y=0;

  if(appo!=undefined)
    {
      console.log(appo.radius);
    }

  for(let i=0;i<num;i++){

     let prevx=x;
     let prevy=y;

    x += coefficients0[i].radius *  cos(coefficients0[i].angle*time);  //todo aggiustare l'indice di sfasamento
    y += coefficients0[i].radius *  sin(coefficients0[i].angle*time);

    

    noFill();
    stroke(120);

    ellipse(prevx,prevy,coefficients0[i].radius*2);

    if(i==num-1)
      wave.unshift(y);

   //linea che gira intorno al cerchio
   stroke(255);
   fill(255);
   line(prevx,prevy,x,y);
  }


  //trasla e disegna sinusoide e linea che ci va appresso
  beginShape();
  translate(200,0);
  line(x-200,y,0,y)

  //-200 perchè ho traslato di 200 a destra
  ellipse(0,y,5,5)
  noFill();

  for (let i = 0 ; i < wave.length; i++){
    vertex(i,wave[i]); 
  }
  endShape();
  time+=0.02;

}
