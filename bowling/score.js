let game = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0, 0], [0,0],[0,0]]

let balls = [['ball1', 'ball2'], ['ball3', 'ball4'], ['ball5', 'ball6'],['ball7', 'ball8'], ['ball9','ball10'], ['ball11', 'ball12'],['ball13', 'ball14'], ['ball15','ball16'], ['ball17', 'ball18'],['ball19', 'ball20', 'ball21']]

document.addEventListener("click", () => updateFrames(game))

function updateFrames (game) {
  //loop through each frame, get ball by id, update game array
  for (var i = 0; i < 10; i++) {
    game[i][0] = Number(document.getElementById(balls[i][0]).value)
    game[i][1] = Number(document.getElementById(balls[i][1]).value)
  }
  //handle 3rd ball in 10th frame
  game[9][2] = Number(document.getElementById(balls[9][2]).value)
  //run scoregame and update total
  document.getElementById('score').innerHTML = scoreGame(game)
  //update max score for balls
  updateMax(game)
}

function updateMax (game) {
  for (var i = 0; i < 9; i++) {
    document.getElementById(balls[i][0]).max = 10 - game[i][1]
    document.getElementById(balls[i][1]).max = 10 - game[i][0]

    if (game[i][0] == 10) {
      document.getElementById(balls[i][1]).style.visibility = "hidden"
      
      
      //sound effect
    } else {
      document.getElementById(balls[i][1]).style.visibility = "visible"
    }
  }
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