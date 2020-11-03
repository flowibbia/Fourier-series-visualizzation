let time = 0;
let coefficients = []; //array to fill from the server with form

let wave = []; //array of point of the function that will interpolate with vertex

//if the page is reloaded, get coefficients from the server
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {

  fetch("/reload")
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      time = 0;
      coefficients = obj;
    })
    .catch((err) => {
      console.error(err);
    });
}

//get the form with Id
const myForm = document.getElementById("myForm");

myForm.addEventListener("submit", (e) => {

  //Cancels the event to send data
  e.preventDefault(); 

  const formData = new FormData(myForm);

  const data = {
    amplitude: formData.get("amplitude"),
    nth: formData.get("nth"),
  };

  //put the data on the server
  fetch("/form", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      time = 0;
      coefficients.push(obj);
      console.log(obj);
    })
    .catch((err) => {
      console.error(err);
    });




});


function rectangular() {
  fetch("/rectangular")
    .then((res) => {
      console.log("I got a rectangular request");
      return res.json();
    })
    .then((obj) => {
      time = 0;
      coefficients = obj;
    })
    .catch((err) => {
      console.log(err);
    });
}

//get a triangular request from the server
function triangular() {
  fetch("/triangular")
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      time = 0;
      coefficients = obj;
    })
    .catch((err) => {
      console.log(err);
    });
}

//clear the coefficient entered both in the client and in the server
function reset() {
  fetch("/reset")
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      //reset time and point of the function
      time = 0;
      wave = [];
      coefficients = obj;
    })
    .catch((err) => {
      console.log(err);
    });

  // const xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState == 4) {
  //     xhr.status == 200 ? console.log(xhr.responseText) : console.error('error');
  //     time=0;
  //     wave=[];
  //     coefficients = JSON.parse(xhr.responseText);
  //     console.log();
  //   }
  // }
  // xhr.open('GET', '/reset');
  // xhr.send();

}

//initial environment, is called when the program starts
function setup() {

  createCanvas(1200, 600);
  stroke(127, 127, 127);

}

//the function is called in loop and draw the sketch.
//the framerate is 60 frame per second 
function draw() {
  background(0, 10, 40);

  //return when coefficients is empty
  if (coefficients.length == 0) return;

  //draw x axis
  line(200, 300, 1000, 300);
  //translate the cordinates
  translate(300, 300);

  //center of the 1-th circle
  let x = 0;
  let y = 0;

  for (let i = 0; i < coefficients.length; i++) {

    //save the cordinates of the center of the (i-1)-th circle that will update for the i-th circle
    let prevx = x;
    let prevy = y;

    //calculate the center of the (i+1)-th circle
    x += coefficients[i].amplitude * cos(coefficients[i].nth * time);
    y += coefficients[i].amplitude * sin(coefficients[i].nth * time);

    noFill();
    stroke(120);

    ellipse(prevx, prevy, coefficients[i].amplitude * 2);

    //save the point of the latest circle in the beginning of array
    if (i == coefficients.length - 1) 
      wave.unshift(y); 

    
    stroke(255);
    //  fill(255);
    line(prevx, prevy, x, y);
  }

  /*draw the function linking all point of wave[] */
  {
    beginShape();
    translate(200, 0);
    line(x - 200, y, 0, y);

    ellipse(0, y, 5, 5);

    for (let i = 0; i < wave.length; i++) 
      vertex(i, wave[i]);
    
    endShape();
  }

  //increment time for the next loop
  time -= 0.02;

  //remove point too old
  if (wave.length > 600) {
    wave.pop();
  }
}
