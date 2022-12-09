import { createPolyminoes } from './polySpheres3d';
import { createPyramid } from './board';
import { solutionGenerator } from 'dlxlib';
let dlxlib = require('dlxlib');

let myPieces;
let myShape;
let solutions = [];

function checkPositions(piece) {

    let returnSolutions = [];

    for (let i = 0; i < 55; i++) {

        let potentialSolution = myShape.legalPlace(piece, i);
        if (potentialSolution == null || potentialSolution == undefined) {
            continue;
        }

        let row = new Array(myPieces.length + 55); for (let i = 0; i < row.length; i++) { row[i] = 0; }
        potentialSolution.forEach(index => {
            row[index] = 1;
        });
        row[piece.character.charCodeAt(0) - 'A'.charCodeAt(0) + 55] = 1;

        returnSolutions.push(row);

    }

    return returnSolutions;

}

function populateMatrix() {

    myPieces.forEach(piece => {

        let characterSolutions = [];


        for (let i = 0; i < 4; i++) {
            if(piece.character == 'G' && i > 1){
                piece.rotateRight();
                piece.rotateRight();
                break;
            }
            characterSolutions = characterSolutions.concat(checkPositions(piece));
            piece.rotateRight();
        }

        if (piece.canFlip) {

            piece.flipHorizontal();
            for (let i = 0; i < 4; i++) {
                if(piece.character == 'G' && i > 1){
                    piece.rotateRight();
                    piece.rotateRight();
                    break;
                }
                characterSolutions = characterSolutions.concat(checkPositions(piece));
                piece.rotateRight();
            }
            piece.flipHorizontal();

        }

        for (let i = 0; i < 4; i++) {

            let mySolutions = [];

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltNW();
            mySolutions = mySolutions.concat(checkPositions(piece));

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltNE();
            mySolutions = mySolutions.concat(checkPositions(piece));

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltSW();
            mySolutions = mySolutions.concat(checkPositions(piece));

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltSE();
            mySolutions = mySolutions.concat(checkPositions(piece));

            for (let i = 0; i < mySolutions.length; i++) {
                let isUnique = true;
                for (let j = 0; j < characterSolutions.length; j++) {
                    if (mySolutions[i].toString() == characterSolutions[j].toString()) {
                        isUnique = false;
                    }
                }
                if (isUnique) {
                    characterSolutions.push(mySolutions[i]);
                }
            }

        }

        characterSolutions.forEach(solution => {
            solutions.push(solution);
        });

    });

    return solutions;

}

function checkForDuplicatePositions() {
    myPieces.forEach(piece => {

        if (piece.character != 'K') { return; }

        solutions = [];
        let mySolutions = [];

        for (let i = 0; i < 4; i++) {
            if(piece.character == 'G' && i > 1){
                piece.rotateRight();
                piece.rotateRight();
                break;
            }
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "rotateRight" + (i + 1), piece.character);
            piece.rotateRight();
        }

        if (piece.canFlip) {

            piece.flipHorizontal();
            for (let i = 0; i < 4; i++) {
                if(piece.character == 'G' && i > 1){
                    piece.rotateRight();
                    piece.rotateRight();
                    break;
                }
                mySolutions = checkPositions(piece);
                compareSolutions(mySolutions, "flipped" + (i + 1), piece.character);
                piece.rotateRight();
            }
            piece.flipHorizontal();

        }

        for (let i = 0; i < 4; i++) {

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltNW();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltNW " + i + " rotations", piece.character);

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltNE();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltNE " + i + " rotations", piece.character);

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltSW();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltSW " + i + " rotations", piece.character);

            piece.resetShape();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltSE();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltSE " + i + " rotations", piece.character);

        }

        for (let i = 0; i < 4; i++) {

            piece.resetShape();
            piece.flipHorizontal();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltNW();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltNW flipped " + i + " rotations", piece.character );

            piece.resetShape();
            piece.flipHorizontal();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltNE();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltNE flipped " + i + " rotations", piece.character);

            piece.resetShape();
            piece.flipHorizontal();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltSW();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltSW flipped " + i + " rotations", piece.character);

            piece.resetShape();
            piece.flipHorizontal();
            for (let j = 0; j < i; j++) {
                piece.rotateRight();
            }
            piece.tiltSE();
            mySolutions = checkPositions(piece);
            compareSolutions(mySolutions, "tiltSE flipped " + i + " rotations", piece.character);

        }

    });

}

function compareSolutions(solutionsToCompare, message, char) {


    let hits = 0;
    let misses = 0;

    for (let i = 0; i < solutionsToCompare.length; i++) {
        for (let j = 0; j < solutions.length - solutionsToCompare.length; j++) {
        
            if (solutionsToCompare[i].toString() == solutions[j].toString()) {
                hits += 1;
            }
            else {
                misses++;
            }

        }
    }

    console.log(char + ": ", message + ",", hits + "/" + solutionsToCompare.length + " duplicate solutions, ", misses + " misses, ", hits + misses + " solutions compared");
    return [hits, misses];

}

function printPiece(coordinates) {
    let a = new Array(7*7); for (let i = 0; i < a.length; i++) a[i] = 0;
    coordinates.forEach(coordinate => {
        a[(coordinate[0] + 3) + (coordinate[1] + 3) * 7] = 1;
    });
    let string = "";
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (a[j + i * 7] == 1) {
                string += "X";
            }
            else {
                string += "-";
            }
        }
        string += "\n";
    }
    console.log(string)
}

function solvePyramid(pieceCharacters, pieceCoordinates, useIterator) {

    

    myPieces = createPolyminoes();
    myShape = createPyramid();

    let matrix = populateMatrix();

    for (let i = matrix.length - 1; i >= 0; i--) {

        let hasDeleted = false;

        for (let j = 0; j < pieceCharacters.length; j++) {
            if (matrix[i][pieceCharacters[j].charCodeAt(0) - 'A'.charCodeAt(0) + 55] == 1) {
                matrix.splice(i, 1);
                hasDeleted = true;
                break;
            }
            else {
                matrix[i].splice(pieceCharacters[j].charCodeAt(0) - 'A'.charCodeAt(0) + 55, 1);
            }
        }

        if (hasDeleted) {
            continue;
        }

        for (let j = pieceCoordinates.length - 1; j >= 0; j--) {
            if (matrix[i][pieceCoordinates[j]] == 1) {
                matrix.splice(i, 1);
                break;
            }
            else {
                matrix[i].splice(pieceCoordinates[j], 1);
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

export { solvePyramid };
