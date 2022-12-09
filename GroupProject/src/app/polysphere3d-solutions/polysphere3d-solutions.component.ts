import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createPolySpherePieces } from '../util/polySpheres';
import { solvePyramid } from '../util/polySphere3dSolver';
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';

@Component({
  selector: 'app-polysphere3d-solutions',
  templateUrl: './polysphere3d-solutions.component.html',
  styleUrls: ['./polysphere3d-solutions.component.css']
})
export class Polysphere3dSolutionsComponent implements OnInit {

  solutions = [];
  missingFields;
  missingCharacters = [];
  missingCoordinates = [];
  matrix = [];
  solutionGenerator

  currentSolutionIndex = 0;
  inputSolutionIndex = 1;
  usingGenerator = false;

  engine
  canvas
  scene
  camera
  light
  light2

  pyramid = [];
  myPieces;
  materials = [];

  initCameraAngle

  distanceBetweenPoints = 1;
  directionVector

  decrement() {
    this.jump(this.currentSolutionIndex - 1);
  }

  increment() {
    this.jump(this.currentSolutionIndex + 1);
  }

  random() {
    this.jump(Math.floor(Math.random() * this.solutions.length));
  }

  jumpTo() {
    this.jump(this.inputSolutionIndex -1);
  }

  jump(mySolutionIndex) {
    if (mySolutionIndex > this.solutions.length - 1) {
      mySolutionIndex = this.solutions.length - 1;
    }
    else if (mySolutionIndex < 0) {
      mySolutionIndex = 0;
    }
    this.inputSolutionIndex = mySolutionIndex + 1;
    this.currentSolutionIndex = mySolutionIndex;
    this.colourPyramid();
  }

  generateNewSolution(shouldJump) {
    let iteratorResult = this.solutionGenerator.next();
    if (!iteratorResult.done) {
      this.solutions.push(iteratorResult.value);
      if (shouldJump) {
        this.jump(this.solutions.length - 1);
      }
    }
  }

  sceneSetup() {

    this.canvas = document.querySelector("#babylonCanvas2");
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.calculateCameraInitAngle();
    this.camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, this.distanceBetweenPoints * 15, new Vector3(this.distanceBetweenPoints * 2, this.directionVector.y * 2, this.distanceBetweenPoints * 2));
    this.camera.setTarget(this.initCameraAngle);
    this.camera.attachControl(this.canvas, true);

    this.light = new HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
    this.light.intensity = 0.7;

  }

  calculateCameraInitAngle() {
    this.initCameraAngle = new Vector3(2 * this.distanceBetweenPoints, 0, 2 * this.distanceBetweenPoints);
  }

  calculateDistanceBetweenPointsVector() {
    this.directionVector = new Vector3(Math.sqrt(2), 2, Math.sqrt(2)).normalize().scale(this.distanceBetweenPoints);
  }

  pyramidSetup() {

    this.myPieces.forEach(piece => {
      let material = new StandardMaterial("material", this.scene);
      material.diffuseColor = Color3.FromHexString(piece.colour);
      this.materials.push(material);
    });

    for (let i = 0; i < 5; i++) {

      let initPoint = new Vector3(this.directionVector.x, this.directionVector.y, this.directionVector.z);
      initPoint = initPoint.scale(i);

      let y = [];

      for (let j = 0; j < 5 - i; j++) {

        let z = [];

        for (let k = 0; k < 5 - i; k++) {

          let sphere = Mesh.CreateSphere("pyramid", 16, 1, this.scene);
          let position = new Vector3(initPoint.x + j * this.distanceBetweenPoints, initPoint.y, initPoint.z + k * this.distanceBetweenPoints);
          position.add(new Vector3(j * this.distanceBetweenPoints, 0, k * this.distanceBetweenPoints));
          sphere.position = position;
          sphere.metadata = { coords: [k, j, i] }

          z.push(sphere);
        
        }

        y.push(z);

      }

      this.pyramid.push(y);

    }

    this.colourPyramid();

  }

  colourPyramid() {

    let myCurrentSolution = new Array(55);
    this.missingCoordinates.forEach(coordinate => {
      myCurrentSolution[coordinate[0]] = coordinate[1];
    });
    console.log(myCurrentSolution);
    
    console.log(this.missingCharacters, this.missingCoordinates)

    this.solutions[this.currentSolutionIndex].forEach(solution => {

      let array = this.matrix[solution];
      
      let charArray = array.slice(55 - this.missingCoordinates.length);
      this.missingCharacters.forEach((character) => {
        charArray.splice(character.charCodeAt(0) - "A".charCodeAt(0), 0, character);
      });

      let currchar;
      for (let i = 0; i < charArray.length; i++) {
        if (charArray[i] == 1) {
          currchar = String.fromCharCode(i + "A".charCodeAt(0));
        }
      }

      let indexArray = array.slice(0, 55 - this.missingCoordinates.length);
      this.missingCoordinates.forEach((coordinate) => {
        indexArray.splice(coordinate[0], 0, coordinate[1]);
      });

      for (let i = 0; i < indexArray.length; i++) {
        if (indexArray[i] == 1) {
          myCurrentSolution[i] = currchar;
        }
      }

    });

    for (let i = 0; i < myCurrentSolution.length; i++) {

      let coordinates = this.indexToCoords(i);
      this.pyramid[coordinates[2]][coordinates[1]][coordinates[0]].material = this.materials[myCurrentSolution[i].charCodeAt(0) - "A".charCodeAt(0)];
        
    }

  }

  decreaseDistance() {
    if (this.distanceBetweenPoints == 1) {
      return;
    }
    this.distanceBetweenPoints = Math.max(1, this.distanceBetweenPoints - 1);
    this.resetPyramid();
  }

  increaseDistance() {
    this.distanceBetweenPoints += 1;
    this.resetPyramid();
  }

  resetPyramid() {

    this.calculateDistanceBetweenPointsVector();

    this.pyramid.forEach((z, zIndex) => {

      let initPoint = new Vector3(this.directionVector.x, this.directionVector.y, this.directionVector.z);
      initPoint = initPoint.scale(zIndex);

      z.forEach((y, yIndex) => {
        y.forEach((x, xIndex) => {
          let position = new Vector3(initPoint.x + yIndex * this.distanceBetweenPoints, initPoint.y, initPoint.z + xIndex * this.distanceBetweenPoints);
          position.add(new Vector3(yIndex * this.distanceBetweenPoints, 0, xIndex * this.distanceBetweenPoints));
          x.position = position;
        });
      });
    });

    this.camera.setTarget(new Vector3(this.distanceBetweenPoints * 2, this.directionVector.y * 2, this.distanceBetweenPoints * 2));

  }

  coordsToIndex(coords) {

    let index = 0;
    let breaks = [0, 25, 41, 50, 54];

    index += breaks[coords[2]];

    index += coords[1] * (5 - coords[2]);
    index += coords[0];

    return index;

  }

  indexToCoords(index) {

    let coords = [0, 0, 0];
    let z = 0;
    let breaks = [25, 41, 50, 54];

    while (index >= breaks[z]) {
      z += 1;
    }
    coords[2] = z;
    if (z != 0) {
      index -= breaks[z - 1];
    }

    while (index >= 5 - z) {
      index -= 5 - z;
      coords[1] += 1;
    }

    while (index > 0) {
      index -= 1;
      coords[0] += 1;
    }

    return coords;
  
  }

  goBack() {
    this.engine.dispose();

    let myRoute = "/polysphere3d";
    this.router.navigate([myRoute]);
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    let data = this.route.snapshot.paramMap.get('board').split(",");

    let characters = [];
    let coordinates = [];
    
    data.forEach((value, index) => {
      if (value != "0") {
        if(!characters.includes(value)) {
          characters.push(value);
        }
        coordinates.push(index);
        this.missingCoordinates.push([index, value]);
      }
    });

    this.missingFields = new Array(67); for (let i = 0; i < this.missingFields.length; i++) { this.missingFields[i] = i; }
    characters.forEach((value) => {
      this.missingFields.splice(this.missingFields.indexOf(value.charCodeAt(0) - "A".charCodeAt(0) + 55), 1);
      this.missingCharacters.push(value);
    });
    coordinates.forEach((value) => {
      this.missingFields.splice(this.missingFields.indexOf(value), 1);
    });

    characters.sort().reverse();

    if (characters.length < 2) {
      this.usingGenerator = true;
      let result = solvePyramid(characters, coordinates, true);
      this.solutionGenerator = result[0];
      this.matrix = result[1];
      this.generateNewSolution(false);
    }
    else {
      let result = solvePyramid(characters, coordinates, false);
      this.solutions = result[0];
      this.matrix = result[1];
    }

    this.myPieces = createPolySpherePieces();

    this.calculateDistanceBetweenPointsVector();
    this.sceneSetup();
    this.pyramidSetup();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

  }

}
