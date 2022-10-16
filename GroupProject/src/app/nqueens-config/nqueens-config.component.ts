import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nqueensconfig',
  templateUrl: './nqueens-config.component.html',
  styleUrls: ['./nqueens-config.component.css']
})
export class NQueensConfigComponent implements OnInit {

  maxSquares = 25;
  minSquares = 4;

  nSquares= 8;
  nSquaresGenerated = 8;

  generateBoard() {
    if (this.nSquares > this.maxSquares) {
      this.nSquaresGenerated = this.maxSquares;
      this.nSquares = this.nSquaresGenerated;
    }
    else if (this.nSquares < this.minSquares) {
      this.nSquaresGenerated = this.minSquares;
      this.nSquares = this.nSquaresGenerated;
    }
    else {
      this.nSquaresGenerated = this.nSquares;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
