const canvas = d3.select(".canvas");


const line1 = 50;
const diferenceBetweenLines = 50;
const checkpointSize = 20;
const diference = checkpointSize/2;

const svg = canvas.append("svg");

function initTemplate(numberLines) {
  for(let i = 0; i < numberLines; i++){
    svg.append("text").attr("x", "0")
      .attr("y", line1 + ( i * diferenceBetweenLines ))
      .text(`P${i}`);

    svg.append("line").attr("x1", "40")
      .attr("x2", "100%")
      .attr("y1", line1 + ( i * diferenceBetweenLines ))
      .attr("y2", line1 + ( i * diferenceBetweenLines ))
      .attr("stroke", "black"); 
  }
}

// function createMessagePtoP(processSend, processReceive, init){
//   const final = init + 50;
//   svg.append("line").attr("x1", init)
//   .attr("x2", final)
//   .attr("y1", line1 + (processSend * diferenceBetweenLines))
//   .attr("y2", line1 + (processReceive * diferenceBetweenLines))
//   .attr("stroke", "black");
// }


function createMessagePtoP(processSend, processReceive, init){
  const final = init + 50;
  svg.append("line").attr("x1", init)
  .attr("x2", final)
  .attr("y1", line1 + (processSend * diferenceBetweenLines))
  .attr("y2", line1 + (processReceive * diferenceBetweenLines))
  .attr("stroke", "black");
}

function main(){
  const numberLines = 8
  svg.attr("width", "100%").attr("height", `${line1 + ( diferenceBetweenLines * numberLines)}`);
  initTemplate(numberLines)
  let message = 100
  // while(true){
  //   message += 100;
  //   window.setTimeout(function(){  }, 3000);
  //   createMessagePtoP(1,0, message);
  // }

  createMessagePtoP(0,7, 400);
  // createMessageP3toP2(600)
  // createMessageP2toP1(400)
  // createCheckpointP1(500)
  // createCheckpointP2(600)
  // createCheckpointP3(900)
}

main()












