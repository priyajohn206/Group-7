import { Component, OnInit } from '@angular/core';
import { pi, sqrt } from 'mathjs';
import { Polysphere } from '../util/polySpheres';
import {Pyramid} from '../util/Pyramid';

@Component({
  selector: 'Polysphere3dConfig',
  templateUrl: './polysphere3d-config.component.html',
  styleUrls: ['./polysphere3d-config.component.css']
})

export class Polysphere3dConfigComponent implements OnInit {
  
  myPieces;
  pyramid;

  constructor() { 
    this.myPieces = this.createPolySpherePieces();
    this.pyramid = new Pyramid(3, 8, 3);
  };

// http://www.polyforms.eu/polyspheres/tetraspheres.html
  createPolySpherePieces() {
    let polyspheres = [];

    polyspheres.push(new Polysphere('A', '#FF0000', false, [[0,0,0],[1,0,0],[1,1,0],[2,1,0]]));
    polyspheres.push(new Polysphere('B', '#FF1493', true, [[0,0,0],[1,0,0],[1,1,0],[2,1,0]]));
    polyspheres.push(new Polysphere('C', '#FFC0CB', false, [[0,0,0],[1,0,0],[0,1,0],[1,1,0]]));
    polyspheres.push(new Polysphere('D', '#4169E1', true, [[0,0,0],[1,0,0],[0,1,0],[2,0,0]]));
    polyspheres.push(new Polysphere('E', '#FFD700', false, [[0,0,0],[1,0,0],[2,0,0],[3,0,0]]));

    polyspheres.push(new Polysphere('F', '#DA70D6', true, [[0,0,0],[1,0,0],[2,0,0],[2.5,sqrt(3/4),0]]));
    polyspheres.push(new Polysphere('G', '#9400D3', true, [[0,0,0],[1,0,0],[1.5,sqrt(3/4),0],[2.5,sqrt(3/4),0]]));
    polyspheres.push(new Polysphere('H', '#32CD32', true, [[0,0,0],[1,0,0],[1,1,0],[0.5,sqrt(3/4),0],[1.5,sqrt(3/4),0]]));
    polyspheres.push(new Polysphere('I', '#FF8C00', true, [[0,0,0],[1,0,0],[2,0,0],[0.5,sqrt(3/4),0]]));
    polyspheres.push(new Polysphere('J', '#006400', false, [[0,0,0],[0,1,0],[0.5,sqrt(3/4),0],[0.5,1+Math.sqrt(3/4),0]]));
    polyspheres.push(new Polysphere('K', '#FF7F50', false, [[0,0,0],[2,0,0],[0.5,sqrt(3/4),0],[1.5,sqrt(3/4),0]]));
    return polyspheres;
};

  ngOnInit(): void {
    // let pyramid = new Pyramid()
    // console.log(this.pyramid.coordinate)
    console.log(this.pyramid.legalPlace(this.myPieces[2].rotateX(2)))
    // console.log("123")
  }

}
