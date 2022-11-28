import { Component, OnInit } from '@angular/core';
import { createPolySpherePieces, Pyramid } from '../util/polySpheres';

@Component({
  selector: 'Polysphere3dConfig',
  templateUrl: './polysphere3d-config.component.html',
  styleUrls: ['./polysphere3d-config.component.css']
})
export class Polysphere3dConfigComponent implements OnInit {

  myPieces;
  // pyramid;

  constructor() { 
    this.myPieces = createPolySpherePieces();
    // this.pyramid = new Pyramid();
  }

  ngOnInit(): void {
    let pyramid = new Pyramid()
    console.log(pyramid.coordinate)
    // console.log(pyramid.legalPlace(this.myPieces[2]))
  }

}
