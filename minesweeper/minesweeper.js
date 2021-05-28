document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
/* var board = {
  cells: [{row: 0, col: 0, isMine: true, hidden: true, isMarked: false}, 
          {row: 0, col: 1, isMine: true, hidden: true, isMarked: false}, 
          {row: 0, col: 2, isMine: true, hidden: true, isMarked: false}, 
          {row: 1, col: 0, isMine: true, hidden: true, isMarked: false}, 
          {row: 1, col: 1, isMine: true, hidden: true, isMarked: false}, 
          {row: 1, col: 2, isMine: true, hidden: true, isMarked: false}, 
          {row: 2, col: 0, isMine: true, hidden: true, isMarked: false}, 
          {row: 2, col: 1, isMine: true, hidden: true, isMarked: false}, 
          {row: 2, col: 2, isMine: true, hidden: true, isMarked: false}]
} */
var board = {cells:[]};
function createBoard (rows, cols) {
  for (i = 0; i < rows; i++) {
    for (c = 0; c < cols; c++) {
      board.cells.push({row: i, col: c, isMine: true, hidden: true, isMarked: false})
}
}
}

function isitaMine () {
  for (var i = 0; i < board.cells.length; i++) {
    var number = Math.random();
    if (number < 0.25) {
      board.cells[i].isMine = true;
    } else {
      board.cells[i].isMine = false;
    }
  }
}
var userRows = prompt('How many rows do you want?');
var userCols = prompt('How many columns do you want?');

createBoard(userRows, userCols)
isitaMine()

function startGame () {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
var winCount = 0;

function checkForWin () {
  var count = 0;
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == true && board.cells[i].isMarked == false) {
      break;
    } else if (board.cells[i].isMine == false && board.cells[i].hidden == true) {
      break;
    } else {
      count++;
    }
  }
  if (count == board.cells.length) {
    lib.displayMessage('You win!');
    winCount++;
    displayScore (winCount, loseCount);
    document.getElementById("win").play();
    /*var again = confirm('You win! Do you want to play again?');
      if (again == true) {
        reset();
      }*/
    }
}

function reset () {
  var x = document.getElementsByClassName('board')
for (i = 0; i < board.cells.length; i++) {
  x[0].firstElementChild.remove()
}
  board = {cells:[]};
  createBoard(userRows, userCols);
  isitaMine();
  startGame();
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  for (i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      count++;
    }
  }
  return count;
}

function displayScore (winCount, loseCount) {
  document.getElementById('score').innerHTML = '<p>' + 'Won: ' + winCount + ' Lost: ' + loseCount + '</p>'
}