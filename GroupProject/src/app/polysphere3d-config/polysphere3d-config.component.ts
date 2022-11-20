import { Component, OnInit } from '@angular/core';
import { createPolySpherePieces } from '../util/polySpheres';

@Component({
  selector: 'Polysphere3dConfig',
  templateUrl: './polysphere3d-config.component.html',
  styleUrls: ['./polysphere3d-config.component.css']
})
export class Polysphere3dConfigComponent implements OnInit {

  myPieces;

  constructor() { 
    this.myPieces = createPolySpherePieces();
  }

  ngOnInit(): void {
    console.log(this.myPieces[0]);
    console.log(this.myPieces[1]);
  }

}
