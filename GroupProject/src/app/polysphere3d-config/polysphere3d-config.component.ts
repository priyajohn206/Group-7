import { Component, OnInit } from '@angular/core';
import { createPolySpherePieces } from '../util/polySpheres';
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { PointerDragBehavior } from '@babylonjs/core/Behaviors/Meshes/pointerDragBehavior';

import "@babylonjs/core/Meshes/Builders/sphereBuilder";
import "@babylonjs/core/Meshes/Builders/groundBuilder";

@Component({
  selector: 'Polysphere3dConfig',
  templateUrl: './polysphere3d-config.component.html',
  styleUrls: ['./polysphere3d-config.component.css']
})
export class Polysphere3dConfigComponent implements OnInit {

  pyramid = [];
  pyramidState = [];
  myPieces;
  canvas;
  engine;
  scene
  camera;
  initCameraPos = new Vector3(20, 20, -20);
  initCameraAngle;
  light;
  actionManager;

  rootNodes = [];
  distanceBetweenPoints = 1;
  directionVector;
  hoverMaterial;

  selectedPieceIndex;
  selectedPieceCoords;
  selectedNode;

  isHit = false;
  relativeCoords;
  rootRelativeCoords;
  hitCoords;
  hitRootCoords;

  sceneSetup() {

    this.canvas = document.getElementById("babylonCanvas");
    this.engine = new Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
    this.scene = new Scene(this.engine);
    this.calculateCameraInitAngle();
    this.camera = new UniversalCamera("camera1", new Vector3(this.initCameraPos.x, this.initCameraPos.y, this.initCameraPos.z), this.scene);
    this.camera.setTarget(this.initCameraAngle);
    this.camera.keysUp.push(87); // W
    this.camera.keysDown.push(83); // S
    this.camera.keysLeft.push(65); // A
    this.camera.keysRight.push(68); // D
    this.camera.keysUpward.push(69); // E
    this.camera.keysDownward.push(81); // Q
    this.camera.inputs.attached.mouse.buttons = [2];
    this.camera.speed = 0.5;
    this.camera.angularSensibility = 4000;
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

    this.hoverMaterial = new StandardMaterial("material", this.scene);
    this.hoverMaterial.diffuseColor = Color3.FromHexString("#98FB98");

    for (let i = 0; i < 5; i++) {

      let initPoint = new Vector3(this.directionVector.x, this.directionVector.y, this.directionVector.z);
      initPoint = initPoint.scale(i);

      let y = [];
      let y2 = [];

      for (let j = 0; j < 5 - i; j++) {

        let z = [];
        let z2 = [];

        for (let k = 0; k < 5 - i; k++) {

          let sphere = Mesh.CreateSphere("pyramid", 16, 0.9, this.scene);
          let position = new Vector3(initPoint.x + j * this.distanceBetweenPoints, initPoint.y, initPoint.z + k * this.distanceBetweenPoints);
          position.add(new Vector3(j * this.distanceBetweenPoints, 0, k * this.distanceBetweenPoints));
          sphere.position = position;
          sphere.metadata = { coords: [k, j, i] }

          z.push(sphere);
          z2.push(0);
        
        }

        y.push(z);
        y2.push(z2);

      }

      this.pyramid.push(y);
      this.pyramidState.push(y2);

    }

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

  }

  pieceSetup() {

    this.myPieces = createPolySpherePieces();

    this.myPieces.forEach((piece, index) => {

      let degrees = Math.PI * 2 / 12 * index;
      let initialPoint = new Vector3(-Math.cos(degrees), 0, Math.sin(degrees)).normalize();
      initialPoint = initialPoint.scale(8 * this.distanceBetweenPoints).add(new Vector3(this.distanceBetweenPoints, 0, this.distanceBetweenPoints));

      let rootMaterial = new StandardMaterial("rootMaterial", this.scene);
      rootMaterial.alpha = 0;
      let root = Mesh.CreateSphere("root", 16, 0.1, this.scene);
      root.material = rootMaterial;
      root.position = new Vector3(initialPoint.x, initialPoint.y, initialPoint.z);
      this.rootNodes.push(root);

      this.createPiece(index);

      initialPoint.z += 5 * this.distanceBetweenPoints;      

    });

  }

  resetRootNodes() {

    this.rootNodes.forEach((root, index) => {
        
        let degrees = Math.PI * 2 / 12 * index;
        let initialPoint = new Vector3(-Math.cos(degrees), 0, Math.sin(degrees)).normalize();
        initialPoint = initialPoint.scale(8 * this.distanceBetweenPoints).add(new Vector3(this.distanceBetweenPoints, 0, this.distanceBetweenPoints));
  
        root.position = new Vector3(initialPoint.x, initialPoint.y, initialPoint.z);
  
    });

  }

  createPiece(index) {
    
    let currentPiece = this.myPieces[index];

    let offset = Vector3.Zero();
    let myChildren = this.rootNodes[index].getChildren();
    if (myChildren.length > 0) {

      offset = new Vector3(this.selectedNode.position.x, this.selectedNode.position.y, this.selectedNode.position.z).add(new Vector3(-this.selectedPieceCoords[0] * this.distanceBetweenPoints, 0, -this.selectedPieceCoords[1] * this.distanceBetweenPoints));
      
      myChildren.forEach(child => {
        child.dispose();
      });
    }

    for (let i = 0; i < currentPiece.size; i++) {
      for (let j = 0; j < currentPiece.size; j++) {

        if (currentPiece.shape[i * currentPiece.size + j] === 0) {
          continue;
        }
  
        let sphere = MeshBuilder.CreateSphere("sphere", { segments: 16, diameter: 1 }, this.scene);
        sphere.position = new Vector3(i * this.distanceBetweenPoints, 0, j * this.distanceBetweenPoints).add(offset);
  
        let material = new StandardMaterial("material", this.scene);
        material.diffuseColor  = Color3.FromHexString(currentPiece.colour);
  
        sphere.material = material;  
        sphere.parent = this.rootNodes[index];
        sphere.metadata = {};
        sphere.metadata.char = currentPiece.character;
        sphere.metadata.pieceIndex = currentPiece.character.charCodeAt(0) - "A".charCodeAt(0);
        sphere.metadata.index = [i, j];

        sphere.actionManager = new ActionManager(this.scene);
        sphere.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, (evt) => {
          //
        }));
        let pointerDragBehavior = new PointerDragBehavior();
        pointerDragBehavior.onDragStartObservable.add((event)=>{
          this.selectedPieceIndex = sphere.metadata.pieceIndex;
          this.selectedPieceCoords = sphere.metadata.index;
          this.selectedNode = sphere;

          this.rootRelativeCoords = [-this.selectedPieceCoords[1], -this.selectedPieceCoords[0], 0];
          this.relativeCoords = [];

          this.rootNodes[this.selectedPieceIndex].getChildren().forEach(child => {
            child.material.alpha = 1;
          });

          let currentShape = this.myPieces[this.selectedPieceIndex];
          for (let i = 0; i < currentShape.size; i++) {
            for (let j = 0; j < currentShape.size; j++) {
              if (currentShape.shape[i * currentShape.size + j] === 0) {
                continue;
              }
              this.relativeCoords.push([j - sphere.metadata.index[1], i - sphere.metadata.index[0], 0]);
            }
          }

          // translate relative position to 3d space
          for (let i = 0; i < this.relativeCoords.length; i++) {
            this.relativeCoords[i] = this.myPieces[this.selectedPieceIndex].translate3D(this.relativeCoords[i]);
          }
          this.rootRelativeCoords = this.myPieces[this.selectedPieceIndex].translate3D(this.rootRelativeCoords);

          // TODO translate rootoffset to 3d

          // update pyramid state
          this.removePyramidState(this.myPieces[this.selectedPieceIndex].character);

        })
        pointerDragBehavior.onDragObservable.add((event)=>{

          let currentPosition = sphere.position;
          let currentIndex = sphere.metadata.index;

          this.rootNodes[sphere.metadata.pieceIndex].getChildren().forEach(element => {
            if (element.metadata.index[0] === currentIndex[0] && element.metadata.index[1] === currentIndex[1]) {
              return;
            }
            element.position = new Vector3(currentPosition.x, currentPosition.y, currentPosition.z).add(new Vector3((element.metadata.index[0] - currentIndex[0]) * this.distanceBetweenPoints, 0, (element.metadata.index[1] - currentIndex[1]) * this.distanceBetweenPoints));
          });

          // color all pyramid nodes grey
          for (let i = 0; i < this.pyramid.length; i++) {
            for (let j = 0; j < this.pyramid[i].length; j++) {
              for (let k = 0; k < this.pyramid[i][j].length; k++) {
                this.pyramid[i][j][k].material = undefined;
              }
            }
          }

          // find hit coord
          this.isHit = false;
          let hit = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function(mesh){return mesh.name == "pyramid";});
          if(hit.hit == false){
            return;
          }
          let hitCoord = hit.pickedMesh.metadata.coords

          // find all hit coords
          this.hitCoords = [];
          this.relativeCoords.forEach(coord => {
            this.hitCoords.push([hitCoord[0] + coord[0], hitCoord[1] + coord[1], hitCoord[2] + coord[2]]);
          });

          // check if out of bounds
          // check if occupied
          for (let i = 0; i < this.hitCoords.length; i++) {
            if (this.hitCoords[i][2] < 0 || this.hitCoords[i][2] >= this.pyramid.length || this.hitCoords[i][1] < 0 || this.hitCoords[i][1] >= this.pyramid[this.hitCoords[i][2]].length || this.hitCoords[i][0] < 0 || this.hitCoords[i][0] >= this.pyramid[this.hitCoords[i][2]][this.hitCoords[i][1]].length) {
              return;
            }
            if (this.pyramidState[this.hitCoords[i][2]][this.hitCoords[i][1]][this.hitCoords[i][0]] != 0) {
              return;
            }
          }

          this.isHit = true;

          // color all hit coords green
          for (let i = 0; i < this.hitCoords.length; i++) {
            this.pyramid[this.hitCoords[i][2]][this.hitCoords[i][1]][this.hitCoords[i][0]].material = this.hoverMaterial;
          }

          // calculate rootnode position
          let rootCoordFinal = [hitCoord[0] + this.rootRelativeCoords[0], hitCoord[1] + this.rootRelativeCoords[1], hitCoord[2] + this.rootRelativeCoords[2]];
          this.hitRootCoords = (new Vector3(rootCoordFinal[1] * this.distanceBetweenPoints, 0, rootCoordFinal[0] * this.distanceBetweenPoints)).add(new Vector3(this.directionVector.x, this.directionVector.y, this.directionVector.z).scale(rootCoordFinal[2]));

        })
        pointerDragBehavior.onDragEndObservable.add((event)=>{

          for (let i = 0; i < this.pyramid.length; i++) {
            for (let j = 0; j < this.pyramid[i].length; j++) {
              for (let k = 0; k < this.pyramid[i][j].length; k++) {
                this.pyramid[i][j][k].material = undefined;
              }
            }
          }

          if (!this.isHit) {
            this.moveRootNode(this.selectedPieceIndex);
            return;
          }

          // move rootnode to hit coord
          let myRootNode = this.rootNodes[this.selectedPieceIndex];
          let myChildren = myRootNode.getChildren();
          myRootNode.position = this.hitRootCoords;
          myChildren.forEach(child => {
            child.position = new Vector3(child.metadata.index[0] * this.distanceBetweenPoints, 0, child.metadata.index[1] * this.distanceBetweenPoints);
            child.material.alpha = 0.5;
          });

          // update pyramid state
          this.hitCoords.forEach(coord => {
            this.pyramidState[coord[2]][coord[1]][coord[0]] = this.myPieces[this.selectedPieceIndex].character;
          });

          this.selectedPieceIndex = undefined;
          this.selectedPieceCoords = undefined;
          this.selectedNode = undefined;
          
          this.isHit = false;
          this.relativeCoords = undefined;
          this.rootRelativeCoords = undefined;
          this.hitCoords = undefined;
          this.hitRootCoords = undefined;

        })
        sphere.addBehavior(pointerDragBehavior);

      }
    }
  }

  removePyramidState(character) {
    for (let i = 0; i < this.pyramidState.length; i++) {
      for (let j = 0; j < this.pyramidState[i].length; j++) {
        for (let k = 0; k < this.pyramidState[i][j].length; k++) {
          if (this.pyramidState[i][j][k] == character || character == -1) {
            this.pyramidState[i][j][k] = 0;
          }
        }
      }
    }
  }

  resetCamera() {
    this.camera.position = new Vector3(this.initCameraPos.x, this.initCameraPos.y, this.initCameraPos.z);
    this.camera.setTarget(this.initCameraAngle);
  }

  resetPieces() {
    this.resetRootNodes();
    this.rootNodes.forEach((root, index) => {
      this.myPieces[index].tilt("");
      root.rotation = new Vector3(0, 0, 0);
      root.getChildren().forEach(child => {
        child.position = new Vector3(child.metadata.index[0] * this.distanceBetweenPoints, 0, child.metadata.index[1] * this.distanceBetweenPoints);
        child.material.alpha = 1;
      });
    });
    
    this.removePyramidState(-1);
  }

  rotateLeft() {
    this.myPieces[this.selectedPieceIndex].rotateLeft();
    this.createPiece(this.selectedPieceIndex);
  }

  rotateRight() {
    this.myPieces[this.selectedPieceIndex].rotateRight();
    this.createPiece(this.selectedPieceIndex);
  }

  flipHorizontal() {
    this.myPieces[this.selectedPieceIndex].flipHorizontal();
    this.createPiece(this.selectedPieceIndex);
  }

  flipVertical() {
    this.myPieces[this.selectedPieceIndex].flipVertical();
    this.createPiece(this.selectedPieceIndex);
  }

  resetTilt() {
    this.rootNodes[this.selectedPieceIndex].rotation = new Vector3(0, 0, 0);
    this.myPieces[this.selectedPieceIndex].tilt("");
  }
  
  moveRootNode(myIndex) {

    let usedIndex;
    if (myIndex === -1) {
      usedIndex = this.selectedPieceIndex;
    }
    else {
      usedIndex = myIndex;
    }

    let myRootNode = this.rootNodes[usedIndex];
    let myChildren = myRootNode.getChildren();
    let worldMatrix = this.selectedNode.getWorldMatrix();
    let worldPosition = Vector3.Zero();
    worldMatrix.decompose(undefined, undefined, worldPosition);
    let relative3dIndex = this.myPieces[usedIndex].translate3D([-this.selectedNode.metadata.index[1], -this.selectedNode.metadata.index[0], 0]);
    myRootNode.position = worldPosition.add(new Vector3(relative3dIndex[1] * this.distanceBetweenPoints, 0, relative3dIndex[0] * this.distanceBetweenPoints)).add(new Vector3(this.directionVector.x, this.directionVector.y, this.directionVector.z).scale(relative3dIndex[2]));
    //myRootNode.position = new Vector3(myChildren[0].position.x, myChildren[0].position.y, myChildren[0].position.z).add(myRootNode.position).add(new Vector3(-myChildren[0].metadata.index[0] * this.distanceBetweenPoints, 0, -myChildren[0].metadata.index[1] * this.distanceBetweenPoints));
    myChildren.forEach(child => {
      child.position = new Vector3(child.metadata.index[0] * this.distanceBetweenPoints, 0, child.metadata.index[1] * this.distanceBetweenPoints);
    });
  }

  tiltNW() {
    this.moveRootNode(-1);
    this.rootNodes[this.selectedPieceIndex].rotation = new Vector3(-Math.PI / 4, Math.PI / 4 * 5, Math.PI / 2);
    this.myPieces[this.selectedPieceIndex].tilt("NW");
  }

  tiltNE() {
    this.moveRootNode(-1);
    this.rootNodes[this.selectedPieceIndex].rotation = new Vector3(-Math.PI / 4, Math.PI / 4 * 7, Math.PI / 2);
    this.myPieces[this.selectedPieceIndex].tilt("NE");
  }

  tiltSW() {
    this.moveRootNode(-1);
    this.rootNodes[this.selectedPieceIndex].rotation = new Vector3(-Math.PI / 4, Math.PI / 4 * 3,  Math.PI / 2);
    this.myPieces[this.selectedPieceIndex].tilt("SW");
  }

  tiltSE() {
    this.moveRootNode(-1);
    this.rootNodes[this.selectedPieceIndex].rotation = new Vector3(-Math.PI / 4, Math.PI / 4 * 1, Math.PI / 2);
    this.myPieces[this.selectedPieceIndex].tilt("SE");
  }

  decreaseDistance() {

    if (this.distanceBetweenPoints === 1) {
      return;
    }
    this.distanceBetweenPoints = Math.max(1, this.distanceBetweenPoints - 1);
    this.updateDistances(-1);
    
  }

  increaseDistance() {
    this.distanceBetweenPoints += 1;
    this.updateDistances(1);
  }

  updateDistances(distanceChange) {
    this.rootNodes.forEach((root, index) => {
      root.position = root.position.scale(this.distanceBetweenPoints / (this.distanceBetweenPoints - distanceChange));
      root.getChildren().forEach(child => {
        child.position = new Vector3(child.metadata.index[0] * this.distanceBetweenPoints, 0, child.metadata.index[1] * this.distanceBetweenPoints);
      });
    });
    this.resetPyramid();
    this.calculateCameraInitAngle();
  }

  constructor() { }

  ngOnInit(): void {

    this.sceneSetup();
    this.calculateDistanceBetweenPointsVector();
    this.pyramidSetup();
    this.pieceSetup();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

  }

}
