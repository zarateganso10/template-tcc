const canvas = document.getElementById("timeline")
const canvasChannels = document.getElementById("channels");
const ctxChannels = canvasChannels.getContext("2d");
const ctxTimeline = canvas.getContext("2d");
const sizeWidth = innerWidth - 100;
ctxTimeline.width  = 600;
ctxTimeline.height = 300;

const INIT_LINE_X = 100;
const INIT_Y = 50;
class Cluster {
  constructor(processNumber = 4, distanceBetweenLines = 50  ) {
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
      processTime.push({ timeline: 100, step: this.velocityX });
    }

    this.processTime = processTime;
  }

  getNumberProcess() {
    return this.processNumber;
  }

  createLine(processNumber, distanceLine) {
    ctxTimeline.fillText(`P${processNumber + 1}`, 50, 50 + distanceLine);
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

  setTimeLine(timeline) {
    this.processTime = this.processTime.map(time => {
      if(time.timeline + time.step < sizeWidth){
        return {
          ...time,
          timeline,
        }
      }
      return time
    })
  }

  removeLastMessage() {
    this.messagesList.pop();
  }

  removeLastCheckpoint() {
    this.checkpointList.pop();
  }
  
  removeLastEvent() {
    this.eventList.pop();
  }

  getTimeline() {
    return this.processTime[0].timeline;
  }

  draw(actions) {
    // DRAW PROCESS TIMELINE
    for (let i = 0; i < this.processNumber; i++) {
      ctxTimeline.beginPath();
      ctxTimeline.moveTo(INIT_LINE_X, INIT_Y + (i * this.distanceBetweenLines));
      ctxTimeline.lineTo(this.processTime[i].timeline, INIT_Y + (i * this.distanceBetweenLines));
      ctxTimeline.strokeStyle = PROCESS_COLORS[i];
      ctxTimeline.stroke();
      ctxTimeline.closePath();
    }
    this.drawMessages(actions);
    this.drawCheckpoints();
    this.drawEvents();
    // this.drawClusters()
  }

  drawLinesOfProcess() {
    for (let i = 0; i < this.processNumber; i++) {
      this.createLine(i, i * this.distanceBetweenLines);
      this.yAxisProcess.push(INIT_Y + (i * this.distanceBetweenLines));
    }
  }
  // asdasds
  drawMessages(actions) {
    for (let i = 0; i < this.messagesList.length; i++) {
      const message = this.messagesList[i];
      const step = this.processTime[message.processReceive]?.step;
      const timeline = this.processTime[0].timeline;
      if (message.drawing) {
        if(message.processSending > message.processReceive) {
          if (timeline > message.moveTo.x + message.delay) {
            this.messagesList[i].lineTo = { x: message.moveTo.x + message.delay, y: this.yAxisProcess[message.processReceive] }
          }else if(message.lineTo.y - step > this.yAxisProcess[message.processReceive] && action === 'play') {
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
          if (timeline > message.moveTo.x + message.delay) {
            this.messagesList[i].lineTo = { x: message.moveTo.x + message.delay, y: this.yAxisProcess[message.processReceive] }
          } else if (message.lineTo.y + step < this.yAxisProcess[message.processReceive] && action === 'play') {
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
      const distanceX = delay;
      // const distanceY = Math.sqrt((distanceX*distanceX) + (blau*this.distanceBetweenLines*blau*this.distanceBetweenLines)).toFixed(2);
      const timeX = delay/this.velocityX
      velocity.x = this.velocityX;
      velocity.y = (blau*this.distanceBetweenLines/timeX);
    }
    this.messagesList.push({
      delay: delay,
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
    const checkpoint = {
      type: "checkpoint",
      color: color,
      position: {
        x: this.processTime[process].timeline,
        y: this.yAxisProcess[process]
      }
    }
    this.checkpointList.push(checkpoint)
    return checkpoint;
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

class Channels {
  constructor(processNumber = 4) {
    this.processNumber = processNumber;
    this.channels = [];
    for(let i = 0; i < processNumber; i++) {
      let processReceivers;
      for(let j = 0; j < processNumber; j++) {
        processReceivers.push({});
      }
    }
  }

  draw() {
    this.drawChannels();
  }

  drawChannel(processNumber, distanceX) {
    let distanceY = 50
    for(let i = 0; i < this.processNumber; i++) {
      if(processNumber !== i){
        ctxChannels.beginPath();
        ctxChannels.font = "16px Arial";
        ctxChannels.fillText(`C${processNumber + 1}->${i}`, distanceX, distanceY);
        ctxChannels.closePath();
        distanceY += 20
      }
    }
  }

  drawChannels() {
    let distanceX = 50;
    for(let i = 0; i < this.processNumber; i++) {
      this.drawChannel(i, distanceX);
      distanceX += 100;
    }
  }
}


function clean() {
  ctxTimeline.clearRect(0, 0, ctxTimeline.width, ctxTimeline.height);
}

var action = '';
var cluster = new Cluster(3);
var channels = new Channels(3);

const PROCESS_COLORS = [
  "#151EF4",
  "#F415DE",
  "#15F42C",
  "#F0F415",
]

var iterator = 0
const STEP_ITERATOR = 60
const STEPS = [
  {
    draw: false,
    timeline: 100,
    checkpoints: [
      { process: 0 },
      { process: 1 },
      { process: 2 },
    ]
  },
  {
    draw: false,
    timeline: 120,
    messages: [
      { 
        processSending: 0,
        processReceiving: 1
      }
    ]
  },
  {
    draw: false,
    timeline: 150,
    messages: [
      { 
        processSending: 2,
        processReceiving: 1
      }
    ]
  },
  {
    draw: false,
    timeline: 180,
    events: [
      {process: 1}
    ]
  },
  {
    draw: false,
    timeline: 200,
    messages: [
      { 
        processSending: 0,
        processReceiving: 2,
        delay: 70
      }
    ]
  },
  {
    draw: false,
    timeline: 220,
    events: [
      {process: 0}
    ]
  },
  {
    draw: false,
    timeline: 200,
    messages: [
      { 
        processSending: 0,
        processReceiving: 2,
        delay: 70,
      }
    ]
  },
  {
    draw: false,
    timeline: 250,
    checkpoints: [
      { process: 0, color: PROCESS_COLORS[0] },
    ]
  },
  {
    draw: false,
    timeline: 260,
    messages: [
      { 
        processSending: 0,
        processReceiving: 1,
        delay: 20,
        color: PROCESS_COLORS[0]
      },
      { 
        processSending: 0,
        processReceiving: 2,
        delay: 150,
        color: PROCESS_COLORS[0]
      },
    ]
  },
  {
    draw: false,
    timeline: 315,
    checkpoints: [
      { process: 1, color: PROCESS_COLORS[1] },
    ]
  },
  {
    draw: false,
    timeline: 340,
    messages: [
      { 
        processSending: 2,
        processReceiving: 1,
        delay: 60,
      }
    ]
  },
  {
    draw: false,
    timeline: 325,
    messages: [
      { 
        processSending: 1,
        processReceiving: 0,
        delay: 60,
        color: PROCESS_COLORS[1]
      },
      { 
        processSending: 1,
        processReceiving: 2,
        delay: 60,
        color: PROCESS_COLORS[1]
      },
    ]
  },
  {
    draw: false,
    timeline: 390,
    checkpoints: [
      { process: 2, color: PROCESS_COLORS[2] },
    ]
  },
  {
    draw: false,
    timeline: 400,
    messages: [
      { 
        processSending: 2,
        processReceiving: 1,
        delay: 20,
        color: PROCESS_COLORS[2]
      },
      { 
        processSending: 2,
        processReceiving: 0,
        delay: 130,
        color: PROCESS_COLORS[2]
      },
    ]
  },
];

function player(actions) {
  action = actions;
}

function drawStep(step) {
  step.checkpoints?.forEach(checkpoint => {
    cluster.createCheckpoint(checkpoint.process, checkpoint.color);
  })
  step.messages?.forEach(message => {
    cluster.createMessage(message.processSending, message.processReceiving, message.delay | 50, message.color);
  })
  step.events?.forEach(event => {
    cluster.createEvent(event.process);
  })
}

function returnStep(step) {
  step.checkpoints && step.checkpoints?.forEach(checkpoint => {
    cluster.removeLastCheckpoint();
  })
  step.messages && step.messages?.forEach(message => {
    cluster.removeLastMessage();
  })
  step.events && step.events?.forEach(event => {
    cluster.removeLastEvent();
  })
  cluster.setTimeLine(step.timeline);
}


  
window.requestAnimationFrame(function loop() {
  clean();
  channels.draw()
  cluster.drawLinesOfProcess();
  cluster.draw(action);
  if (action === 'return') {
    let lastIndex = -1;
    for (let i = 0; i < STEPS.length; i ++) {
      if(STEPS[i].draw === false) break;
      lastIndex = i;
    }
    if(lastIndex > -1) {
      returnStep(STEPS[lastIndex])
      STEPS[lastIndex].draw = false;
    }
    action = 'pause'
  }
  if(action === 'advance') {
    let lastIndex = -1;
    for (let i = 0; i < STEPS.length; i ++) {
      if(STEPS[i].draw === false) {
        lastIndex = i;
        break;
      }
    }
    if(lastIndex > -1) {
      cluster.setTimeLine(STEPS[lastIndex].timeline)
      drawStep(STEPS[lastIndex])
      STEPS[lastIndex].draw = true;
    }
    action = 'pause'
  }
  if (action === 'play') {
    const timeline = cluster.getTimeline()
    for(let i = 0; i < STEPS.length; i++) {
      const step = STEPS[i];
      if(step.draw) continue;
      if(step.timeline <= timeline) {
        drawStep(step);
        STEPS[i].draw = true;
      }
    }
    cluster.advanceTimeline();
  } 
  window.requestAnimationFrame(loop);
})
