import { createPolySpherePieces } from '../util/polySpheres';
import { solutionGenerator } from 'dlxlib';
let dlxlib = require('dlxlib');

let boardSizeX = 11;
let boardSizeY = 5;

let myPieces;
let matrix: number[][]

function checkPositions(piece) {

    for (let i = 0; i < boardSizeY; i++) {
        for (let j = 0; j < boardSizeX; j++) {
            let myPositions = [];
            let isLegal = true;
            piece.otherCoordinates.forEach(coordinate => {
                let currentCoordinate = [coordinate[0] + j, coordinate[1] + i];
                if (currentCoordinate[0] < 0 || currentCoordinate[0] >= boardSizeX || currentCoordinate[1] < 0 || currentCoordinate[1] >= boardSizeY) {
                    isLegal = false;
                    return;
                }
                myPositions.push(currentCoordinate);
            });
            if (isLegal) {
                let row = new Array(myPieces.length + boardSizeX * boardSizeY);
                for (let k = 0; k < row.length; k++) {
                    row[k] = 0;
                }
                row[piece.character.charCodeAt(0) - 'A'.charCodeAt(0)] = 1;
                myPositions.forEach(position => {
                    row[myPieces.length + position[1] * boardSizeX + position[0]] = 1;
                });
                matrix.push(row);
            }
        }
    }

}

function populateMatrix() {

    matrix = [];

    myPieces.forEach(piece => {

        for (let i = 0; i < 4; i++) {
            if(piece.character == 'G' && i > 1){
                piece.rotateRight();
                piece.rotateRight();
                break;
            }
            checkPositions(piece);
            piece.rotateRight();
        }
    
        if (!piece.canFlip) {
            return;
        }
    
        piece.flipHorizontal();
        for (let i = 0; i < 4; i++) {
            if(piece.character == 'G' && i > 1){
                piece.rotateRight();
                piece.rotateRight();
                break;
            }
            checkPositions(piece);
            piece.rotateRight();
        }
        piece.flipHorizontal();
    
    });

    return matrix;

}

function solvePolyspheres(pieceCharacters, pieceCoordinates, useIterator) { 

    myPieces = createPolySpherePieces();
    let matrix = populateMatrix();

    for (let i = matrix.length - 1; i >= 0; i--) {
        let hasDeleted = false;
        for (let j = 0; j < pieceCoordinates.length; j++) {
            if (matrix[i][myPieces.length + pieceCoordinates[j][1] * boardSizeX + pieceCoordinates[j][0]] == 1) {
                matrix.splice(i, 1);
                hasDeleted = true;
                break;
            }
            else {
                matrix[i].splice(myPieces.length + pieceCoordinates[j][1] * boardSizeX + pieceCoordinates[j][0], 1);
            }
        }
        if (hasDeleted) {
            continue;
        }
        for (let j = 0; j < pieceCharacters.length; j++) {
            if (matrix[i][pieceCharacters[j].charCodeAt(0) - 'A'.charCodeAt(0)] == 1) {
                matrix.splice(i, 1);
                break;
            }
            else {
                matrix[i].splice(pieceCharacters[j].charCodeAt(0) - 'A'.charCodeAt(0), 1);
            }
        }
    }

    if (useIterator) {
        let myGenerator = solutionGenerator(matrix);
        return [myGenerator, matrix];
    }
    else {
        let solutions = dlxlib.solve(matrix);
        return [solutions, matrix];
    }

}

export { solvePolyspheres };
