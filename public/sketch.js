// const xhr = new XMLHttpRequest();

// xhr.onload= ()=>{

// }

let time  = 0;
let coefficients = [];   //array to fill from the server or the form

// if (window.performance) {
//   console.info("window.performance works fine on this browser");
// }
//console.info(performance.navigation.type);
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //put the data on the server 
    fetch('/reload')
    .then(res=>{
      return res.json();
    }).then(obj =>{
      time=0;
      coefficients=obj;
    }).catch((err) => {
      console.error(err);
    }) 
} 


//from mdn 
const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', (e) =>{

    e.preventDefault();    //todo rivedere bene questa funzione

    const formData = new FormData(myForm);  //why i don't write this in the argument

    const data={
      amplitude :formData.get('amplitude'),
      frequency :formData.get('frequency')
    }

    //put the data on the server 
    fetch('/form',{
      method: 'POST',
      headers:{"Content-type": "application/json"},
      body : JSON.stringify(data)
    }).then(res=>{
      return res.json();
    }).then(obj =>{
      time=0;
      coefficients.push(obj);
      console.log(obj);
    }).catch((err) => {
      console.error(err);
    }) 
})

function myFunction(){
  //here i have to get the data from the form
  const data = {  //data for debug
    amplitude :63,
    frequency: 1
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
  .catch(err=>{
    console.log(err);
  })
}




let wave = [];  //point of the function
let num=10;     //number of coefficient


function setup(){

  let cnv=createCanvas(1000,600);
  stroke(255);
}

function draw(){

  background(0,10,50);

  //return when coefficients is empty
  if(coefficients.length==0)
    return;

  line(200,300,1000,300);
  translate(200,300);

  let x=0;
  let y=0;

  
  //print for debug todo remove
  // if(coefficients.length!=0){
  //     console.log(coefficients[0]);
  //}

  for(let i=0;i<coefficients.length;i++){  //before was num

     let prevx=x;
     let prevy=y;

    x += coefficients[i].amplitude *  cos(coefficients[i].frequency*time);  
    y += coefficients[i].amplitude *  sin(coefficients[i].frequency*time);

    noFill();
    stroke(120);

    ellipse(prevx,prevy,coefficients[i].amplitude*2);

    if(i==coefficients.length-1)  
      wave.unshift(y);

   //linea che gira intorno al cerchio
   stroke(255);
   fill(255);
   line(prevx,prevy,x,y);
  }


  /*draw the function linking all point of wave[] */
  {
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
  }

  //
  time-=0.02;


  if(wave.length>600){
     wave.pop();
  }

}
