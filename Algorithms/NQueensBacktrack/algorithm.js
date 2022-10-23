function find_all_arrangements(n) {
    const allRes = [];

    function isValid(row, col, board) {
  // Checks the ← direction
    for(var i=0; i<col; i++){
      if (board[row][i] === "q") {
        return false;
      }
    }

    // Checks the ↖ direction 
    for(var i=row, j=col; i>=0 && j>=0; i--, j--){
      if (board[i][j] === "q") {
        return false;
      }
    }

    // Checks the ↙ direction 
    for(var i=row, j=col; j>=0 && i<n; i++, j--){
      if (board[i][j] === "q") {
        return false;
      }
    }

    return true;
    };

    function find(col, result) {
        if (col === n) {
          // this deep clone the 2d array
          allRes.push(JSON.parse(JSON.stringify(result)));
          return;
        }
        for (let i = 0; i < n; i++) {
            if (isValid(i, col, result)) {
                result[i][col] = "q";
                find(col + 1, result)
                result[i][col] = "-";
            }
        }
    }

  function generateBoard(n){
    var board=[];
    for(var i=0; i<n; i++){
      board[i]=[];
      for(var j=0; j<n; j++){
        board[i][j]="-";
      }
    }
    return board;
  }

  var board = generateBoard(n);
  find(0, board);
  return allRes;
}

//-1 is none and define by col direction, while n = 5, [0,-1,-1,-1,-1]
function completeNQueen(userPlaced) {
  var showList = [];
  function chechCointain(board) {
    var noShow = false;
    for(let i=0; i<userPlaced.length; i++) {
      if(userPlaced[i]>=0 && board[i][userPlaced[i]]==="-") {
          noShow = true;
        }
    }   
    if(!noShow){
      showList.push(JSON.parse(JSON.stringify(board)));
    }
  }

  for(let i=0; i<allResult.length; i++) {
    let checkingboard = allResult[i]
    chechCointain(checkingboard)
  }
  return showList;
}

//13 is the maximun number of the input size.
let allResult = find_all_arrangements(5);
// console.log(allResult)
console.log(completeNQueen([-1,-1,-1, 3,-1]))