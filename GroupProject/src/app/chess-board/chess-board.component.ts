import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ChessBoard',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  @Input() nSquares: number;

  numArray = [];//[8, 7, 6, 5, 4, 3, 2, 1];
  charArray = [];//['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  queens = [[5, 5]];
  //queens = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]];
  //queens = [[5, 5]];

  getColour(i, j) {
    if ((i + j) % 2 == 0) {
      return "#F0D9B5";
    }
    else {
      return "#B58863";
    }
  }

  showQueen(i, j) {
    for (let n = 0; n < this.queens.length; n++) {
      if (this.queens[n][0] == i && this.queens[n][1] == j) {
        return true;
      }
    }
    return false
  }

  addQueen(i, j) {
    
    let foundQueen = -1;

    for (let n = 0; n < this.queens.length; n++) {
      if (this.queens[n][0] == i && this.queens[n][1] == j) {
        console.log(this.queens[n][0], this.queens[n][1])
        foundQueen = n;
        break;
      }
    }

    if (foundQueen == -1) {
      this.queens.push([i, j]);
    }
    else {
      this.queens.splice(foundQueen, 1);
    }

  }

  constructor() { }

  createBoard() {

    this.numArray = [];
    this.charArray = [];

    for (let i = this.nSquares; i > 0; i--) {
      this.numArray.push(i);
      this.charArray.push(String.fromCharCode(65 + this.nSquares - i));
    }

  }

  ngOnInit(): void {
    this.createBoard()
  }

  ngOnChanges() {
    this.createBoard()
  }

}
