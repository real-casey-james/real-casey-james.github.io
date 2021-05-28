let game = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0, 0]]

document.addEventListener("click", () => updateFrames(game))

console.log('working')

function updateFrames (game) {
  //loop through each frame, get ball by id, update game array
  for (var i = 1; i < game.length + 1; i+=2) {
    game[i][0] = document.getElementById("ball" + i).value
    game[i][1] = document.getElementById("ball" + i + 1).value
  }
  //run scoregame and update total
  document.getElementById('score').value = scoreGame(game)
}



function scoreFrame(frame) {
  return frame[0] + frame[1]
}

function scoreSpare(frames) {
  return frames[0][0] + frames[0][1] + frames[1][0]
}

function scoreStrike(frames) {
  return frames[0][0] + frames[1][0] + frames[1][1]
}

function scoreDoubleStrike(frames) {
  return frames[0][0] + frames[1][0] + frames[2][0]
}




function scoreGame(frames) {
  let score = 0
  frames.push([0,0],[0,0])
  score += frames.flat()[20]
  for (let x = 0; x < frames.length; x++) {
    //adds points for non strikes  
      if (frames[x][0] + frames[x][1] !== 10)
       {score += scoreFrame(frames[x])} 
    //adds bonus points for spares     
      else if (frames[x][0] + frames[x][1] === 10 && frames[x][0] !== 10)
       {score += scoreSpare([frames[x],frames[x+1]])}
    //adds bonus points for strikes      
      if (frames[x][0] === 10 && frames[x+1][0] != 10)
          {score += scoreStrike([frames[x],frames[x+1]])}
    //adds second balls points for double strikes      
      if (frames[x][0] === 10 && frames[x+1][0] == 10)
          {score += scoreDoubleStrike([frames[x],frames[x+1],frames[x+2]])}
      }return score

}