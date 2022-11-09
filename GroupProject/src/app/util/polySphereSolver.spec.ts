import {solvePolyspheres} from './polySphereSolver';
let dlxlib = require('dlxlib');

describe('PolySphere Solver', () => {

    it(`Should solve matrix correctly`, () => {
        const matrix = [
            [1, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 1, 0, 0],
            [0, 0, 1, 0]
        ]

        let solutions = dlxlib.solve(matrix);
        expect(solutions.length).toBe(3);
        expect(solutions).toEqual([[0, 3, 4], [1, 2], [2, 4, 5]]);
    });

    it('Should generate matrix correctly', () => {
        let result = solvePolyspheres([], [], true);
        expect(result[1].length).toBe(2140);
    });

});
