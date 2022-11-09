import { findAllSolutions } from "./NQueensCompletion";

describe('NQueens Algorithm', () => {

    let inputs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let outputs = [1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200];
    
    function testNQueens(input, output) {
        it(`Should solve for N = ${input}`, () => {
            let solutions = findAllSolutions(input, []);
            expect(solutions.length).toBe(output);
        });
    }

    for (let i = 0; i < inputs.length; i++) {
        testNQueens(inputs[i], outputs[i]);
    }

});
