import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createPolySpherePieces } from '../util/polySpheres';

@Component({
  selector: 'PolysphereConfig',
  templateUrl: './polysphere-config.component.html',
  styleUrls: ['./polysphere-config.component.css']
})
export class PolysphereConfigComponent implements OnInit {

  boardSizeX = 11;
  boardSizeY = 5;
  myPieces = [];
  myBoard = Array(this.boardSizeX * this.boardSizeY).fill(0).map((x,i)=>i);
  myBoardEls;
  myControlPanel;
  myBoardArray = [];

  activePiece;
  activePieceIndex;
  isMouseDown = false;
  currentCellOffset = [0, 0];
  currentlyHoveredCell = -1;
  currentlyHoveredCoordinates = undefined;

  getBoardStyle() {
    return {
      'display': 'grid',
      'grid-template-columns': 'repeat(' + this.boardSizeX + ', 1fr)',
      'gap': '5px'
    }
  }

  getPieceStyle(pieceNum) {
    return {
      'align-content': 'center',
      'display': 'grid',
      'grid-template-columns': 'repeat(' + this.myPieces[pieceNum].size + ', 1fr)',
      'gap': '5px',
      'top': '0px',
      'left': '0px',
    }
  }

  getPieceColour(pieceNum, pieceCoord) {
    if (pieceCoord != 0) {
      return this.myPieces[pieceNum].colour;
    }
    else {
      return 'transparent';
    }
  }

  positionControlPanel() {
    this.myControlPanel = document.querySelector('#controls');
    let currentPiecePos = document.querySelectorAll('#polyBox > .polyBlock')[this.activePieceIndex].getBoundingClientRect();
    let controlPanelPos = this.myControlPanel.getBoundingClientRect();
    this.myControlPanel.style.top = currentPiecePos.y + 50 * this.myPieces[this.activePieceIndex].size + "px";//currentPiecePos.y + currentPiecePos.height + 20 + 'px';
    this.myControlPanel.style.left = currentPiecePos.x - ((controlPanelPos.width - currentPiecePos.width) / 2) + 'px';
  }

  removeFromBoard(character) {
    for (let i = 0; i < this.myBoardArray.length; i++) {
      for (let j = 0; j < this.myBoardArray[i].length; j++) {
        if (this.myBoardArray[i][j] == character || character == -1) {
          this.myBoardArray[i][j] = 0;
        }
      }
    }
  }

  grabPiece(event, y, size, i) {
    if (event.target.classList.contains('cell')) {
      this.isMouseDown = true;
      this.activePiece = event.path[1];
      this.activePiece.style.zIndex = 11;
      this.activePieceIndex = i;
      this.currentCellOffset = [0, 0];
      while (y >= size) {
        this.currentCellOffset[1] += 1;
        y -= size;
      }
      while (y > 0) {
        this.currentCellOffset[0] += 1;
        y -= 1;
      }
      this.removeFromBoard(this.myPieces[i].character);
      this.positionControlPanel();
    }

  }

  dropPiece(event) {

    if (!this.isMouseDown) {
      return;
    }

    this.isMouseDown = false;

    if (this.currentlyHoveredCoordinates != undefined) {

      this.currentlyHoveredCoordinates.forEach((coord) => {
        this.myBoardArray[coord[1]][coord[0]] = this.myPieces[this.activePieceIndex].character;
      });

      let me = this.activePiece.getBoundingClientRect();
      let target = document.querySelectorAll('#boardGrid > .cell')[this.currentlyHoveredCell - (this.currentCellOffset[1] * this.boardSizeX) - this.currentCellOffset[0]].getBoundingClientRect();
      let currentOffset = [Number(this.activePiece.style.top.split('px')[0]), Number(this.activePiece.style.left.split('px')[0])];
      this.activePiece.style.top = (target.y - (me.y - currentOffset[0]) + 5) + 'px';
      this.activePiece.style.left = (target.x - (me.x - currentOffset[1]) + 5) + 'px';

      this.activePiece.style.zIndex = 9;
      this.activePiece = undefined;

    }
    else {

      this.activePiece.style.zIndex = 10;

    }
    
  }

  movePiece(event) {
    if (!this.isMouseDown) {
      return;
    }
    this.activePiece.style.top = (Number(this.activePiece.style.top.split('px')[0]) + event.movementY) + 'px';
    this.activePiece.style.left = (Number(this.activePiece.style.left.split('px')[0]) + event.movementX) + 'px';

    this.positionControlPanel();

    let x = event.clientX;
    let y = event.clientY;

    let foundCell = false;
    this.myBoardEls = document.querySelectorAll('#boardGrid > .cell');
    for (let i = 0; i < this.myBoardEls.length; i++) {
      this.myBoardEls[i].style.backgroundColor = 'transparent';
      let rect = this.myBoardEls[i].getBoundingClientRect();
      if (!foundCell && y >= rect.top && y <= rect.bottom && x >= rect.left  &&  x <= rect.right) {
        this.currentlyHoveredCell = i;
        foundCell = true;
      }
    }

    if (!foundCell) {
      this.currentlyHoveredCell = -1;
      this.currentlyHoveredCoordinates = undefined;
    }
    else {
      let placementCoords = this.isValidPlacement(this.currentlyHoveredCell, this.activePieceIndex, this.currentCellOffset);
      if (placementCoords != undefined) {
        this.currentlyHoveredCoordinates = placementCoords;
        placementCoords.forEach((coord) => {
          this.myBoardEls[coord[1] * this.boardSizeX + coord[0]].style.backgroundColor = '#98FB98';
        });
      }
      else {
        this.currentlyHoveredCoordinates = undefined;
      }
    }

  }

  isValidPlacement(cellIndex, pieceIndex, cellOffset) {

    let cellCoord = [0, 0];
    while (cellIndex >= this.boardSizeX) {
      cellCoord[1] += 1;
      cellIndex -= this.boardSizeX;
    }
    while (cellIndex > 0) {
      cellCoord[0] += 1;
      cellIndex -= 1;
    }

    let blockCoordinates = [];

    for (let j = 0; j < this.myPieces[pieceIndex].size; j++) {
      for (let i = 0; i < this.myPieces[pieceIndex].size; i++) {
        if (this.myPieces[pieceIndex].shape[j * this.myPieces[pieceIndex].size + i] != 0) {
          blockCoordinates.push([cellCoord[0] - cellOffset[0] + i, cellCoord[1] - cellOffset[1] + j]);
        }
      }
    }

    for (let i = 0; i < blockCoordinates.length; i++) {
      if (blockCoordinates[i][0] < 0 || blockCoordinates[i][0] >= this.boardSizeX || blockCoordinates[i][1] < 0 || blockCoordinates[i][1] >= this.boardSizeY || this.myBoardArray[blockCoordinates[i][1]][blockCoordinates[i][0]] != 0) {
        return undefined;
      }
    }

    return blockCoordinates;

  }

  rotateR() {
    this.myPieces[this.activePieceIndex].rotateRight();
  }

  rotateL() {
    this.myPieces[this.activePieceIndex].rotateLeft();
  }

  flipH() {
    this.myPieces[this.activePieceIndex].flipHorizontal();
  }

  flipV() {
    this.myPieces[this.activePieceIndex].flipVertical();
  }

  reset() {
    
    this.activePiece = null;
    this.isMouseDown = false;
    this.currentCellOffset = [0, 0];
    this.currentlyHoveredCell = -1;

    document.querySelectorAll<HTMLElement>('.polyBlock').forEach((el) => {
      el.style.top = '0';
      el.style.left = '0';
    });

    this.removeFromBoard(-1);

  }

  solve() {
    let route = "/polysphere/solutions/"
    for (let i = 0; i < this.boardSizeY; i++) {
      for (let j = 0; j < this.boardSizeX; j++) {
        route += this.myBoardArray[i][j];
        if (j < this.boardSizeX - 1) {
          route += ',';
        }
      }
      if (i < this.boardSizeY - 1) {
        route += ':';
      }
    }
    this.router.navigate([route]);
  }

  constructor(private router: Router) {
    for (let j = 0; j < this.boardSizeY; j++) {
      let row = [];
      for (let i = 0; i < this.boardSizeX; i++) {
        row.push(0);
      }
      this.myBoardArray.push(row);
    }
  }

  ngOnInit(): void {
    this.myPieces = createPolySpherePieces();
  }

}
