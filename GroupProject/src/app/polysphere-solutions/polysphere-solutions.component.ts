import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { solvePolyspheres } from '../util/polySphereSolver';
import { createPolySpherePieces } from '../util/polySpheres';

@Component({
  selector: 'app-polysphere-solutions',
  templateUrl: './polysphere-solutions.component.html',
  styleUrls: ['./polysphere-solutions.component.css']
})
export class PolysphereSolutionsComponent implements OnInit {

  boardSizeX = 11;
  boardSizeY = 5;
  myBoard = Array(this.boardSizeX * this.boardSizeY).fill(0).map((x,i)=>i);
  myPieces = createPolySpherePieces();

  currentSolutionIndex = 0;
  inputSolutionIndex = 1;

  missingFields = [];
  board: string[][];
  usingGenerator = false;
  solutionGenerator = undefined;
  solutions = [];
  matrix = [];

  getBoardStyle() {
    return {
      'display': 'grid',
      'grid-template-columns': 'repeat(' + this.boardSizeX + ', 1fr)',
      'gap': '5px'
    }
  }

  increment() {
    this.jump(this.currentSolutionIndex + 1);
  }

  decrement() {
    this.jump(this.currentSolutionIndex - 1);
  }

  random() {
    this.jump(Math.floor(Math.random() * this.solutions.length));
  }

  jumpTo() {
    this.jump(this.inputSolutionIndex -1);
  }

  jump(mySolutionIndex) {
    if (mySolutionIndex > this.solutions.length - 1) {
      mySolutionIndex = this.solutions.length - 1;
    }
    else if (mySolutionIndex < 0) {
      mySolutionIndex = 0;
    }
    this.inputSolutionIndex = mySolutionIndex + 1;
    this.currentSolutionIndex = mySolutionIndex;
    //this.generateCurrentSolution();
  }

  generateCurrentSolution() {
    let solvedBoard = this.board;
    let myCurrentSolution = this.solutions[this.currentSolutionIndex];
    let myMissingFields = this.missingFields;
    let solutionPieces = [];
    myCurrentSolution.forEach((solution) => {
      solutionPieces.push(this.matrix[solution]);
    });
    solutionPieces.forEach((solutionPiece) => {
      let currentCharacter;
      for (let i = 0; i < solutionPiece.length; i++) {
        if (solutionPiece[i] != 0) {
          if (myMissingFields[i] < 12) {
            currentCharacter = String.fromCharCode(myMissingFields[i] + 'A'.charCodeAt(0));
          }
          else {
            let currentCoord = [0, 0];
            let currentIndex = myMissingFields[i] - 12;
            while(currentIndex > 10) {
              currentCoord[1]++;
              currentIndex -= 11;
            }
            while(currentIndex > 0) {
              currentCoord[0]++;
              currentIndex--;
            }
            solvedBoard[currentCoord[1]][currentCoord[0]] = currentCharacter;
          }
        }
      }
    });
    let UIBoard = document.querySelectorAll<HTMLElement>(".cell");
    for (let i = 0; i < solvedBoard.length; i++) {
      for (let j = 0; j < solvedBoard[i].length; j++) {
        let myColour;
        this.myPieces.forEach((piece) => {
          if (piece.character == solvedBoard[i][j]) {
            myColour = piece.colour;
          }
        });
        UIBoard[i * solvedBoard[i].length + j].style.backgroundColor = myColour;
      }
    }

  }

  generateNewSolution() {
    let iteratorResult = this.solutionGenerator.next();
    if (!iteratorResult.done) {
      this.solutions.push(iteratorResult.value);
      this.jump(this.solutions.length - 1);
    }
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    let rawData = this.route.snapshot.paramMap.get('board');
    let rows = rawData.split(":");

    let myData = [];

    rows.forEach(row => {
      myData.push(row.split(","));
    });
    this.board = myData;

    let characters = [];
    let coordinates = [];

    for (let i = myData.length - 1; i >= 0; i--) {
      for (let j = myData[i].length - 1; j >= 0; j--) {
        if (myData[i][j] != 0) {
          if(!characters.includes(myData[i][j])) {
            characters.push(myData[i][j]);
          }
          coordinates.push([j, i]);
        }
      }
    }

    for (let i = 0; i < 5 * 11 + 12; i++) {
      this.missingFields.push(i);
    }
    characters.forEach(character => {
      this.missingFields.splice(this.missingFields.indexOf(character.charCodeAt(0) - 'A'.charCodeAt(0)), 1);
    });
    coordinates.forEach(coordinate => {
      this.missingFields.splice(this.missingFields.indexOf(coordinate[0] + coordinate[1] * myData[0].length + 12), 1);
    });

    characters.sort().reverse();

    let result;
    if (characters.length < 2) {
      this.usingGenerator = true;
      result = solvePolyspheres(characters, coordinates, true);
      this.solutionGenerator = result[0];
      this.generateNewSolution();
    }
    else {
      result = solvePolyspheres(characters, coordinates, false);
      this.solutions = result[0];
    }

    this.matrix = result[1];

  }

  ngAfterViewChecked() {
    this.generateCurrentSolution();
  }

}
