let time  =0;

let coefficients = [];

class coefficient {
  constructor(_radius, _angle) {
    this.radius = _radius;
    this.angle = _angle;
  }
}


//get coefficient automatically for rectangular impulse
for(let i=0;i<40;i++){

    let n= i*2 +1;
    let  radius = 50 * (4 / (n*3.14));
    let coef= new coefficient(radius,n);

    coefficients.push(coef);
    
  console.log(coefficients[i].radius);
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

  for(let i=0;i<num;i++){

     let prevx=x;
     let prevy=y;

    // let n= i*2 +1;

    // let  radius = 50 * (4 / (n*PI));

    x += coefficients[i].radius *  cos((i*2+1)*time);  //todo aggiustare l'indice di sfasamento
    y += coefficients[i].radius *  sin((i*2+1)*time);

    noFill();
    stroke(120);

    ellipse(prevx,prevy,coefficients[i].radius*2);

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
  time+=0.05;

}
