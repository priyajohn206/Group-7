import { createPolySpherePieces } from "./polySpheres";

describe('PolySpheres Builder', () => {

    let myPieces;
    beforeEach(() => {
        myPieces = createPolySpherePieces();
    });

    it(`Should create 12 pieces`, () => {
        expect(myPieces.length).toBe(12);
    });

    it('Should rotate to the right', () => {
        myPieces[0].rotateRight();
        expect(myPieces[0].shape).toEqual([0, 1, 1, 0, 0, 2, 0, 1, 1]);
    });

    it('Should rotate to the left', () => {
        myPieces[0].rotateLeft();
        expect(myPieces[0].shape).toEqual([1, 1, 0, 2, 0, 0, 1, 1, 0]);
    });

    it('Should flip horizontally', () => {
        myPieces[2].flipHorizontal();
        expect(myPieces[2].shape).toEqual([0, 1, 0, 0, 2, 1, 1, 1, 0]);
    });

    it('Should flip vertically', () => {
        myPieces[0].flipVertical();
        expect(myPieces[0].shape).toEqual([0, 0 ,0, 1, 0, 1, 1, 2, 1]);
    });

    it('Should locate points', () => {
        expect(myPieces[0].mainCoordinate).toEqual([1, 0]);
        expect(myPieces[0].otherCoordinates).toEqual([[-1, 0], [0, 0], [1, 0], [-1, 1], [1, 1]]);
        myPieces[0].rotateRight();
        expect(myPieces[0].mainCoordinate).toEqual([2, 1]);
        expect(myPieces[0].otherCoordinates).toEqual([[-1, -1], [0, -1], [0, 0], [-1, 1], [0, 1]]);
    });

});
