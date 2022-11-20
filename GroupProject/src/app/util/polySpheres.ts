import * as math from "mathjs";

class Polysphere {
    character: string;
    colour: string;
    canFlip: boolean;
    shape: number[][];

    constructor(character, colour, canFlip, shape) {
        this.character = character;
        this.shape = shape;
        this.character = character;
        this.colour = colour;
        this.canFlip = canFlip;
    }
    matrixValue(phase){
        let theata = math.pi / phase;
        let s = Math.sin(theata);
        let c = Math.cos(theata);
        return [s, c]
    }

    RotateX(this) {
        // maximum for 8 times
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.matrixValue(4)
        let rMatrix = [
            [1, 0, 0],
            [0, cosTheata, -sinTheata],
            [0, sinTheata, cosTheata]];
        this.shape = math.transpose(math.multiply(rMatrix, A))
    }
    RotateY(this) {
        // maximum for 2 times
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.matrixValue(4)
        let rMatrix = [
            [cosTheata, 0, sinTheata],
            [0, 1, 0],
            [-sinTheata, 0, cosTheata]];
        this.shape = math.transpose(math.multiply(rMatrix, A))
    }
    RotateZ(this) {
        // maximum for 4 times
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.matrixValue(2)
        let rMatrix = [
            [cosTheata, -sinTheata, 0],
            [sinTheata, cosTheata, 0],
            [0, 0, 1]];
        this.shape = math.transpose(math.multiply(rMatrix, A))
    }
    rotateRight() {}
    rotateLeft() {}
    flipHorizontal() {}
    flipVertical() {}
}

function createPolySpherePieces() {
    let polyspheres = [];
    polyspheres.push(new Polysphere('A', '#FF0000', false, [[1,2,0]]));
    // polyspheres.push(new Polysphere([0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'B', '#FF1493', true));
    // polyspheres.push(new Polysphere([0, 1, 0, 1, 2, 0, 0, 1, 1], 'C', '#FFC0CB', true));
    // polyspheres.push(new Polysphere([0, 1, 0, 1, 2, 1, 0, 0, 0], 'D', '#4169E1', false));
    // polyspheres.push(new Polysphere([0, 1, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 'E', '#FFD700', true));
    // polyspheres.push(new Polysphere([0, 1, 1, 1, 2, 1, 0, 0, 0], 'F', '#DA70D6', true));
    // polyspheres.push(new Polysphere([0, 1, 1, 1, 2, 0, 0, 0, 0], 'G', '#9400D3', true));
    // polyspheres.push(new Polysphere([2, 1, 0, 1, 0, 0, 1, 0, 0], 'H', '#32CD32', true));
    // polyspheres.push(new Polysphere([1, 1, 2, 0, 0, 1, 0, 0, 1], 'I', '#FF8C00', false));
    // polyspheres.push(new Polysphere([1, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 'J', '#006400', true));
    // polyspheres.push(new Polysphere([1, 0, 2, 1], 'K', '#FF7F50', false));
    // polyspheres.push(new Polysphere([1, 1, 0, 0, 2, 1, 0, 0, 1], 'L', '#87CEEB', false));
    return polyspheres;
}

function createPyramidCooridate(){
    let prymid = []
    let layer = 5
    for(let i = layer; i > 0; i--){
      let offsetTimes = layer - i 
      for(let j = 0; j < i; j++){
        for (let k = 0; k < i; k++){
          prymid.push([k+offsetTimes*0.5, j+offsetTimes*0.5, offsetTimes+offsetTimes*(Math.sqrt(3)/2)]);
        }
      }
    }
    return prymid
}

export { createPolySpherePieces, createPyramidCooridate };