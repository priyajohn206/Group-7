import { Component, OnInit } from '@angular/core';
import { createPolySpherePieces, createPyrmidCooridate } from '../util/polySpheres';

@Component({
  selector: 'Polysphere3dConfig',
  templateUrl: './polysphere3d-config.component.html',
  styleUrls: ['./polysphere3d-config.component.css']
})
export class Polysphere3dConfigComponent implements OnInit {

  myPieces;
  prymid;

  constructor() { 
    this.myPieces = createPolySpherePieces();
    this.prymid = createPyrmidCooridate();
  }

  ngOnInit(): void {
    // console.log(this.myPieces[0]);
    
    console.log(this.prymid);
  }

}
