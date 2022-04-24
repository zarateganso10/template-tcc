// const canvas = d3.select(".canvas");
const canvasTimeline = document.getElementById("timeline");
const canvasCluster = document.getElementById("cluster");
const buttonPlay = document.getElementById("play");
const buttonPause = document.getElementById("pause");
const buttonReset = document.getElementById("reset");
const buttonReturn = document.getElementById("return");
const buttonAdvance = document.getElementById("advance");
const sizeWidth = innerWidth - 100;

canvasTimeline.width  = innerWidth;
canvasTimeline.height = 300;

// canvasCluster.width  = innerWidth;
// canvasCluster.height = 300;

// const ctxCluster = canvasCluster.getContext("2d")
const ctxTimeline = canvasTimeline.getContext("2d");

function player(action) {
  console.log(action)
}

const INIT_LINE_X = 100;

const PROCESS_COLORS = [
  "#151EF4",
  "#F415DE",
  "#15F42C",
  "#F0F415",
]

function clean() {
  ctxTimeline.clearRect(0, 0, canvasTimeline.width, canvasTimeline.height);
}

class Cluster {
  constructor(processNumber = 4, distanceBetweenLines = 70  ) {
    this.processNumber = processNumber;
    this.distanceBetweenLines = distanceBetweenLines;
    this.yAxisProcess = [];
    this.checkpointSize = 10;
    this.checkpointList = [];
    this.eventList = [];
    this.messagesList = [];
    this.velocityX = .5;
    const processTime = [];
    for(let i = 0; i < processNumber; i++) {
      const step = getRandomInteger(1,3);
      processTime.push({ timeline: 100, step: this.velocityX });
    }

    this.processTime = processTime;
  }

  getNumberProcess() {
    return this.processNumber;
  }

  createLine(processNumber, distanceLine) {
    ctxTimeline.fillText(`P${processNumber}`, 50, 100 + distanceLine);
  }

  advanceTimeline() {
    this.processTime = this.processTime.map(time => {
      if(time.timeline + time.step < sizeWidth){
        return {
          ...time,
          timeline: time.timeline + time.step,
        }
      }
      return time
    })
  }

  draw() {
    // DRAW PROCESS TIMELINE
    for (let i = 0; i < this.processNumber; i++) {
      ctxTimeline.beginPath();
      ctxTimeline.moveTo(INIT_LINE_X, 100 + (i * this.distanceBetweenLines));
      ctxTimeline.lineTo(this.processTime[i].timeline, 100 + (i * this.distanceBetweenLines));
      ctxTimeline.strokeStyle = PROCESS_COLORS[i];
      ctxTimeline.stroke();
      ctxTimeline.closePath();
    }
    this.drawMessages();
    this.drawCheckpoints();
    this.drawEvents();
    // this.drawClusters()
  }

  drawLinesOfProcess() {
    for (let i = 0; i < this.processNumber; i++) {
      this.createLine(i, i * this.distanceBetweenLines);
      this.yAxisProcess.push(100 + (i * this.distanceBetweenLines));
    }
  }

  drawMessages() {
    for (let i = 0; i < this.messagesList.length; i++) {
      const message = this.messagesList[i];
      const step = this.processTime[message.processReceive]?.step;
      if (message.drawing) {
        if(message.processSending > message.processReceive) {
          if(message.lineTo.y - step > this.yAxisProcess[message.processReceive]) {
            this.messagesList[i].lineTo = { x: message.lineTo.x + message.velocity.x, y: message.lineTo.y - message.velocity.y }
          }
          ctxTimeline.beginPath();
          ctxTimeline.moveTo(message.moveTo.x, message.moveTo.y);
          ctxTimeline.lineTo(message.lineTo.x, message.lineTo.y);
          ctxTimeline.strokeStyle = message.color;
          ctxTimeline.stroke();
          ctxTimeline.closePath();
          ctxTimeline.beginPath();
          ctxTimeline.moveTo(message.lineTo.x - 10, message.lineTo.y + 2);
          ctxTimeline.lineTo(message.lineTo.x, message.lineTo.y);
          ctxTimeline.lineTo(message.lineTo.x - 2, message.lineTo.y + 10);
          ctxTimeline.fillStyle = message.color;
          ctxTimeline.fill();
          ctxTimeline.closePath();
        } else {
          if(message.lineTo.y + step < this.yAxisProcess[message.processReceive]) {
            this.messagesList[i].lineTo = { x: message.lineTo.x + message.velocity.x, y: message.lineTo.y + message.velocity.y }
          }
          ctxTimeline.beginPath();
          ctxTimeline.moveTo(message.moveTo.x, message.moveTo.y);
          ctxTimeline.lineTo(message.lineTo.x, message.lineTo.y);
          ctxTimeline.strokeStyle = message.color;
          ctxTimeline.stroke();
          ctxTimeline.closePath();
          ctxTimeline.beginPath();
          ctxTimeline.moveTo(message.lineTo.x - 10, message.lineTo.y - 2);
          ctxTimeline.lineTo(message.lineTo.x, message.lineTo.y);
          ctxTimeline.lineTo(message.lineTo.x - 2, message.lineTo.y - 10);
          ctxTimeline.fillStyle = message.color;
          ctxTimeline.fill();
          ctxTimeline.closePath();
        }
      }
    }
  }

  drawCheckpoints() {
    for (let i = 0; i < this.checkpointList.length; i++) {
      const checkpoint = this.checkpointList[i];
      ctxTimeline.beginPath();
      ctxTimeline.rect(checkpoint.position.x, checkpoint.position.y - this.checkpointSize/2, this.checkpointSize, this.checkpointSize);
      ctxTimeline.fillStyle = checkpoint.color;
      ctxTimeline.fill();
      ctxTimeline.closePath();
    }
  }

  drawEvents() {
    for (let i = 0; i < this.eventList.length; i++) {
      const event = this.eventList[i]
      ctxTimeline.beginPath();
      ctxTimeline.arc(event.position.x, event.position.y , 5, 0, 360, false);
      ctxTimeline.fillStyle = event.color;
      ctxTimeline.fill();
      ctxTimeline.closePath();
    }
  }

  drawClusters() {
    const image = document.getElementById('source');
    ctxTimeline.fillText(`P0`, 100, 300);
    ctxTimeline.drawImage( image, 100, 300, 70, 70);
    // P0 to P2
    ctxTimeline.beginPath();
    ctxTimeline.moveTo(150, 330);
    ctxTimeline.lineTo(320, 330);
    ctxTimeline.strokeStyle = "#000";
    ctxTimeline.stroke();
    ctxTimeline.closePath();
    ctxTimeline.beginPath();
    ctxTimeline.moveTo(150, 343);
    ctxTimeline.lineTo(320, 343);
    ctxTimeline.strokeStyle = "#000";
    ctxTimeline.stroke();
    ctxTimeline.closePath();
    // P0 to P1
    ctxTimeline.beginPath();
    ctxTimeline.moveTo(140, 368);
    ctxTimeline.lineTo(220, 460);
    ctxTimeline.strokeStyle = "#000";
    ctxTimeline.stroke();
    ctxTimeline.closePath();
    ctxTimeline.beginPath();
    ctxTimeline.moveTo(122, 368);
    ctxTimeline.lineTo(220, 477);
    ctxTimeline.strokeStyle = "#000";
    ctxTimeline.stroke();
    ctxTimeline.closePath();
    ctxTimeline.fillText(`P1`, 220, 445);
    // P1 to P2
    ctxTimeline.drawImage( image, 200, 450, 70, 70);
    ctxTimeline.beginPath();
    ctxTimeline.moveTo(250, 450);
    ctxTimeline.lineTo(320, 368);
    ctxTimeline.strokeStyle = "#000";
    ctxTimeline.stroke();
    ctxTimeline.closePath();
    ctxTimeline.beginPath();
    ctxTimeline.moveTo(250, 470);
    ctxTimeline.lineTo(352, 348);
    ctxTimeline.strokeStyle = "#000";
    ctxTimeline.stroke();
    ctxTimeline.closePath();
    ctxTimeline.fillText(`P2`, 300, 300);
    ctxTimeline.drawImage( image, 300, 300, 70, 70);
  }

  createMessage(processSending, processReceive, delay = 50, color = "#000") {
    let distanceBetweenProcess = null;
    const velocity = {
      x: 0.5,
      y: 0.5,
    };
    if(this.processTime[processSending].timeline > this.processTime[processReceive].timeline) {
      distanceBetweenProcess = this.processTime[processSending].timeline - this.processTime[processReceive].timeline;
      const blau = processSending - processReceive;
      const distanceX = delay + distanceBetweenProcess;
      const distanceY = Math.sqrt((delay*delay) + (blau*this.distanceBetweenLines*blau*this.distanceBetweenLines)).toFixed(2);
      const timeX = distanceX/this.velocityX
      velocity.x = (delay/timeX); 
      velocity.y = (this.distanceBetweenLines/timeX);
    } else {
      distanceBetweenProcess = this.processTime[processReceive].timeline - this.processTime[processSending].timeline;
      const blau = Math.abs(processSending - processReceive);
      const distanceX = delay + distanceBetweenProcess;
      const distanceY = Math.sqrt((distanceX*distanceX) + (blau*this.distanceBetweenLines*blau*this.distanceBetweenLines)).toFixed(2);
      const timeX = delay/this.velocityX
      velocity.x = (distanceX/timeX);
      velocity.y = (blau*this.distanceBetweenLines/timeX);
    }
    this.messagesList.push({
      moveTo: {
        x: this.processTime[processSending].timeline,
        y: this.yAxisProcess[processSending],
      },
      lineTo: {
        x: this.processTime[processSending].timeline,
        y: this.yAxisProcess[processSending]
      },
      velocity: {
        x: velocity.x,
        y: velocity.y,
      },
      markerMessage: false,
      processReceive: processReceive,
      processSending: processSending,
      color,
      drawing: true,
    })
  }

  createCheckpoint(process, color = "#000") {
    this.checkpointList.push({
      color: color,
      position: {
        x: this.processTime[process].timeline,
        y: this.yAxisProcess[process]
      }
    })    
  }

  createCheckpointByProcess(process, color) {
    const yAxis = this.yAxisProcess[process];
    this.checkpointList.push({ xAxis: this.step, yAxis: yAxis})
    this.createCheckpoint(yAxis, color);
  }

  createEvent(process, color = "#000") {
    const yAxis = this.yAxisProcess[process];
    const timeline = this.processTime[process].timeline;
    this.eventList.push({
      color: color,
      position: {
        x: timeline,
        y: yAxis
      }
    })
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function randomMessage(cluster) {
  const numberProcess = cluster.getNumberProcess();
  const processToSendMessage = getRandomInteger(0, numberProcess);
  let processToReceiveMessage = -1;
  while(true) {
    processToReceiveMessage = getRandomInteger(0, numberProcess);
    if(processToReceiveMessage !== processToSendMessage){
      break;
    }
  }
  cluster.createMessage(processToSendMessage, processToReceiveMessage, step, 50);
}

function draw(cluster, i) {
  // if(i === 0) {
  //   cluster.createCheckpointByProcess(0, "#000");
  //   cluster.createCheckpointByProcess(1, "#000");
  //   cluster.createCheckpointByProcess(2, "#000");
  //   cluster.advanceTimeline(50);
  // }
  // if(i === 0) { cluster.createMessage( 0, 1, 50); }
  // if(i === 2) { cluster.createMessage( 2, 0, 100); cluster.advanceTimeline(60); }
  // if(i === 3) { cluster.createMessage( 1, 2, 50); cluster.advanceTimeline(50); }
  // if(i === 4) { cluster.createMessage( 1, 2, 50); cluster.advanceTimeline(50); }
  // if(i === 5) { cluster.createCheckpointByProcess(0, "#FF0000"); cluster.advanceTimeline(10); }
  // if(i === 6) { cluster.createMessage( 0, 1, 20, "#151EF4"); cluster.createMessage( 0, 2, 150, "#151EF4"); cluster.advanceTimeline(50); }
}

// function main() {
  
//   const cluster = new Cluster(3);
//   cluster.drawLinesOfProcess();
//   let i = 0

//   setInterval(() => {
//     draw(cluster, i)
//     i++;
//   }, 1000)
// }

// main();
const cluster = new Cluster(3);

var iterator = 0
const STEP_ITERATOR = 60
var STEP = 0;

function main() {
  setInterval(() => {
    
  }, [])
}

main()
  
window.requestAnimationFrame(function loop() {
  clean();
  cluster.drawLinesOfProcess();
  cluster.advanceTimeline();
  cluster.draw();
  if (iterator === STEP_ITERATOR * 0) {
    cluster.createCheckpoint(0);
    cluster.createCheckpoint(1);
    cluster.createCheckpoint(2);
  };
  if (iterator === STEP_ITERATOR * 1) cluster.createMessage(0, 1);
  if (iterator === STEP_ITERATOR * 1.5) cluster.createMessage(1,0);
  if (iterator === STEP_ITERATOR * 2) cluster.createEvent(0);
  if (iterator === STEP_ITERATOR * 4) cluster.createMessage(0,2, 100);
  if (iterator === STEP_ITERATOR * 6.5) cluster.createMessage(2, 1);
  if (iterator === STEP_ITERATOR * 7) cluster.createCheckpoint(0, PROCESS_COLORS[0]);
  if (iterator === STEP_ITERATOR * 7.4) {
    cluster.createMessage(0, 1, 50,PROCESS_COLORS[0]);
    cluster.createMessage(0, 2, 200, PROCESS_COLORS[0]);
  }
  if (iterator === STEP_ITERATOR * 7.8) cluster.createCheckpoint(1, PROCESS_COLORS[1]);
  if (iterator === STEP_ITERATOR * 8.1) {
    cluster.createMessage(1, 0, 50,PROCESS_COLORS[1]);
    cluster.createMessage(1, 2, 60, PROCESS_COLORS[1]);
  }
  if (iterator === STEP_ITERATOR * 10.8) cluster.createCheckpoint(2, PROCESS_COLORS[2]);
  if (iterator === STEP_ITERATOR * 11.2) {
    cluster.createMessage(2, 1, 50,PROCESS_COLORS[2]);
    cluster.createMessage(2, 0, 200, PROCESS_COLORS[2]);
  }

  
  iterator += 1;
  window.requestAnimationFrame(loop);
})
