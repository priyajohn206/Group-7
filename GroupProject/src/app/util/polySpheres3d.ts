import * as math from "mathjs";

class Rotation{
    shape: math.Matrix;
    #initialShape: math.Matrix;
    
    constructor(shape){
        this.shape = shape;
        this.#initialShape = shape
    }
    #matrixValue(theata){
        let s = Math.sin(theata);
        let c = Math.cos(theata);
        return [s, c]
    };
    normalization(){
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
    rotateX(theata) {
        let A = math.transpose(math.matrix(this.shape));
        let [sinTheata, cosTheata] = this.#matrixValue(theata)
        let rMatrix = [
            [1, 0, 0],
            [0, cosTheata, -sinTheata],
            [0, sinTheata, cosTheata]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 4);
    };
    rotateY(theata) {
        let A = math.transpose(math.matrix(this.shape));
        let [sinTheata, cosTheata] = this.#matrixValue(theata);
        let rMatrix = [
            [cosTheata, 0, sinTheata],
            [0, 1, 0],
            [-sinTheata, 0, cosTheata]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 4);
    };
    rotateZ(theata) {
        let A = math.transpose(math.matrix(this.shape));
        let [sinTheata, cosTheata] = this.#matrixValue(theata);
        let rMatrix = [
            [cosTheata, -sinTheata, 0],
            [sinTheata, cosTheata, 0],
            [0, 0, 1]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 4);
    };
    getInitialShape(){
        return this.#initialShape
    };
    resetShape(){
        this.shape = this.#initialShape
    };
}

class Polysphere3d extends Rotation{
    character: string;
    colour: string;
    canFlip: boolean;
    isFlip: boolean

    constructor(character, colour, canFlip, shape) {
        super(shape)
        this.character = character;
        this.character = character;
        this.colour = colour;
        this.canFlip = canFlip;
        this.isFlip = false
    };

    rotateRight() {
        super.rotateZ(math.pi / 2);
    }

    rotateLeft() {
        super.rotateZ(-math.pi / 2);
    }

    flipHorizontal() {
        super.rotateY(math.pi);
    }

    flipVertical() {
        super.rotateX(math.pi);
    }

    tiltNW() {
        this.eulerSetting(Math.PI / 2, -Math.PI / 4, -Math.PI / 4 * 3);
    }

    tiltNE() {
        this.eulerSetting(Math.PI / 2, -Math.PI / 4, -Math.PI / 4);
    }

    tiltSW() {
        this.eulerSetting(Math.PI / 2, -Math.PI / 4, Math.PI / 4 * 3);
    }

    tiltSE() {
        this.eulerSetting(Math.PI / 2, -Math.PI / 4, Math.PI / 4);
    }

    resetShape() {
        super.resetShape();
        this.eulerSetting(0, 0, 0);
    }

    eulerSetting(x, y, z){
        super.rotateX(x);
        super.rotateY(y);
        super.rotateZ(z);
        return this;
    };

};

function createPolyminoes() {

    let myPieces = [];

    myPieces.push(new Polysphere3d('A', '#FF0000', false, [[0,0,0], [1,0,0],[2,0,0],[0,1,0],[2,1,0]]));
    myPieces.push(new Polysphere3d('B', '#FF1493', true, [[0,0,0],[0,1,0],[1,1,0],[1,2,0],[1,3,0]]));
    myPieces.push(new Polysphere3d('C', '#FFC0CB', true, [[1,0,0],[0,1,0],[1,1,0],[1,2,0],[2,2,0]]));
    myPieces.push(new Polysphere3d('D', '#4169E1', false, [[1,0,0],[0,1,0],[1,1,0],[2,1,0]]));
    myPieces.push(new Polysphere3d('E', '#FFD700', true, [[1,0,0],[0,1,0],[1,1,0],[2,1,0], [3,1,0]]));
    myPieces.push(new Polysphere3d('F', '#DA70D6', true, [[1,0,0],[2,0,0],[0,1,0],[1,1,0],[2,1,0]]));
    myPieces.push(new Polysphere3d('G', '#9400D3', true, [[1,0,0], [2,0,0],[0,1,0],[1,1,0]]));
    myPieces.push(new Polysphere3d('H', '#32CD32', true, [[0,0,0], [1,0,0],[0,1,0],[0,2,0]]));
    myPieces.push(new Polysphere3d('I', '#FF8C00', false, [[0,0,0], [1,0,0],[2,0,0],[2,1,0],[2,2,0]]));
    myPieces.push(new Polysphere3d('J', '#006400', true, [[0,0,0],[0,1,0],[1,1,0],[2,1,0],[3,1,0]]));
    myPieces.push(new Polysphere3d('K', '#FF7F50', false, [[0,0,0],[0,1,0],[1,1,0]]));
    myPieces.push(new Polysphere3d('L', '#87CEEB', false, [[0,0,0],[1,0,0],[1,1,0],[2,1,0],[2,2,0]]));

    myPieces.forEach(piece => {
        piece.eulerSetting(0, 0, 0);
    })

    return myPieces;

}

export { createPolyminoes };
