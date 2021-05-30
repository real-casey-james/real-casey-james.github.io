let game = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0, 0], [0, 0], [0, 0]]

let balls = [['ball1', 'ball2'], ['ball3', 'ball4'], ['ball5', 'ball6'], ['ball7', 'ball8'], ['ball9','ball10'], ['ball11', 'ball12'], ['ball13', 'ball14'], ['ball15','ball16'], ['ball17', 'ball18'], ['ball19', 'ball20', 'ball21']]

document.addEventListener("input", () => updateFrames(game))

function updateFrames (game) {
  //loop through each frame, get ball by id from balls array, update game array with user inputted scores
  for (var i = 0; i < 10; i++) {
    game[i][0] = Number(document.getElementById(balls[i][0]).value)
    game[i][1] = Number(document.getElementById(balls[i][1]).value)
  }
  //handle 3rd ball in 10th frame
  game[9][2] = Number(document.getElementById(balls[9][2]).value)
  //run scoregame and update total
  document.getElementById('score').innerHTML = scoreGame(game)
  //update user interface
  updateElements(game)
}

function updateElements (game) {
  //manipulate page elements based on user input
  for (var i = 0; i < 9; i++) {
    //loop through each frame
    //update other ball max based on current ball
    document.getElementById(balls[i][0]).max = 10 - game[i][1]
    document.getElementById(balls[i][1]).max = 10 - game[i][0]
    //update frame score
    document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreFrame(game[i])

    if (game[i][0] == 10 && game[i+1][0] == 10 && i != 8) {
      //if its a double strike (and not the 9th frame), hide second ball, change frame color, show strike text, update frame score
      document.getElementById(balls[i][1]).style.visibility = "hidden"
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "paleGreen"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = "STRIKE!"
      strikeSound(i)
      document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreDoubleStrike([game[i], game[i+1], game[i+2]])
    } else if (game[i][0] == 10) {
      //if its a strike, hide second ball, change frame color, show strike text, update frame score
      document.getElementById(balls[i][1]).style.visibility = "hidden"
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "paleGreen"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = "STRIKE!"
      strikeSound(i)
      document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreStrike([game[i], game[i+1]])
    } else if (game[i][0] + game[i][1] == 10) {
      //if its a spare, change frame color, show spare text, update frame score
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "paleTurquoise"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = "SPARE!"
      document.getElementById('frame' + (i + 1) + 'score').innerHTML = scoreSpare([game[i], game[i+1]])
    } else {
      //put everything back if it isn't a strike or a spare anymore
      document.getElementById(balls[i][1]).style.visibility = "visible"
      document.getElementById('frame' + (i + 1)).style.backgroundColor = "#fdb768"
      document.getElementById('frame' + (i + 1) + 'text').innerHTML = ""
      strikes[i] = false
    }
  }
  //deal with the last frame
  //update ball max, update frame score
    document.getElementById(balls[9][0]).max = 10 - game[9][1]
    document.getElementById(balls[9][1]).max = 10 - game[9][0]
    document.getElementById('frame10score').innerHTML = game[9][0] + game[9][1] + game[9][2]
    
    if (game[9][0] == 10) {
      //if first ball of last frame is a strike, allow second ball to be rolled, show third ball, change frame color
      document.getElementById('ball20').max = 10
      document.getElementById(balls[9][2]).style.visibility = "visible"
      document.getElementById('frame10').style.backgroundColor = "paleGreen"
      strikeSound(i)
    } else if (game[9][0] + game[9][1] == 10) {
      //if last frame is a spare, show third ball, change frame color
      document.getElementById(balls[9][2]).style.visibility = "visible"
      document.getElementById('frame10').style.backgroundColor = "paleTurquoise"
    } else {
      //if last frame isn't a strike or spare anymore, put everything back, including setting third ball to 0 and updating scores
      document.getElementById(balls[9][2]).style.visibility = "hidden"
      document.getElementById(balls[9][2]).value = 0
      game[9][2] = 0
      document.getElementById('frame10score').innerHTML = game[9][0] + game[9][1] + game[9][2]
      document.getElementById('frame10').style.backgroundColor = "#fdb768"
      document.getElementById('score').innerHTML = scoreGame(game)
    }

    if (game[9][1] == 10) {
      strikeSound(10)
    }

    if (game[9][2] == 10) {
      strikeSound(11)
    }

    //if perfect game then say so, and play sound
  if (scoreGame(game) == 300) {
    document.getElementById('score').innerHTML = scoreGame(game) + '<br> PERFECT GAME!'
    document.getElementById("perfect").play();
  }
}

let strikes = [false, false, false, false, false, false, false, false, false, false, false, false, false]

function strikeSound(frame) {
  if (strikes[frame] == false) {
    document.getElementById("strike").play();
    strikes[frame] = true
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

function scoreGame (score) {
  var total = 0
  for (var i = 0; i < score.length; i++) {
      if (score[i][0]+score[i][1] !== 10) {
        total += score[i][0] + score[i][1]
    } else if (score[i][0] === 10) {
          if (score[i + 1][0] + score[i + 1][1] !== 10) {
            total += score[i][0] + score[i + 1][0] + score[i + 1][1]
        } else if (score[i + 1][0] === 10) {
            total += score[i][0] + score[i + 1][0] + score[i + 2][0]
        } else if (score[i + 1][0] + score[i + 1][1] === 10) {
            total += score[i][0] + score[i + 1][0] + score[i + 1][1]
        }
    } else if (score[i][0]+score[i][1] === 10) {
        total += score[i][0] + score[i][1] + score[i + 1][0]
    }
  }
  if (score[9][2] != undefined) {
    total += score[9][2]
  }
  return total
  }