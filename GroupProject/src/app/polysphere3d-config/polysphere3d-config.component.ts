import { Component, OnInit } from '@angular/core';
import { createPolySpherePieces, createPyramidCooridate } from '../util/polySpheres';

@Component({
  selector: 'Polysphere3dConfig',
  templateUrl: './polysphere3d-config.component.html',
  styleUrls: ['./polysphere3d-config.component.css']
})
export class Polysphere3dConfigComponent implements OnInit {

  myPieces;
  pyramid;

  constructor() { 
    this.myPieces = createPolySpherePieces();
    this.pyramid = createPyramidCooridate();
  }

  ngOnInit(): void {
    // console.log(this.myPieces[1]);
    console.log(this.pyramid)
    this.myPieces[5].RotateX()
    let a = this.myPieces[5].shape._data
    for(let i=0; i<a.length; i++){
      console.log(a[i]);
    }
  }

}
