import { filter } from "rxjs";

let numColumns;
let solutions = [];

function isValid(row, col, board) {

    // Checks the ← direction
    for(let i = 0; i < col; i++){
        if (board[row][i] === "q") {
            return false;
        }
    }

    // Checks the ↖ direction 
    for(let i = row, j = col; i >= 0 && j >= 0; i--, j--){
        if (board[i][j] === "q") {
            return false;
        }
    }

    // Checks the ↙ direction 
    for(var i = row, j = col; j >= 0 && i < numColumns; i++, j--){
        if (board[i][j] === "q") {
            return false;
        }
    }

    return true;
}

function solve(col, board) {

    if (col === numColumns) {
        let queenPositions = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === "q") {
                    queenPositions.push(j);
                }
            }
        }
        solutions.push(queenPositions);
        return;
    }

    for (let i = 0; i < numColumns; i++) {
        if (isValid(i, col, board)) {
            board[i][col] = "q";
            solve(col + 1, board);
            board[i][col] = "-";
        }
    }

}

function generateBoard(nSquares, initialPositions) {

    let board = [];
    for (let i = 0; i < nSquares; i++) {
        board.push([]);
        for (let j = 0; j < nSquares; j++) {
            board[i].push("-");
        }
    }
    
    return board;

}

function findAllSolutions(nSquares, initialPositions) {

    numColumns = nSquares;
    solutions = [];

    let queenPositions = [];
    let isInvalid = false;

    for (let i = 0; i < numColumns; i++) {
        queenPositions.push(-1);
    }

    initialPositions.forEach(position => {
        if (queenPositions[position[0]] != -1) {
            console.log('Invalid Input');
            isInvalid = true;
        }
        queenPositions[position[0]] = position[1];
    });

    if (isInvalid) {
        return [];
    }

    let board = generateBoard(nSquares, initialPositions);
    solve(0, board);

    let filteredSolutions = [];

    solutions.forEach(solution => {
        let isValidSolution = true;
        solution.forEach((position, index) => {
            if (queenPositions[index] != -1 && position != queenPositions[index]) {
                isValidSolution = false;
            }
        })
        if (isValidSolution) {
            filteredSolutions.push(solution);
        }            
    });

    return filteredSolutions;

}

export { findAllSolutions };