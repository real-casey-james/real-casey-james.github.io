let game = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0, 0], [0,0],[0,0]]

let balls = [['ball1', 'ball2'], ['ball3', 'ball4'], ['ball5', 'ball6'],['ball7', 'ball8'], ['ball9','ball10'], ['ball11', 'ball12'],['ball13', 'ball14'], ['ball15','ball16'], ['ball17', 'ball18'],['ball19', 'ball20', 'ball21']]

document.addEventListener("input", () => updateFrames(game))

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

  //if perfect game then say so, also play sound
  if (scoreGame(game) == 300) {
    document.getElementById('score').innerHTML = scoreGame(game) + '<br> PERFECT GAME!'
    document.getElementById("perfect").play();
  }
  //update user interface
  updateElements(game)
}

function updateElements (game) {
  //manipulate the DOM based on rolls
  for (var i = 0; i < 9; i++) {
    //update max ball totals based on input
    document.getElementById(balls[i][0]).max = 10 - game[i][1]
    document.getElementById(balls[i][1]).max = 10 - game[i][0]
    //update frame score
    document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreFrame(game[i])

    if (game[i][0] == 10 && game[i+1][0] == 10 && i != 8) {
      //if its a double strike (and not the 9th frame), do this
      document.getElementById(balls[i][1]).style.visibility = "hidden"
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "paleGreen"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = "STRIKE!"
      document.getElementById("strike").play();
      
      document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreDoubleStrike([game[i], game[i+1], game[i+2]])

    } else if (game[i][0] == 10) {
      //if its a strike, do this
      document.getElementById(balls[i][1]).style.visibility = "hidden"
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "paleGreen"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = "STRIKE!"
      document.getElementById("strike").play();
      
      document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreStrike([game[i], game[i+1]])

    } else if (game[i][0] + game[i][1] == 10) {
      //if its a spare, do this
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "paleTurquoise"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = "SPARE!"
      document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreSpare([game[i], game[i+1]])
    }
    
    else {
      //put everything back if it isn't a strike or a spare
      document.getElementById(balls[i][1]).style.visibility = "visible"
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "#fdb768"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = ""
    }
  }
  //deal with the last frame
    document.getElementById(balls[9][0]).max = 10 - game[9][1]
    document.getElementById(balls[9][1]).max = 10 - game[9][0]
    document.getElementById('frame10score').innerHTML = game[9][0] + game[9][1] + game[9][2]
    
    if (game[9][0] == 10) {
      document.getElementById('ball20').max = 10
      document.getElementById(balls[9][2]).style.visibility = "visible"
      document.getElementById('frame10').style.backgroundColor = "paleGreen"
      document.getElementById("strike").play();
    } else if (game[9][0] + game[9][1] == 10) {
    
      document.getElementById(balls[9][2]).style.visibility = "visible"
      document.getElementById('frame10').style.backgroundColor = "paleTurquoise"
    } else {
      document.getElementById(balls[9][2]).style.visibility = "hidden"
      document.getElementById(balls[9][2]).value = 0
      game[9][2] = 0
      document.getElementById('frame10score').innerHTML = game[9][0] + game[9][1] + game[9][2]
    }

    if (game[9][1] == 10 || game[9][2] == 10) {
      document.getElementById("strike").play();
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