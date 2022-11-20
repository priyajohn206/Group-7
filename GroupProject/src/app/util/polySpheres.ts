import * as math from "mathjs";
// function a(param) {
//     return (target) => {
//         // do something with param
//     }
// }
class Polysphere {
    character: string;
    colour: string;
    canFlip: boolean;
    shape: number[][];
    // mainCoordinate: number[];
    // otherCoordinates: number[][];

    constructor(character, colour, canFlip, shape) {
        this.character = character;
        this.shape = shape;
        this.character = character;
        this.colour = colour;
        this.canFlip = canFlip
    }

    RotateX(this) {
        // maximum for 8 times
        let theata = math.pi / 2;
        let vectors = math.matrix(this.shape);
        let A = math.transpose(vectors);
        let sinTheata = Math.sin(theata);
        let cosTheata = Math.cos(theata);
        let rMatrix = [
            [1, 0, 0],
            [0, cosTheata, -sinTheata],
            [0, sinTheata, cosTheata]];
        
        // this.shape = 
        return math.transpose(math.multiply(rMatrix, A))
    }
    RotateY() {}
    RotateZ() {}
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
    polyspheres[0] = polyspheres[0].RotateX();
    return polyspheres;
}

export { createPolySpherePieces };
