
let rows = 50
let cols = 80
let random = 0.5
let refreshInterval = 500
let cellsize = 15
let alivecolor = "#009900"
let deadcolor = "#ff3300"
let backgroundcolor = "ffffff"
let timerOnOff = "off"

let board = createBoard (rows, cols)

//draws html on screen
function drawBoard () {
  var newHTML = '<table>'
  for (var i = 0; i < rows; i++) {
    newHTML += '<tr>'
    for (var j = 0; j < cols; j++) {
      if (board[i][j] == true) {
        newHTML += '<td class="alive cell" onclick="toggler(' + i + ',' + j + ')"></td>'
      } else {
        newHTML += '<td class="dead cell" onclick="toggler(' + i + ',' + j + ')"></td>'
      }
    }
    newHTML += '</tr>'
  }
  newHTML += '</table>'
  document.getElementById('boardContainer').innerHTML = newHTML
  setCellSize()
  changeAlive()
  changeDead()
}

randomize(board)

var timer
function go () {
  timerOnOff = "on"
  timer = setInterval(() => {
      drawBoard()
      board = nextBoard(board)
    }, refreshInterval)
}

function stop () {
  timerOnOff = "off"      
  clearInterval(timer)
}

function randomize (board) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (Math.random() < random) {
        board[i][j] = true
      } else {
        board[i][j] = false
      }
    }
  }
  drawBoard()
}

function setRows() {
  rows = Number(document.getElementById("rows").value)
  board = createBoard (rows, cols, random)
  randomize(board)
}

function setCols() {
  cols = Number(document.getElementById("cols").value)
  board = createBoard (rows, cols, random)
  randomize(board)
}

function aliveRandom() {
  random = Number(document.getElementById("aliveCells").value) / 100
  randomize(board)
}

function changeBackground() {
  document.body.style.backgroundColor = document.getElementById("backgroundColor").value
}

function changeAlive () {
  var x = document.getElementsByClassName("alive")
  alivecolor = document.getElementById("aliveColor").value
  for (var i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = alivecolor
  }
}

function changeDead () {
  var x = document.getElementsByClassName("dead")
  deadcolor = document.getElementById("deadColor").value
  for (var i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = deadcolor
  }
}

function setCellSize () {
  var x = document.getElementsByClassName("cell")
  cellsize = document.getElementById("cellSize").value
  for (var i = 0; i < x.length; i++) {
    x[i].style.width = cellsize + 'px'
    x[i].style.height = cellsize + 'px'
  }
}

function changeRefresh() {
  refreshInterval = document.getElementById("refresh").value * 1000
  if (timerOnOff == "on") {
    stop()
    go()
  }
}

function toggler(row, col) {
  if (board[row][col] == true) {
    board[row][col] = false
  } else {
    board[row][col] = true
  }
  drawBoard()
}

function reset(board) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
        board[i][j] = false
    }
  }
  drawBoard()
}


function countAliveNeighbours (cellRow, cellColumn, board) {
  var neighbours = getNeighbours(cellRow, cellColumn, board)
  var answer = 0

  for (var i = 0; i < neighbours.length; i++) {
      if (neighbours[i] == true) {
          answer++
      }
  }
  return answer
}

function createBoard (rows, cols) {
  let matrix = new Array ()
  for (let x = 0; x < rows; x++){
    matrix[x] = new Array ()
    for (let y = 0; y < cols; y++){
      matrix[x][y] = false
    } 
  } return matrix
}

function getNeighbours (cellRow, cellColumn, board) {
   
  var answer = []
  var rubbish = []
  for (var i = cellRow - 1; i < cellRow + 2; i++) {
      for (var j = cellColumn - 1; j < cellColumn + 2; j++) {
          if (indicesAreOutOfBounds([i], [j], board) == false && i == cellRow && j == cellColumn) {
                  rubbish.push(board[i][j])
              } else if (indicesAreOutOfBounds([i], [j], board) == false) {
                  answer.push(board[i][j])
          }
      }
  }
  return answer
  }

function indicesAreOutOfBounds (rowIndex, columnIndex, array) {
  return isOutOfBounds(rowIndex, array.length) || isOutOfBounds(columnIndex, array[0].length)
}

function isOutOfBounds (index, array) {
  return index < 0 || index >= array
}

function isOverPopulated (neighbourCount) {
  return neighbourCount > 3
}

function isRessurectable (neighbourCount) {
  return neighbourCount == 3
}

function isUnderPopulated (neighbourCount) {
  return neighbourCount < 2
}

function nextBoard (currentBoard) {
  return currentBoard.map((row, cellRow) => row.map((cell, cellColumn) => nextCellState(cell, countAliveNeighbours(cellRow, cellColumn, currentBoard))))
}

function nextCellState (cellState, neighbourCount) {
  if (cellState == true) {
      if (isOverPopulated(neighbourCount) == true) {
          return false
      }
      if (isUnderPopulated(neighbourCount) == true) {
          return false
      } else {
          return true
      }
  } else if (cellState == false && isRessurectable(neighbourCount) == true) {
      return true
  } else {
      return false
  }
}

//super secret functionality you discovered just by scrolling
//actually just patterns that take up lots of room

var menu = document.getElementById("patterns");

function changePattern() {
  if (menu.value == '1') {
    testPattern()
  } else if (menu.value == '2') {
    bandersnatch()
  }
}

function testPattern() {
  reset(board)
  for (var i = 2; i < rows - 3; i+=12) {
    for (var j = 2; j < cols - 3; j+=6) {
        board[i][j] = true
        board[i][j+1] = true
        board[i][j+2] = true
        board[i+4][j] = true
        board[i+5][j] = true
        board[i+6][j] = true
    }
  }
  drawBoard()
}

function bandersnatch() {
  reset(board)
  board[16][16] = true
  board[17][17] = true
  board[17][18] = true
  board[18][16] = true
  board[18][17] = true

  board[39][18] = true
  board[37][19] = true
  board[38][19] = true
  board[39][19] = true
  board[36][20] = true
  board[36][21] = true
  board[37][21] = true
  
  board[22][31] = true
  board[23][31] = true
  board[22][32] = true
  board[23][32] = true

  board[44][35] = true
  board[45][35] = true
  board[44][36] = true
  board[45][37] = true

  board[33][36] = true
  board[34][36] = true
  board[32][37] = true
  board[35][37] = true
  board[33][38] = true
  board[35][38] = true
  board[34][39] = true

  board[38][44] = true
  board[39][44] = true
  board[38][45] = true
  board[39][45] = true

  board[31][46] = true
  board[32][46] = true
  board[31][47] = true
  board[32][47] = true

  board[24][43] = true
  board[24][44] = true
  board[24][46] = true
  board[23][43] = true
  board[23][44] = true
  board[23][46] = true
  board[23][47] = true
  board[23][48] = true
  board[22][49] = true
  board[21][43] = true
  board[21][44] = true
  board[21][46] = true
  board[21][47] = true
  board[21][48] = true
  board[20][44] = true
  board[20][46] = true
  board[19][44] = true
  board[19][46] = true
  board[18][45] = true
  
  drawBoard()
}