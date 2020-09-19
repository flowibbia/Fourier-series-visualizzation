let time  =0;

let wave = []; 
let coefficient = require("../server")
//this comment was good
// let coefficients = [] ;

// class coefficient {
//   constructor(_amplitude, _phase) {
//     this.amplitude= _amplitude;
//     this.phase= _phase;
//   }
// }

// for(let i=0;i<40;i++){


//     let n= i*2 +1;


//     let _amplitude =  50 * (4 / (n*3.14));

//     let coef= new coefficient(_amplitude,n);
//     coefficients.push(coef);
// }


an.push(4/3.14);
an.push(0);
an.push(4/(3*3.14));
bn.push(0);

function setup(){

  let cnv=createCanvas(1000,400);
    //cnv.position(0,0);
  //createCanvas(600, 400);

}

function draw(){

  background(0);

  translate(200,200);

  let x=0;
  let y=0;
  
  for(let i=0;i < coefficients.length; i++){

    let prevx = x;
    let prevy = y;
    //let n= i*2 +1;

    // let  radius = 50 * (4 / (n*PI));
    let  radius = coefficients[i].amplitude;

    //get cordinate for the end of the line
    x += radius *  cos((i+1)*time);
    y += radius *  sin((i+1)*time);

    noFill();
    stroke(120);

    ellipse(prevx,prevy,radius*2);

    if(i==coefficients.length-1){
      wave.unshift(y);
    }
  
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

  //remove the last element when 
  if(wave.length > 600){
    wave.pop();
  }
}

