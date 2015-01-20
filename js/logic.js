// Game singleton
var Game = {
  turn: 'X',
  possibleMoves: 0,
  movesTaken: 0,
  gameOver: false,
  squaresToWin: 0
}

$(document).ready(function() {
  Game.squaresToWin = 5;
  generateGrid(25,25);
});

$(document).on('click', 'td', function() {
  turn($(this));
});

function generateGrid(x, y) {
  //Generate row
  for (var i=1; i<=y; i++) {
    $('<tr></tr>').attr('id', 'row-' + i).appendTo('.grid tbody');

    for (var j=1; j<=x; j++) {
      $('<td></td>').attr('width', '50').attr('height', '50').attr('align', 'center').attr('id', 'cell-' + j).appendTo('#row-' + i);
      Game.possibleMoves++;
    }
  }
}


function turn(cell) {
  if (!Game.gameOver) {
    if ( cell.text() == '' ) {
      cell.text(Game.turn);
      Game.turn = Game.turn === "X" ? "O" : "X";
      Game.movesTaken++;
      drawCheck();
      winCheck(cell);
    }
  }
  else {
    alert("This game has already ended. Try starting a new game.");
  }
}


// Any 3 marks in a row will win the game. Because the game board is variable, we need to
// Check one level higher to make sure there isn't a mark.
//        +-----+-----+------+
//        |  X  |     |      |
//        +-----+-----+------+
//        |     |  X  |      |
//        +-----+-----+------+
//        |     |     |  X   |
//        +-----+-----+------+
//  
// Lower right was the most recent play, so we need to check 2 rows up and two over to make sure that spot isn't checked
function winCheck(currentCell) {
  if (!Game.gameOver) {
    var currentMark = currentCell.text();
    var currentRow = parseInt(currentCell.parent().attr('id').split('-')[1]);
    currentCell = parseInt(currentCell.attr('id').split('-')[1]);

    // DIAGONAL TOP-RIGHT CHECK
    for (i=1; i<=Game.squaresToWin; i++) {
      if ( $('#row-' + (currentRow - i)).find('#cell-' + (currentCell + i)).text() == currentMark ) {
        console.log( 'row ' + (currentRow - i) + ' cell ' + (currentCell + i) );
        console.log(i);
        if (i == Game.squaresToWin) {
          setWin(currentMark);
        }
      }
      else {
        // CALL ANOTHER CHECK
        console.log(i + "END");
        return;
      }
    }

    // All the readable positions 
    var left            = $('#row-' + currentRow).find('#cell-' + (currentCell - 1)).text();
    var topLeft         = $('#row-' + (currentRow - 1)).find('#cell-' + (currentCell - 1)).text();
    var top             = $('#row-' + (currentRow - 1)).find('#cell-' + currentCell).text();
    var topRight        = $('#row-' + (currentRow - 1)).find('#cell-' + (currentCell + 1)).text();
    var right           = $('#row-' + currentRow).find('#cell-' + (currentCell + 1)).text();
    var bottomRight     = $('#row-' + (currentRow + 1)).find('#cell-' + (currentCell + 1)).text();
    var bottom          = $('#row-' + (currentRow + 1)).find('#cell-' + currentCell).text();
    var bottomLeft      = $('#row-' + (currentRow + 1)).find('#cell-' + (currentCell - 1)).text();

    var farLeft         = $('#row-' + currentRow).find('#cell-' + (currentCell - 2)).text();
    var farTopLeft      = $('#row-' + (currentRow - 2)).find('#cell-' + (currentCell - 2)).text();
    var farTop          = $('#row-' + (currentRow - 2)).find('#cell-' + currentCell).text(); 
    var farTopRight     = $('#row-' + (currentRow - 2)).find('#cell-' + (currentCell + 2)).text();
    var farRight        = $('#row-' + currentRow).find('#cell-' + (currentCell + 2)).text();
    var farBottomRight  = $('#row-' + (currentRow + 2)).find('#cell-' + (currentCell + 2)).text();
    var farBottom       = $('#row-' + (currentRow + 2)).find('#cell-' + currentCell).text();
    var farBottomLeft   = $('#row-' + (currentRow + 2)).find('#cell-' + (currentCell - 2)).text();


    // Check diagonal top-left -> bottom-right
    if ( topLeft == currentMark && bottomRight == currentMark ) {
      setWin(currentMark);
    }

    // Check far diagonal top-left 
    if ( farTopLeft == currentMark && topLeft == currentMark ) {
      setWin(currentMark);
    }

    // Check far top
    if ( farTop == currentMark && top == currentMark ) {
      setWin(currentMark);
    }

    // Check far diagonal top-right
    if ( topRight == currentMark && farTopRight == currentMark ) {
      setWin(currentMark);
    }

    // Check diagonal top-right -> bottom-left
    if ( topRight == currentMark && bottomLeft == currentMark ) {
      setWin(currentMark);
    }

    // Check far left
    if ( farLeft == currentMark && left == currentMark ) {
      setWin(currentMark);
    }

    // Check far right
    if ( farRight == currentMark && right == currentMark ) {
      setWin(currentMark);
    }

    // Check horizontal
    if ( left == currentMark && right == currentMark ) {
      setWin(currentMark);
    }

    // Check vertical
    if ( top == currentMark && bottom == currentMark ) {
      setWin(currentMark);
    }

    // Check far bottom-right
    if ( farBottomRight == currentMark && bottomRight == currentMark ) {
      setWin(currentMark);
    }

    // Check far bottom-right
    if ( farBottomRight == currentMark && bottomRight == currentMark ) {
      setWin(currentMark);
    }

    // Check far bottom
    if ( bottom == currentMark && farBottom == currentMark ) {
      setWin(currentMark);
    }

    // Check far bottom-left
    if ( farBottomLeft == currentMark && bottomLeft ) {
      setWin(currentMark);
    }
  }
}

function drawCheck() {
  if (Game.movesTaken == Game.possibleMoves) {
    Game.gameOver = true;
    alert("Cat's game");
  }
}

function setWin(currentMark) {
  Game.gameOver = true;
  alert(currentMark + ' wins!');
}


function reset() {
  Game.turn = 1
}
