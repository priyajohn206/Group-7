import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ChessBoardSolved',
  templateUrl: './chess-board-solved.component.html',
  styleUrls: ['./chess-board-solved.component.css']
})
export class ChessBoardSolvedComponent implements OnInit {

  @Input() mySolution: number[];

  numArray = [];
  charArray = [];
  queens = [];

  getColour(i, j) {
    if ((i + j) % 2 == 0) {
      return "#F0D9B5";
    }
    else {
      return "#B58863";
    }
  }

  showQueen(i, j) {
    if (this.mySolution[i] == j) {
      return true;
    }
    return false;
  }

  constructor() { }

  createBoard() {

    this.numArray = [];
    this.charArray = [];

    for (let i = this.mySolution.length; i > 0; i--) {
      this.numArray.push(i);
      this.charArray.push(String.fromCharCode(65 + this.mySolution.length - i));
    }

  }

  ngOnInit(): void {
    this.createBoard()
  }

  ngOnChanges() {
    this.createBoard()
  }

}
