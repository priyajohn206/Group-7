import { Component, OnInit } from '@angular/core';
import { createPolySpherePieces } from '../util/polySpheres';

@Component({
  selector: 'Polysphere3dConfig',
  templateUrl: './polysphere3d-config.component.html',
  styleUrls: ['./polysphere3d-config.component.css']
})
export class Polysphere3dConfigComponent implements OnInit {

  myPieces;

  constructor() { }

  ngOnInit(): void {

    this.myPieces = createPolySpherePieces();
    console.log(this.myPieces[0].print());

  }

}