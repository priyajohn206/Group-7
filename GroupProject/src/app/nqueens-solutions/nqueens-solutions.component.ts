import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nqueenssolutions',
  templateUrl: './nqueens-solutions.component.html',
  styleUrls: ['./nqueens-solutions.component.css']
})
export class NQueensSolutionsComponent implements OnInit {

  nSquares;
  myInput = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.nSquares = this.route.snapshot.paramMap.get('n');
    let rawData = this.route.snapshot.paramMap.get('queens');
    let coords = rawData.split(',');
    coords.forEach(coord => {
      let rowCol = coord.split('.');
      this.myInput.push([rowCol[0], rowCol[1]]);
    });
    console.log(this.myInput);
  }

}
