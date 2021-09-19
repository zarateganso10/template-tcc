// const canvas = d3.select(".canvas");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const sizeWidth = innerWidth - 100;

canvas.width  = innerWidth;
canvas.height = innerHeight;

// const line1 = 50;
// const diferenceBetweenLines = 50;
// const checkpointSize = 20;
// const diference = checkpointSize/2;


// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();

// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;

function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createLines(){
  ctx.fillText("P1", 50, 100);
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(sizeWidth, 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 150);
  ctx.lineTo(sizeWidth, 150);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(sizeWidth, 200);
  ctx.stroke();
}

function createCheckpoint(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, 20, 20);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function createActionLine(x) {
  ctx.beginPath();
  ctx.moveTo(100, 150);
  ctx.lineTo(x, 150);
  ctx.strokeStyle = '#00c800';
  ctx.stroke();
}

function initTemplate() {
  createLines()
}

function main() {
  clean()
  initTemplate();
  setInterval(draw, 100);
}

var x = 100

function draw() {
  
  // createCheckpoint(x, 90)
  if(x <= sizeWidth){
    createActionLine(x);
    x = x + 50;
  }
  
}



main();


// class Line {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }

//   draw() {
//     ctx.beginPath();
//     ctx.moveTo(100, 0);
//     ctx.lineTo(100, 150);
//     ctx.stroke();
//   }
// }

// const line = new Line(20,20)
// line.draw()

// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function draw() {
//     ctx.canvas.width  = window.innerWidth;
//     ctx.canvas.height = window.innerHeight;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     x += dx;
// }

// setInterval(draw, 10);

// const svg = canvas.append("svg");

// function initTemplate(numberLines) {
//   for(let i = 0; i < numberLines; i++){
//     svg.append("text").attr("x", "0")
//       .attr("y", line1 + ( i * diferenceBetweenLines ))
//       .text(`P${i}`);

//     svg.append("line").attr("x1", "40")
//       .attr("x2", "100%")
//       .attr("y1", line1 + ( i * diferenceBetweenLines ))
//       .attr("y2", line1 + ( i * diferenceBetweenLines ))
//       .attr("stroke", "black"); 
//   }
// }

// function createMessagePtoP(processSend, processReceive, init){
//   const final = init + 50;
//   svg.append("line").attr("x1", init)
//   .attr("x2", final)
//   .attr("y1", line1 + (processSend * diferenceBetweenLines))
//   .attr("y2", line1 + (processReceive * diferenceBetweenLines))
//   .attr("stroke", "black");
// }


// function createMessagePtoP(processSend, processReceive, init){
//   const final = init + 50;
//   svg.append("line").attr("x1", init)
//   .attr("x2", final)
//   .attr("y1", line1 + (processSend * diferenceBetweenLines))
//   .attr("y2", line1 + (processReceive * diferenceBetweenLines))
//   .attr("stroke", "black");
// }

// function main(){
//   const numberLines = 8
//   svg.attr("width", "100%").attr("height", `${line1 + ( diferenceBetweenLines * numberLines)}`);
//   initTemplate(numberLines)
//   let message = 100
//   // while(true){
//   //   message += 100;
//   //   window.setTimeout(function(){  }, 3000);
//   //   createMessagePtoP(1,0, message);
//   // }

//   createMessagePtoP(0,7, 400);
//   // createMessageP3toP2(600)
//   // createMessageP2toP1(400)
//   // createCheckpointP1(500)
//   // createCheckpointP2(600)
//   // createCheckpointP3(900)
// }

// main()












