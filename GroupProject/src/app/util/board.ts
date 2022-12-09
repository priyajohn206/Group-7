import { MaterialSheenDefines } from "@babylonjs/core/Materials/PBR/pbrSheenConfiguration";
import { getCipherInfo } from "crypto";
import * as math from "mathjs";

class Pyramid{
    // #layer: number;
    #pyramidLayer: number;
    #pyramidwidth: number;
    #pyramidLength: number;
    coordinate;
    coordinateIndex = {};

    constructor(pyramidLayer: number, pyramidwidth: number, pyramidLength: number){
        this.#pyramidLayer = pyramidLayer;
        this.#pyramidwidth = pyramidwidth;
        this.#pyramidLength = pyramidLength;
        this.coordinate = this.createPyramidCooridate();
    };
    createPyramidCooridate(){
        let pyramidDict = {};
        let count = 0;
        for(let i = this.#pyramidLayer; i > 0; i--){
          let offsetTimes = this.#pyramidLayer - i;
          for(let j = 0; j < i; j++){
            for (let k = 0; k < i; k++){
                let coordinate = [k+offsetTimes*0.5, j+offsetTimes*0.5, offsetTimes*(Math.sqrt(2)/2)];
                pyramidDict[math.round(coordinate, 4).toString()] = count;
                this.coordinateIndex[count] = math.round(coordinate, 4);
                count += 1;
            };
          };
        };
        return pyramidDict
    };
    legalPlace(puzzle, pyramidPosition){
        
        let placeList = []
        for(let i = 0; i < puzzle.shape._data.length; i++){
            let coordinate = math.round([puzzle.shape._data[i][0] + this.coordinateIndex[pyramidPosition][0], puzzle.shape._data[i][1] + this.coordinateIndex[pyramidPosition][1], puzzle.shape._data[i][2] + this.coordinateIndex[pyramidPosition][2]], 4);
            if (this.coordinate[coordinate.toString()] == undefined){
                return undefined
            }
            placeList.push(this.coordinate[coordinate.toString()])
        }
        return placeList;
        
    }

}



function createPyramid() {
    return new Pyramid(5, 5, 5);
}

export { createPyramid };
