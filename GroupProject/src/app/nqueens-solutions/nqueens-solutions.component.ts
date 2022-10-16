import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { findAllSolutions } from '../util/NQueensCompletion';

@Component({
  selector: 'nqueenssolutions',
  templateUrl: './nqueens-solutions.component.html',
  styleUrls: ['./nqueens-solutions.component.css']
})
export class NQueensSolutionsComponent implements OnInit {

  nSquares: number;
  myInput: number[][] = [];

  solutionList = [];
  currentSolution = [];
  currentSolutionIndex;
  inputSolutionIndex = 1;

  increment() {
    this.jump(this.currentSolutionIndex + 1);
  }

  decrement() {
    this.jump(this.currentSolutionIndex - 1);
  }

  random() {
    this.jump(Math.floor(Math.random() * this.solutionList.length));
  }

  jumpTo() {
    this.jump(this.inputSolutionIndex -1);
  }

  jump(mySolutionIndex) {
    if (mySolutionIndex > this.solutionList.length - 1) {
      mySolutionIndex = this.solutionList.length - 1;
    }
    else if (mySolutionIndex < 0) {
      mySolutionIndex = 0;
    }
    this.inputSolutionIndex = mySolutionIndex + 1;
    this.currentSolutionIndex = mySolutionIndex;
    this.currentSolution = this.solutionList[this.currentSolutionIndex];
    console.log(this.currentSolutionIndex)
  }

  solveNQueens() {
    this.solutionList = findAllSolutions(this.nSquares, this.myInput);
    this.currentSolution = this.solutionList[0];
    this.currentSolutionIndex = 0;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.nSquares = +this.route.snapshot.paramMap.get('n');
    this.myInput = [];

    let rawData = this.route.snapshot.paramMap.get('queens');

    if (rawData != '-1') {
      let coords = rawData.split(',');
      coords.forEach(coord => {
        let rowCol = coord.split('.');
        this.myInput.push([+rowCol[0], +rowCol[1]]);
      });
    }

    this.solveNQueens();

  }

}
