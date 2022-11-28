import * as math from "mathjs";
import {Rotation} from './rotation';

class Polysphere extends Rotation{
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
    
    flipHorizontal(){
        super.rotateY(math.pi)
        super.normalization
    };
    eularSetting(x, y, z){
        super.rotateX(x);
        super.rotateY(y);
        super.rotateZ(z);
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

class Pyramid{
    #layer: number;
    coordinate;
    indexArray;
    constructor(){
        this.#layer = 5;
        this.coordinate = this.createPyramidCooridate();
        // this.indexArray = math.zeros(12, Object.keys(this.coordinate).length)
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
    legalPlace(puzzle){
        try{
            let placeList = []
            for(let i=0;i<puzzle.length;i++){
                placeList.push(this.coordinate[puzzle[i].toString()])
            };
            // index retuning problem.
            return true;
        }catch{
            return false;
        };
    };
};

export { createPolySpherePieces, Pyramid };