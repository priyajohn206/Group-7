class Polysphere {

    shape: number[];
    currentTilt: string;
    size: number;
    character: string;
    colour: string;
    canFlip: boolean;
    mainCoordinate: number[];
    otherCoordinates: number[][];

    constructor(shape, character, colour, canFlip) {
        this.shape = shape;
        this.currentTilt = "";
        this.size = Math.sqrt(shape.length);
        this.locatePoints();
        this.character = character;
        this.colour = colour;
        this.canFlip = canFlip
    }

    locatePoints() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.shape[j * this.size + i] == 2) {
                    this.mainCoordinate = [i, j];
                }
            }
        }
        this.otherCoordinates = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.shape[i * this.size + j] == 1 || this.shape[i * this.size + j] == 2) {
                    this.otherCoordinates.push([j - this.mainCoordinate[0], i - this.mainCoordinate[1]]);
                }
            }
        }
    }

    rotateRight() {
        let newShape = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = this.size - 1; j >= 0; j--) {
                newShape.push(this.shape[j * this.size + i]);
            }
        }
        this.shape = newShape;
        this.locatePoints();
    }

    rotateLeft() {
        let newShape = [];
        for (let i = this.size - 1; i >= 0; i--) {
            for (let j = 0; j < this.size; j++) {
                newShape.push(this.shape[j * this.size + i]);
            }
        }
        this.shape = newShape;
        this.locatePoints();
    }

    flipHorizontal() {
        if (!this.canFlip) {
            //return;
        }
        let newShape = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = this.size - 1; j >= 0; j--) {
                newShape.push(this.shape[i * this.size + j]);
            }
        }
        this.shape = newShape;
        this.locatePoints();
    }

    flipVertical() {
        if (!this.canFlip) {
            //return;
        }
        let newShape = [];
        for (let i = this.size - 1; i >= 0; i--) {
            for (let j = 0; j < this.size; j++) {
                newShape.push(this.shape[i * this.size + j]);
            }
        }
        this.shape = newShape;
        this.locatePoints();
    }

    tilt(direction) {
        this.currentTilt = direction;
    }

    translate3D(coords2d) {

        let result;

        switch(this.currentTilt) {
            case "NW":
                result = [-coords2d[0], -coords2d[0], coords2d[0] + coords2d[1]]
                break;

            case "NE":
                result = [-coords2d[1], -coords2d[0], coords2d[0] + coords2d[1]]
                break;

            case "SW":
                result = [-coords2d[0], -coords2d[1], coords2d[0] + coords2d[1]]
                break;

            case "SE":
                result = [-coords2d[1], -coords2d[1], coords2d[0] + coords2d[1]]
                break;

            default:
                result = coords2d;
                break;
                
        }

        return result;

    }

    print() {
        /*let output = "";
        for (let i = 0; i < this.shape.length; i++) {
            if (i % this.size == 0 && i != 0) {
                output += "\n";
            }
            if (this.shape[i]) {
                output += this.character;
            }
            else {
                output += "-";
            }
        }
        console.log('%c' + output, 'color: ' + this.colour);*/

        let output = "";
        for (let i = 0; i < this.shape.length; i++) {
            if (i % this.size == 0 && i != 0) {
                output += "\n";
            }
            if (this.shape[i]) {
                if (this.shape[i] == 1) {
                    output += this.character
                }
                else {
                    output += "X";
                }
            }
            else {
                output += "-";
            }
        }
        console.log('%c' + output, 'color: ' + this.colour);
        console.log(this.mainCoordinate);
        console.log(this.otherCoordinates);
    }
}

function createPolySpherePieces() {
    let polyspheres = [];
    polyspheres.push(new Polysphere([1, 2, 1, 1, 0, 1, 0, 0, 0], 'A', '#FF0000', false));
    polyspheres.push(new Polysphere([0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'B', '#FF1493', true));
    polyspheres.push(new Polysphere([0, 1, 0, 1, 2, 0, 0, 1, 1], 'C', '#FFC0CB', true));
    polyspheres.push(new Polysphere([0, 1, 0, 1, 2, 1, 0, 0, 0], 'D', '#4169E1', false));
    polyspheres.push(new Polysphere([0, 1, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 'E', '#FFD700', true));
    polyspheres.push(new Polysphere([0, 1, 1, 1, 2, 1, 0, 0, 0], 'F', '#DA70D6', true));
    polyspheres.push(new Polysphere([0, 1, 1, 1, 2, 0, 0, 0, 0], 'G', '#9400D3', true));
    polyspheres.push(new Polysphere([2, 1, 0, 1, 0, 0, 1, 0, 0], 'H', '#32CD32', true));
    polyspheres.push(new Polysphere([1, 1, 2, 0, 0, 1, 0, 0, 1], 'I', '#FF8C00', false));
    polyspheres.push(new Polysphere([1, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 'J', '#006400', true));
    polyspheres.push(new Polysphere([1, 0, 2, 1], 'K', '#FF7F50', false));
    polyspheres.push(new Polysphere([1, 1, 0, 0, 2, 1, 0, 0, 1], 'L', '#87CEEB', false));
    return polyspheres;
}

export { createPolySpherePieces };
