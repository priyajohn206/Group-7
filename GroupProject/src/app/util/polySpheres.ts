import * as math from "mathjs";
import { index } from "mathjs";

class Polysphere {
    character: string;
    colour: string;
    canFlip: boolean;
    shape: math.Matrix;
    #initialShape: math.Matrix;

    constructor(character, colour, canFlip, shape) {
        this.character = character;
        this.shape = shape;
        this.character = character;
        this.colour = colour;
        this.canFlip = canFlip;
        this.#initialShape = shape
    };
    #matrixValue(phase){
        let theata = math.pi / phase;
        let s = Math.sin(theata);
        let c = Math.cos(theata);
        return [s, c]
    };
    #normalization(){
        // make a guarantee that puzzle will always locate at quardant I.
        let xOffset = 0;
        let yOffset = 0;
        let zOffset = 0;
        for(let i =0; i<math.size(this.shape)[0] ; i++){
            if(this.shape[i][0]<xOffset){
                xOffset=this.shape[i][0]
            };
            if(this.shape[i][1]<xOffset){
                yOffset=this.shape[i][1]
            };
            if(this.shape[i][2]<xOffset){
                zOffset=this.shape[i][2]
            };
        };

        if(xOffset<0){
            for(let i =0; i<math.size(this.shape)[0] ; i++){
                this.shape[i][0] -= xOffset;
            };
        };
        if(yOffset<0){
            for(let i =0; i<math.size(this.shape)[0] ; i++){
                this.shape[i][1] -= yOffset;
            };
        }
        if(zOffset<0){
            for(let i =0; i<math.size(this.shape)[0] ; i++){
                this.shape[i][2] -= zOffset;
            };
        };
    };
    RotateX() {
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.#matrixValue(4)
        let rMatrix = [
            [1, 0, 0],
            [0, cosTheata, -sinTheata],
            [0, sinTheata, cosTheata]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 5);
        this.#normalization();
    };
    RotateY() {
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.#matrixValue(4);
        let rMatrix = [
            [cosTheata, 0, sinTheata],
            [0, 1, 0],
            [-sinTheata, 0, cosTheata]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 5);
        this.#normalization();
    };
    RotateZ() {
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.#matrixValue(4);
        let rMatrix = [
            [cosTheata, -sinTheata, 0],
            [sinTheata, cosTheata, 0],
            [0, 0, 1]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 5);
        this.#normalization();
    };
    getInitialShape(){
        return this.#initialShape
    };
    resetShape(){
        this.shape = this.#initialShape
    };
};

function createPolySpherePieces() {
    let polyspheres = [];
    polyspheres.push(new Polysphere('A', '#FF0000', false, [[0,0,0], [1,0,0],[1,1,0],[1,2,0]]));
    polyspheres.push(new Polysphere('B', '#FF1493', true, [[0,0,0],[0,1,0],[1,0,0],[1,1,0],[1,2,0]]));
    polyspheres.push(new Polysphere('C', '#FFC0CB', true, [[0,0,0],[1,0,0],[1,1,0],[1,2,0],[1,3,0]]));
    polyspheres.push(new Polysphere('D', '#4169E1', false, [[0,1,0],[1,0,0],[1,1,0],[1,2,0],[1,3,0]]));
    polyspheres.push(new Polysphere('E', '#FFD700', true, [[0,0,0],[0,1,0],[1,1,0],[1,2,0], [1,3,0]]));
    polyspheres.push(new Polysphere('F', '#DA70D6', true, [[0,0,0],[0,1,0],[1,0,0]]));
    polyspheres.push(new Polysphere('G', '#9400D3', true, [[0,0,0], [1,0,0],[2,0,0],[2,1,0],[2,2,0]]));
    polyspheres.push(new Polysphere('H', '#32CD32', true, [[0,0,0], [1,0,0],[1,1,0],[2,1,0],[2,2,0]]));
    polyspheres.push(new Polysphere('I', '#FF8C00', false, [[0,0,0], [0,1,0],[1,0,0],[2,0,0],[2,1,0]]));
    polyspheres.push(new Polysphere('J', '#006400', true, [[0,0,0],[0,1,0],[0,2,0],[0,3,0]]));
    polyspheres.push(new Polysphere('K', '#FF7F50', false, [[0,0,0],[0,1,0],[1,0,0],[1,1,0]]));
    polyspheres.push(new Polysphere('L', '#87CEEB', false, [[0,1,0],[1,0,0],[1,1,0],[1,2,0],[2,1,0]]));
    return polyspheres;
};

function createPyramidCooridate(){
    let pyramidDict = {};
    let count = 0;
    let layer = 5;
    for(let i = layer; i > 0; i--){
      let offsetTimes = layer - i;
      for(let j = 0; j < i; j++){
        for (let k = 0; k < i; k++){
            let coordinate = [k+offsetTimes*0.5, j+offsetTimes*0.5, offsetTimes+offsetTimes*(Math.sqrt(2)/2)];
            pyramidDict[math.round(coordinate, 5).toString()] = count;
            count += 1;
        };
      };
    };
    return pyramidDict
};

class Pyramid{
    #layer: number;
    coordinate;
    indexArray;
    constructor(){
        this.#layer = 5;
        this.coordinate = createPyramidCooridate();
        this.indexArray = math.zeros(12, this.coordinate.length)
    };
    createPyramidCooridate(){
        let pyramidDict = {};
        let count = 0;
        for(let i = this.#layer; i > 0; i--){
          let offsetTimes = this.#layer - i;
          for(let j = 0; j < i; j++){
            for (let k = 0; k < i; k++){
                let coordinate = [k+offsetTimes*0.5, j+offsetTimes*0.5, offsetTimes+offsetTimes*(Math.sqrt(2)/2)];
                pyramidDict[math.round(coordinate, 5).toString()] = count;
                count += 1;
            };
          };
        };
        return pyramidDict
    };
    isCrash(){};
    place(puzzle){
        try{
            let placeList = []
            for(let i=0;i<puzzle.length;i++){
                placeList.push(this.coordinate[puzzle[i].toString()])
            };
            return this.isCrash();
        }catch{
            return false;
        };
    };
};

export { createPolySpherePieces, createPyramidCooridate };