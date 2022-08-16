var player1 = prompt('Player One: Enter your Name, you will be Yellow')
var player2 = prompt('Player Two: Enter your Name, you will be Red')

var player1Color = 'rgb(247, 236, 9)'//'rgb(86,151,255)' //blue
var player2Color = 'rgb(237,45,73)' //red

var currentPlayer = player1
var currentColor = player1Color

var table = $('table tr')
let endGame = false

$('#instruction').text(currentPlayer + ": it is your turn, please pick a column to drop your yellow chip.")


// Report Back to current color of a button
function grapColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = grapColor(5,colIndex); //initializing, start with 5
  for (var row = 5; row > -1; row--) {
    colorReport = grapColor(row,colIndex);
    if (colorReport === 'rgb(208, 201, 192)') {
      return row
    }
  }
}

function changeColor(bottomAvail,colIndex,currentColor) {
  table.eq(bottomAvail).find('td').eq(colIndex).find('button').css('background-color',currentColor)
}

function matchingColor(color1, color2, color3, color4)
{
  return (color1 === color2 && color1 === color3 && color1 === color4 && color1 !== 'rgb(208, 201, 192)')
}

function horizontalWinCheck() {
  console.log('horizontalWinCheck')
  
  for (var row=5; row > -1; row--) {    
    for (var col = 0; col < 4; col ++) {
      if(matchingColor(grapColor(row,col), grapColor(row, col+1),grapColor(row,col+2), grapColor(row,col+3))){
        console.log("horizontalWinCheck")
        return true
      }      
    }    
  }
}

function verticalWinCheck() {
  for (var col=0; col < 7; col++) {
    for (var row=0; row < 3; row++) {
      if (matchingColor(grapColor(row, col), grapColor(row+1, col),grapColor(row+2, col),grapColor(row+3, col))) {
        console.log('verticalWinCheck')
        return true
      }
    }
  }
}

function diagonalWinCheck() {
  for (var col=0; col < 5; col++) {
    for(let row=0; row < 6; row++) {
      if (matchingColor(grapColor(row, col), grapColor(row+1, col+1),grapColor(row+2, col+2),grapColor(row+3, col+3))) {
        console.log("diagonal 1")
        return true
      } else if (matchingColor(grapColor(row, col), grapColor(row-1, col+1),grapColor(row-2, col+2),grapColor(row-3, col+3))) {
        console.log("diagonal 2")
        return true
      }
    }
  }
}

function gameEnd(winner) {
  let txt = winner + " has won! Refresh your browser to play again!"
  $('div h1').text(txt).css('font-size', '3.5em')

  $('div h2').text('')
  $('div p').text('')
  endGame = true
}

$('.tictactoe button').on('click', function() {
  console.log('TURN: ' + currentPlayer)
  var currentTD = $(this).parent()
  var colIndex = $(this).closest('td').index() //currentTD.parent().children().index(currentTD);
  console.log('Column: ' + colIndex);

  // Get back bottom available row to change
  var bottomAvail = checkBottom(colIndex);
  console.log('bottomAvail ' + bottomAvail)

   // Drop the chip in that column at the bottomAvail Row
   changeColor(bottomAvail,colIndex,currentColor);

  // Check for a win or a tie.
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    console.log('WINNER')
    gameEnd(currentPlayer);
  }

  if (!endGame) {
    if (currentPlayer === player1) {
      currentPlayer = player2
      currentColor = player2Color
    } else if (currentPlayer === player2) {
      currentPlayer = player1
      currentColor = player1Color
    }

    if (currentPlayer === player1)
      $('#instruction').text(currentPlayer + ": it is your turn, please pick a column to drop your Yellow chip.")
    else if (currentPlayer === player2)
      $('#instruction').text(currentPlayer + ": it is your turn, please pick a column to drop your Red chip.")
  }


})

