// const canvas = d3.select(".canvas");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const sizeWidth = innerWidth - 100;

canvas.width  = innerWidth;
canvas.height = innerHeight;

const INIT_LINE_X = 100;

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







// function createCheckpoint(x, y) {
//   ctx.beginPath();
//   ctx.rect(x, y, 20, 20);
//   ctx.fillStyle = "#FF0000";
//   ctx.fill();
//   ctx.closePath();
// }

function createActionLine(x) {
  ctx.beginPath();
  ctx.moveTo(100, 150);
  ctx.lineTo(x, 150);
  ctx.strokeStyle = '#00c800';
  ctx.stroke();
}

function initTemplate() {
  createLines(4)
}

// function main() {
//   clean()
//   initTemplate();
//   const actionLinesArray = [100, 100, 100, 100];
//   setInterval({ draw(ac) }, 1000);
// }

var x = 100;



function drawActionLines() {
  if(x <= sizeWidth){
    createActionLine(x);
    x = x + 50;
  }
}

function draw() {
  drawActionLines();
  createCheckpoint(x, 90)
}

function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

class Cluster {
  constructor(processNumber = 4, distanceBetweenLines = 50) {
    this.processNumber = processNumber;
    this.distanceBetweenLines = distanceBetweenLines;
    this.checkpoints = [];
    this.checkpointForces = [];
    this.colorCheckpoint = "#FF0000"
    this.yAxisProcess = [];
    this.checkpointSize = 20;
    this.checkpointList = [];
  }

  createLine(processNumber, distanceLine) {
    ctx.fillText(`P${processNumber}`, 50, 100 + distanceLine);
    ctx.beginPath();
    ctx.moveTo(INIT_LINE_X, 100 + distanceLine);
    ctx.lineTo(sizeWidth, 100 + distanceLine);
    ctx.stroke();
  }

  drawLinesOfProcess() {
    for (let i = 0; i < this.processNumber; i++) {
      this.createLine(i, i * this.distanceBetweenLines);
      this.yAxisProcess.push(100 + (i * this.distanceBetweenLines));
    }
  }

  createMessage(processSending, processReceive, delay = 50) {
    ctx.beginPath();
    ctx.moveTo(100, this.yAxisProcess[processSending]);
    ctx.lineTo(150, this.yAxisProcess[processReceive]);
    ctx.stroke();

    if(processSending > processReceive) {
      ctx.beginPath();
      ctx.moveTo(150,100);
      ctx.lineTo(150,100 + 10);
      ctx.fillStyle = "#000";
      ctx.lineTo(150 - 10, 100  + 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(150,150);
      ctx.lineTo(150,150 - 10);
      ctx.fillStyle = "#000";
      ctx.lineTo(150 - 10, 150 - 2);
      ctx.fill();
    }
  }

  createCheckpoint(xAxis, yAxis) {
    const relativeYAxis = yAxis - (this.checkpointSize/2);
    ctx.beginPath();
    ctx.rect(xAxis, relativeYAxis, this.checkpointSize, this.checkpointSize);
    ctx.fillStyle = this.colorCheckpoint;
    ctx.fill();
    ctx.closePath();
  }

  createCheckpointByProcess(process, timeline) {
    const yAxis = this.yAxisProcess[process];
    this.checkpointList.push({ xAxis: timeline, yAxis: yAxis})
    this.createCheckpoint(timeline, yAxis);
  }
}

function main() {
  // clean()
  // initTemplate();
  // const actionLinesArray = [100, 100, 100, 100];
  // setInterval({ draw(ac) }, 1000);
  const cluster = new Cluster(4);
  cluster.drawLinesOfProcess();
  cluster.createCheckpointByProcess(1, 150)
  cluster.createMessage(0, 1);
  cluster.createMessage(3, 0);
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












