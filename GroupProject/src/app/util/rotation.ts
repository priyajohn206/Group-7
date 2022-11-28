import * as math from "mathjs";

export class rotation{
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
        let [cosTheata, sinTheata] = this.#matrixValue(theata)
        let rMatrix = [
            [1, 0, 0],
            [0, cosTheata, -sinTheata],
            [0, sinTheata, cosTheata]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 5);
    };
    rotateY(theata) {
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.#matrixValue(theata);
        let rMatrix = [
            [cosTheata, 0, sinTheata],
            [0, 1, 0],
            [-sinTheata, 0, cosTheata]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 5);
    };
    rotateZ(theata) {
        let A = math.transpose(math.matrix(this.shape));
        let [cosTheata, sinTheata] = this.#matrixValue(theata);
        let rMatrix = [
            [cosTheata, -sinTheata, 0],
            [sinTheata, cosTheata, 0],
            [0, 0, 1]];
        let newShape = math.transpose(math.multiply(rMatrix, A));
        this.shape = math.round(newShape, 5);
    };
    getInitialShape(){
        return this.#initialShape
    };
    resetShape(){
        this.shape = this.#initialShape
    };
}