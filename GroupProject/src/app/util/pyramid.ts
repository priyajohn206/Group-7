import * as math from "mathjs";

export class Pyramid{
    // #layer: number;
    #pyramidLayer: number;
    #pyramidwidth: number;
    #pyramidLength: number;
    coordinate;

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
          for(let j = 0; j < this.#pyramidwidth; j++){
            for (let k = 0; k < this.#pyramidLength; k++){
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
            return true;
        }catch{
            return false;
        };
    };
};