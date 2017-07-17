
text/x-generic sketch.js ( ASCII C++ program text )

var cnv;
var cnt;
var xml;
var img;
var x_range, y_range;
var title = [];
var thought = [];
var badWords = [];
var step;
var k;
var index;
var t_size;

function preload(){
  xml = loadXML("../xml_test");
  img = loadImage("../image2.jpg");
  badWords = loadStrings("../badWords.txt");
}

function setup() {
  t_size = 24;
  img.loadPixels();
  var channel =  xml.getChildren('channel');
  var items =  channel[0].getChildren('item');
  for (var i = 0; i < items.length; i++) {
   var ttl = items[i].getChild('title');
   title[i] = ttl.getContent();
   //thought[i] = new Thought(title[i],(width - title[i].length*t_size*.6)/2, 200);
   thought[i] = new Thought(title[i],-160,-80);
  }
  cnv = createCanvas(1440,900);
  centerCanvas();
  textSize(t_size);
  textAlign(CENTER);
  fill(100);
  cnt = 0;
  x_range = windowWidth;
  y_range = windowHeight;
  step = 0.0006;
  noiseDetail(8,0.65);
  k = .5;
  index = 0;
}

function draw() {
  background(100);
  image(img,0,0,img.width,img.heigth,0,0,img.width,img.height); 
  cnt += 1;
  textSize(t_size);
  fill(200);
//  for (var j = 0; j < title.length -10; j++) {
//   floating_string(j,title[j]);
//  }
   thought[index].update();
   push();
   translate(750,450);
   for (var j = 0; j < thought.length; j++) {
    if(thought[j].on) {
     textSize(thought[j].size);
     fill(thought[j].c);
     for (var m = 0; m < thought[j].title.length; m++) { 
      push();
      translate(thought[j].x[m],thought[j].y[m]);
      rotate(thought[j].al[m]);
      text(thought[j].title[m],0,0);
      pop();
     }
    }
   }
   pop(); 
}

function floating_string(n, string) {
  var l = string.length;
  t_size = 44 - noise(n*6 + 50 + cnt*.01)*39;
  //var d = l*t_size*.8; //8pt 11px
  var d = l*24;
  //var step = map(l,5,60,0.001,0.0005); //longer titles move slower...
  var x1 = noise(n*7 + 5 + cnt*step)*(x_range - d);
  var y1 = noise(n*2 + 10 + cnt*step)*y_range;
  var a = noise(n*3 + 20 + cnt*step)*PI - HALF_PI;
  var x4 = x1 + d*cos(a);
  var y4 = y1 + d*sin(a);
  var dc = .3*d;
  //var a1c = noise(n*4.000 + 30.000 + cnt*step)*TWO_PI/4 - PI/4;
  var a1c = noise( cnt*step)*TWO_PI/4 - PI/4;
  var a2c = noise(n*5.000 + 40.000 + cnt*step)*TWO_PI/4 - PI/4;
  var x2 = x1 + dc*cos(a1c);
  var y2 = y1 + dc*sin(a1c);
  var x3 = x4 - dc*cos(a + a2c);
  var y3 = y4 + dc*sin(a + a2c);
  var x, y, tx, tyi, alpha, t;
  for(var i = 0; i < l; i++) {
    t = i / l;
    x = bezierPoint(x1,x2,x3,x4,t);
    y = bezierPoint(y1,y2,y3,y4,t);
    tx = bezierTangent(x1,x2,x3,x4,t);
    ty = bezierTangent(y1,y2,y3,y4,t);
    alpha = atan2(ty, tx);
    fill(noise(n*6 + 50 + cnt*0.02)*255);
    textSize(44 - noise(i + 50 + cnt*.01)*39);
    push();
    translate(x,y);
    rotate(alpha);
    text(string[i],0,0);
    pop();
  }
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}
 
function Thought(string,x0,y0) {
 this.title = string;
 var r = [];
 var a = [];
 var b = 0;
 this.al = [];
 this.on = 1;
 this.x1 = [];
 this.y1 = [];
 this.x2 = [];
 this.y2 = [];
 this.x3 = [];
 this.y3 = [];
 this.x4 = [];
 this.y4 = [];
 this.x = [];
 this.y = [];
 this.t = 0.0;
 this.c = [];
 this.d = [];
 this.blood =  checkWord(this.title);
 if (this.blood == 0 ) { this.c = color(0,0,0,120) } else {
   this.c = color(255,0,0,150);
 }
 this.size = t_size;
 
 for (var i = 0; i<this.title.length; i++) {
   //var index;
   r[i] = random(15,120);
   a[i] = TWO_PI*random();
   this.al[i] = TWO_PI*random();
   this.d[i] = this.al[i]/100;
   this.x1[i] = round(r[i]*cos(a[i]));
   this.y1[i] = round(r[i]*sin(a[i]));
   if((this.title[i] == " ")&&(b*1.4*t_size > 350)) {
    b = 0;
    y0 += 1.4*t_size; 
   }  
   this.x4[i] = x0 + b*t_size;
   b += 1;
   this.y4[i] = y0;
   this.x2[i] = this.x1[i] + round(150*random()) -50;
   this.y2[i] = this.y1[i] + round(150*random()) -50;
   this.x3[i] = this.x4[i] + round(150*random()) - 50;
   this.y3[i] = this.y4[i] + round(150*random()) - 50;
   this.x[i] = bezierPoint(this.x1[i],this.x2[i],this.x3[i],this.x4[i],this.t);
   this.y[i] = bezierPoint(this.y1[i],this.y2[i],this.y3[i],this.y4[i],this.t);
   //this.c[i] = findColor(this.x1[i],this.y1[i]);
  // index = 4*((750 + this.x1[i]) + (450 - this.y1[i])*1350);
   //this.c[i] = color(img.pixels[index] ,img.pixels[index+1] ,img.pixels[index+2] );
   //if (this.blood == 0 ) { this.c[i] = color((img.pixels[index] + img.pixels[index+1] + img.pixels[index+2])/3 -80 ) } else {
  }; 

 this.update = function () {
  if (this.t > 1.0)  {
   this.t += .01;
   if (this.t > 2.0) {this.on = 0;return;} else {
    for (var i = 0; i<this.title.length; i++) {
     this.x[i] = this.x[i] + 1 - 2*noise(this.t + 5*index);
     this.y[i] = this.y[i] + 1 - 2*noise(this.t + 3*index) ;
     //this.al[i] += .5*noise(this.t);
     this.c = color(red(this.c),green(this.c),blue(this.c),map(this.t,1,2,250,0));
    }
   }
  } else {
   this.t += .01; 
   this.size=map(this.t,0,1,t_size,1.4*t_size); 
   this.c = color(red(this.c),green(this.c),blue(this.c),map(this.t,0,1,120,250));
   for (var i = 0; i<this.title.length; i++) {
    this.x[i] = bezierPoint(this.x1[i],this.x2[i],this.x3[i],this.x4[i],this.t);
    this.y[i] = bezierPoint(this.y1[i],this.y2[i],this.y3[i],this.y4[i],this.t);
    this.al[i] = this.al[i] - this.d[i];
   };
   }
 };
}

function mouseClicked() {
 
 if(index < thought.length - 1) {thought[index].on = 0; index+=1;};
}

function checkWord(title) {
 title = title.toLowerCase();
 for(var w = 0; w < badWords.length; w++) {
   if(title.indexOf(badWords[w]) != -1) { 
     return 1;
   }
 }
return 0;
}
