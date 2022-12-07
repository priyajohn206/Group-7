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

export { Polysphere };