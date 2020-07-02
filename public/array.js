
let coefficients = [] ;

class coefficient {
  constructor(_radius, _angle) {
    this.radius = _radius;
    this.angle = _angle;
  }
}

for(let i=0;i<40;i++){


    let n= i*2 +1;


    let  radius = 50 * (4 / (n*3.14));

    let coef= new coefficient(radius,n);
    coefficients.push(coef);
}

module.exports= coefficients;