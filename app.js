const canvas = d3.select(".canvas");
const svg = canvas.append("svg");
svg.attr("width", "100%").attr("height", "300");

const line1 = 50;
const line2 = 100;
const line3 = 150;
const checkpointSize = 20;
const diference = checkpointSize/2;


function initTemplate() {
  // Text
  svg.append("text").attr("x", "0")
  .attr("y", line1)
  .text("P1");

  svg.append("text").attr("x", "0")
  .attr("y", line2)
  .text("P2");

  svg.append("text").attr("x", "0")
  .attr("y", line3)
  .text("P3");

  // Global Lines
  svg.append("line").attr("x1", "40")
  .attr("x2", "100%")
  .attr("y1", line1)
  .attr("y2", line1)
  .attr("stroke", "black"); 

  svg.append("line").attr("x1", "40")
  .attr("x2", "100%")
  .attr("y1", line2)
  .attr("y2", line2)
  .attr("stroke", "black");

  svg.append("line").attr("x1", "40")
  .attr("x2", "100%")
  .attr("y1", line3)
  .attr("y2", line3)
  .attr("stroke", "black");
}

function createMessageP1toP2(init ){
  const final = init + 50;
  // Line message P1 to P2
  svg.append("line").attr("x1", init)
  .attr("x2", final)
  .attr("y1", line1)
  .attr("y2", line2)
  .attr("stroke", "black");
}

function createMessageP2toP3(init) {
  const final = init + 50;
  // Line message P2 to P3
  svg.append("line").attr("x1", init)
  .attr("x2", final)
  .attr("y1", line2)
  .attr("y2", line3)
  .attr("stroke", "black");
}

function createMessageP3toP2(init) {
  const final = init + 50;
  // Line message P3 to P2
  svg.append("line").attr("x1", init)
  .attr("x2", final)
  .attr("y1", line3)
  .attr("y2", line2)
  .attr("stroke", "black");
}

function createMessageP2toP1(init) {
  const final = init + 50;
  // Line message P2 to P1
  svg.append("line").attr("x1", init)
  .attr("x2", final)
  .attr("y1", line2)
  .attr("y2", line1)
  .attr("stroke", "black");
}

function createCheckpointP1(init) {
  svg.append("rect").attr("x", init)
  .attr("y", line1 - diference)
  .attr("width", checkpointSize)
  .attr("height", checkpointSize);
}

function createCheckpointP2(init) {
  const final = init + 50;
  svg.append("rect").attr("x", init)
  .attr("y", line2 - diference)
  .attr("width", checkpointSize)
  .attr("height", checkpointSize);
}

function createCheckpointP3(init) {
  const final = init + 50;
  svg.append("rect").attr("x", init)
  .attr("y", line3 - diference)
  .attr("width", checkpointSize)
  .attr("height", checkpointSize);
}


function main(){
  initTemplate()
  createMessageP3toP2(600)
  createMessageP2toP1(400)
  createCheckpointP1(500)
  createCheckpointP2(600)
  createCheckpointP3(900)
}

main()












