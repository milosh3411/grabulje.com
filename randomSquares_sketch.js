
text/x-generic sketch.js ( ASCII text )

var counter;
var rowLength;
var age;
var i,j;
var a; //square size
var g; //gap ratio
var v; //variation in size
var d; //distortion
var l; //leading space

function setup() {
createCanvas(windowWidth,windowHeight);
background(255);
noFill();
strokeWeight(.6);
textSize(32);
//noLoop();
counter = 0;
rowLength = 73;
age = 3;
i = 0;
j = 0;
a = 10;
g = 1.3 * a;
v = 0.7 * a;
d = 0.1 * a;
l = 0;
}

function draw() {
a = round(random(5,20));
var s = map(a,5,20,15,200);
g = random(.9,1.1) * 12;
v = 0.1 * a;
d = 0.1 * a;

if (counter <= age*365) {
  counter = counter + 1;
  var mod = counter%rowLength;
  if (mod == 1) {
    i = 0;
    j = j + 1;
    l = int(random(2*a));
    
  } else {
    i = i + 1;
  }
  //noStroke();
  //fill(255);
  //rect(windowWidth/2 - 10,windowHeight/2-30,40,30)
  //fill(0);
  //text(floor(counter/365),windowWidth/2,windowHeight/2);
  //fill(int(random(255)),int(random(255)),int(random(255)));
  
  stroke(0,s);
  noFill(100);
  b_square2(windowWidth/2 - 36*g  + i*g,2*windowHeight/3 - j * g,a,v,d);
  }
}


function b_square2(x,y,a,pa,pc) {
  //x,y - lower left corner coordinates
  var p1 = r(pa);
  var p2 = r(pa);
  var p3 = r(pa);
  var p4 = r(pa);
  var p5 = r(pa);
  var p6 = r(pa);
  var p7 = r(pa);
  var p8 = r(pa);
  beginShape();
  vertex(x + p1,y + p2);
  bezierVertex(x + p1 + r(pc),y + p2 + r(pc),x + p3 + r(pc),y - a + p4 + r(pc),x + p3,y - a + p4);
  bezierVertex(x + p3 + r(pc),y - a + p4 + r(pc),x + a + p5 + r(pc),y - a + p6 + r(pc),x + a + p5,y - a + p6);
  bezierVertex(x + a + p5 + r(pc),y - a + p6 + r(pc),x + a + p7 + r(pc),y + p8 + r(pc),x + a + p7,y + p8);
  bezierVertex(x + a + p7 + r(pc),y + p8 + r(pc),x + p1 + r(pc),y + p2 + r(pc),x + p1,y + p2);
  endShape();
}

function r(p) {
  return round(random(-p,p));
}
