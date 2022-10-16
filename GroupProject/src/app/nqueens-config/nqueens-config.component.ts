import { Component, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ChessBoardComponent } from '../chess-board/chess-board.component';

@Component({
  selector: 'nqueensconfig',
  templateUrl: './nqueens-config.component.html',
  styleUrls: ['./nqueens-config.component.css']
})
export class NQueensConfigComponent implements OnInit {

  @ViewChild(ChessBoardComponent) chessBoard: ChessBoardComponent;

  maxSquares = 14;
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

  clearInput() {
    this.chessBoard.clearInput();
  }

  solveNQueens() {
    let route = '/solutions/' + this.nSquaresGenerated + '/';
    let myInput = this.chessBoard.getInput()

    if (myInput.length == 0) {
      route += '-1';
    }
    else {
      myInput.forEach((coord, index) => {
        route += coord[0] + '.' + coord[1];
        if (index < myInput.length - 1) {
          route += ',';
        }
      });
    }
    
    this.router.navigate([route]);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
