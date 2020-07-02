let time  =0;

//let coefficients= require('./array');

// console.log(coefficients[0]);
// console.log(coefficients[1]);


//let n= 1;

let wave = [];

function setup(){

  let cnv=createCanvas(1000,400);
    //cnv.position(0,0);
  //createCanvas(600, 400);

  // let slider = createSlider(1, 100, 1, 1);
  // slider.position(0,420);
}

function draw(){

  background(0);

  translate(200,200);

  let x=0;
  let y=0;

  
  for(let i=0;i<40;i++){

    let prevx=x;
    let prevy=y;

    let n= i*2 +1;

    let  radius = 50 * (4 / (n*PI));

    x += radius *  cos(n*time);
    y += radius *  sin(n*time);

    noFill();
    stroke(120);

    ellipse(prevx,prevy,radius*2);

    if(i==39)
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
  time+=0.005;

}

