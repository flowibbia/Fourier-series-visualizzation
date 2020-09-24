const xhr = new XMLHttpRequest();

xhr.onload= ()=>{

}

let time  =0;
let coefficients0 = [];  //array for debug

class coefficient {
  constructor(_radius, _angle) {
    this.radius = _radius;
    this.angle = _angle;
  }
}

//get coefficient automatically for rectangular impulse and store in the array for debug 
for(let i=0;i<40;i++){

    let n= i*2 +1;
    let  radius = 50 * (4 / (n*3.14));
    let coef= new coefficient(radius,n);

    coefficients0.push(coef);
    
}

let coefficients = [];   //array to fill from the server or the form


//from mdn 
const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', (e) =>{

    e.preventDefault();    //todo rivedere bene questa funzione

    const formData = new FormData(myForm);  //why i don't write this in the arcument

    const data={
      radius:formData.get('Xn'),
      angle:formData.get('angle')
    }

    console.log(data.angle);

    fetch('/form',{
      method: 'POST',
      headers:{"Content-type": "application/json"},
      body : JSON.stringify(data)
    }).then(res=>{
      return res.json();
    }).then(obj =>{
      time=0;
      coefficients.push(obj)
    }).catch((err) => {
      console.error(err);
    }) 
})

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
    coefficients.push(obj);
    //coefficients[0]
    // console.log(coefficients[])
  })
}

function rectangular(){
  fetch('/rectangular')
  .then(res =>{
    console.log('Igot a rectangular request')
    return res.json();
  }).then(obj =>{
    //console.log(obj);
    time=0;
    coefficients=obj;      //todo, check this
    //console.log(coefficients)
    console.log(coefficients[0]);
    console.log(coefficients[1]);
  })
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

  //print for debug todo remove
  // if(coefficients.length!=0){
  //     console.log(coefficients[0]);
  //}

  for(let i=0;i<coefficients.length;i++){  //before was num

     let prevx=x;
     let prevy=y;

    x += coefficients[i].radius *  cos(coefficients0[i].angle*time);  
    y += coefficients[i].radius *  sin(coefficients0[i].angle*time);


    noFill();
    stroke(120);

    ellipse(prevx,prevy,coefficients[i].radius*2);

    if(i==coefficients.length-1)  //memorizzo in un array i valori del sin
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

  for (let i = 0 ; i < wave.length; i++){   //disegno di tutta l'onda
    vertex(i,wave[i]); 
  }
  endShape();
  time-=0.02;

  // if(wave.length>600){
  //   wave.pop();
  // }

}
